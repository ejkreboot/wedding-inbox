import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '$lib/supabase.server';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password');

		if (!password || typeof password !== 'string' || password.trim() === '') {
			return fail(400, { error: 'Please enter your passphrase.' });
		}

		// Fetch all weddings to compare hashes
		const { data: weddings, error } = await supabaseAdmin
			.from('weddings')
			.select('id, password_hash');

		if (error) {
			return fail(500, { error: 'An error occurred. Please try again.' });
		}

		if (!weddings || weddings.length === 0) {
			return fail(401, { error: 'Incorrect passphrase. Please try again.' });
		}

		let matchedId: string | null = null;

		for (const wedding of weddings) {
			const match = await bcrypt.compare(password.trim(), wedding.password_hash);
			if (match) {
				matchedId = wedding.id;
				break;
			}
		}

		if (!matchedId) {
			return fail(401, { error: 'Incorrect passphrase. Please try again.' });
		}

		cookies.set('wedding_session', matchedId, {
			httpOnly: true,
			path: '/',
			maxAge: 60 * 60 * 24 * 7, // 7 days
			sameSite: 'lax'
		});

		redirect(303, '/submit');
	}
};
