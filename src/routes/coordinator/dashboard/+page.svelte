<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function formatDateTime(dateStr: string): string {
		const d = new Date(dateStr);
		return d.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit'
		});
	}
</script>

<svelte:head>
	<title>Wedding Inbox — Coordinator Dashboard</title>
</svelte:head>

<div class="dashboard-wrapper">
	<div class="dashboard-header">
		<h1>Coordinator Dashboard</h1>
		<span class="meta">{data.coordinatorEmail}</span>
	</div>

	{#if data.error}
		<div class="alert alert-error" style="max-width:900px; margin: 0 auto 1.5rem auto;">{data.error}</div>
	{/if}

	{#if data.suggestions.length === 0}
		<div class="empty-state">
			<p style="font-size:1.1rem; margin-bottom:0.5rem;">No messages yet.</p>
			<p>When guests submit questions or suggestions, they will appear here.</p>
		</div>
	{:else}
		<div style="max-width:900px; margin: 0 auto 1rem auto; font-family:'Helvetica Neue',Arial,sans-serif; font-size:0.82rem; color:#9a8870; text-transform:uppercase; letter-spacing:0.1em;">
			{data.suggestions.length} {data.suggestions.length === 1 ? 'message' : 'messages'}
		</div>
		<div class="suggestions-grid">
			{#each data.suggestions as suggestion (suggestion.id)}
				<article class="suggestion-card">
					<div class="sender-name">{suggestion.submitter_name}</div>
					<div class="sender-email">{suggestion.submitter_email}</div>
					<p class="message-text">{suggestion.message}</p>
					<div class="card-date">{formatDateTime(suggestion.created_at)}</div>
				</article>
			{/each}
		</div>
	{/if}
</div>
