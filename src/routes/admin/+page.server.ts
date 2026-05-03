import { fail } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '$lib/supabase.server';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const partner1_first = (data.get('partner1_first') as string)?.trim();
		const partner1_last = (data.get('partner1_last') as string)?.trim();
		const partner2_first = (data.get('partner2_first') as string)?.trim();
		const partner2_last = (data.get('partner2_last') as string)?.trim();
		const wedding_date = (data.get('wedding_date') as string)?.trim();
		const coordinator_email = (data.get('coordinator_email') as string)?.trim();
		const password = (data.get('password') as string)?.trim();

		const values = {
			partner1_first,
			partner1_last,
			partner2_first,
			partner2_last,
			wedding_date,
			coordinator_email
		};

		if (
			!partner1_first ||
			!partner1_last ||
			!partner2_first ||
			!partner2_last ||
			!wedding_date ||
			!coordinator_email ||
			!password
		) {
			return fail(400, { error: 'All fields are required.', values });
		}

		const password_hash = await bcrypt.hash(password, 12);

		const { error } = await supabaseAdmin.from('weddings').insert({
			partner1_first,
			partner1_last,
			partner2_first,
			partner2_last,
			wedding_date,
			coordinator_email,
			password_hash
		});

		if (error) {
			if (error.code === '23505') {
				return fail(409, {
					error: 'That passphrase is already in use. Please choose a different one.',
					values
				});
			}
			return fail(500, { error: 'Failed to register wedding. Please try again.', values });
		}

		return { success: true, values: { partner1_first: '', partner1_last: '', partner2_first: '', partner2_last: '', wedding_date: '', coordinator_email: '' } };
	}
};
