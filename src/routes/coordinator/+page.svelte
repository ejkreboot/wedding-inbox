<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Wedding Inbox — Coordinator Login</title>
</svelte:head>

<div class="page-wrapper">
	<header class="site-header">
		<h1>Wedding Inbox</h1>
		<p class="tagline">Coordinator Access</p>
	</header>

	<div class="content-card">
		{#if form?.sent}
			<h2 class="card-title">Check Your Email</h2>
			<p class="card-subtitle">Enter the 6-digit code sent to <em>{form.email}</em>.</p>

			{#if form?.error}
				<div class="alert alert-error">{form.error}</div>
			{/if}

			<form method="POST" action="?/verify">
				<input type="hidden" name="email" value={form.email} />
				<div class="form-group">
					<label for="token">One-Time Code</label>
					<input
						type="text"
						id="token"
						name="token"
						placeholder="123456"
						inputmode="numeric"
						autocomplete="one-time-code"
						maxlength="6"
						required
					/>
				</div>
				<button type="submit" class="btn-primary">Verify Code</button>
			</form>
		{:else}
			<h2 class="card-title">Sign In</h2>
			<p class="card-subtitle">We'll send a one-time code to your email address.</p>

			{#if form?.error}
				<div class="alert alert-error">{form.error}</div>
			{/if}

			<form method="POST" action="?/send">
				<div class="form-group">
					<label for="email">Coordinator Email</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="your@email.com"
						autocomplete="email"
						required
					/>
				</div>
				<button type="submit" class="btn-primary">Send Code</button>
			</form>
		{/if}
	</div>
</div>
