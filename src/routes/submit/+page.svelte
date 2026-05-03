<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	function formatDate(dateStr: string): string {
		const d = new Date(dateStr + 'T12:00:00');
		return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
	}
</script>

<svelte:head>
	<title>Wedding Inbox — Submit a Message</title>
</svelte:head>

<div class="page-wrapper">
	<header class="site-header">
		<h1>Wedding Inbox</h1>
		<p class="tagline">Share your thoughts with the coordinator</p>
	</header>

	<div class="content-card">
		<div class="couple-name">
			{data.wedding.partner1_first} {data.wedding.partner1_last}
			&amp;
			{data.wedding.partner2_first} {data.wedding.partner2_last}
		</div>
		<div class="wedding-date-display">{formatDate(data.wedding.wedding_date)}</div>

		{#if form?.success}
			<div class="alert alert-success">
				<strong>Thank you!</strong> Your message has been received and forwarded to the coordinator.
				The couple will be able to celebrate without worry.
			</div>
			<a href="/submit" style="display:block; text-align:center; margin-top:1rem; color:#b8976a; font-size:0.85rem; letter-spacing:0.06em; text-transform:uppercase; text-decoration:none;">
				Submit Another Message
			</a>
		{:else}
			<h2 class="card-title">Send a Message</h2>
			<p class="card-subtitle">Questions, suggestions, or well-wishes — all are welcome.</p>

			{#if form?.error}
				<div class="alert alert-error">{form.error}</div>
			{/if}

			<form method="POST">
				<div class="form-group">
					<label for="submitter_name">Your Name</label>
					<input
						type="text"
						id="submitter_name"
						name="submitter_name"
						value={form?.values?.submitter_name ?? ''}
						placeholder="Full name"
						required
					/>
				</div>

				<div class="form-group">
					<label for="submitter_email">Your Email</label>
					<input
						type="email"
						id="submitter_email"
						name="submitter_email"
						value={form?.values?.submitter_email ?? ''}
						placeholder="your@email.com"
						required
					/>
				</div>

				<div class="form-group">
					<label for="message">Message or Suggestion</label>
					<textarea
						id="message"
						name="message"
						placeholder="Share your question, suggestion, or kind words..."
						required
					>{form?.values?.message ?? ''}</textarea>
				</div>

				<button type="submit" class="btn-primary">Send Message</button>
			</form>
		{/if}
	</div>
</div>
