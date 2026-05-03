import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const {
		data: { user },
		error: authError
	} = await supabase.auth.getUser();

	if (authError || !user) {
		redirect(303, '/coordinator');
	}

	const coordinatorEmail = user.email;

	const { data: suggestions, error: suggestionsError } = await supabase
		.from('suggestions')
		.select('id, submitter_name, submitter_email, message, created_at, wedding_id')
		.eq('coordinator_email', coordinatorEmail)
		.order('created_at', { ascending: false });

	if (suggestionsError) {
		return {
			suggestions: [],
			coordinatorEmail,
			error: 'Failed to load suggestions.'
		};
	}

	return {
		suggestions: suggestions ?? [],
		coordinatorEmail
	};
};
