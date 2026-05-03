import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import { supabaseAdmin } from '$lib/supabase.server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const weddingId = cookies.get('wedding_session');

	if (!weddingId) {
		redirect(303, '/');
	}

	const { data: wedding, error } = await supabaseAdmin
		.from('weddings')
		.select(
			'id, partner1_first, partner1_last, partner2_first, partner2_last, wedding_date, coordinator_email'
		)
		.eq('id', weddingId)
		.single();

	if (error || !wedding) {
		cookies.delete('wedding_session', { path: '/' });
		redirect(303, '/');
	}

	return { wedding };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const weddingId = cookies.get('wedding_session');

		if (!weddingId) {
			redirect(303, '/');
		}

		// Re-fetch wedding to ensure session is still valid and get coordinator_email
		const { data: wedding, error: weddingError } = await supabaseAdmin
			.from('weddings')
			.select('id, coordinator_email')
			.eq('id', weddingId)
			.single();

		if (weddingError || !wedding) {
			cookies.delete('wedding_session', { path: '/' });
			redirect(303, '/');
		}

		const data = await request.formData();
		const submitter_name = (data.get('submitter_name') as string)?.trim();
		const submitter_email = (data.get('submitter_email') as string)?.trim();
		const message = (data.get('message') as string)?.trim();

		const values = { submitter_name, submitter_email, message };

		if (!submitter_name || !submitter_email || !message) {
			return fail(400, { error: 'All fields are required.', values });
		}

		const { error } = await supabase.from('suggestions').insert({
			wedding_id: wedding.id,
			submitter_name,
			submitter_email,
			message,
			coordinator_email: wedding.coordinator_email
		});

		if (error) {
			return fail(500, { error: 'Failed to submit your message. Please try again.', values });
		}

		return { success: true };
	}
};
