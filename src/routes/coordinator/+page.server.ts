import { fail, redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import type { Actions } from './$types';

export const actions: Actions = {
	send: async ({ request, url }) => {
		const data = await request.formData();
		const email = (data.get('email') as string)?.trim().toLowerCase();

		if (!email) {
			return fail(400, { error: 'Please enter your email address.' });
		}

		const { error } = await supabase.auth.signInWithOtp({ email });

		if (error) {
			return fail(500, { error: 'Failed to send code. Please try again.' });
		}

		return { sent: true, email };
	},

	verify: async ({ request }) => {
		const data = await request.formData();
		const email = (data.get('email') as string)?.trim().toLowerCase();
		const token = (data.get('token') as string)?.trim();

		if (!email || !token) {
			return fail(400, { sent: true, email, error: 'Please enter the code from your email.' });
		}

		const { error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });

		if (error) {
			return fail(400, { sent: true, email, error: 'Invalid or expired code. Please try again.' });
		}

		redirect(303, '/coordinator/dashboard');
	}
};
