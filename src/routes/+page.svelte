<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Wedding Inbox — Enter Passphrase</title>
</svelte:head>

<div class="page-wrapper">
	<header class="site-header">
		<h1>Wedding Inbox</h1>
		<p class="tagline">A quiet place for your thoughts &amp; wishes</p>
	</header>

	<div class="content-card">
		<h2 class="card-title">Welcome</h2>
		<p class="card-subtitle">Please enter your wedding passphrase to continue.</p>

		{#if form?.error}
			<div class="alert alert-error">{form.error}</div>
		{/if}

		<form method="POST">
			<div class="form-group">
				<label for="password">Passphrase</label>
				<input
					type="password"
					id="password"
					name="password"
					autocomplete="current-password"
					placeholder="Enter your wedding passphrase"
					required
				/>
			</div>
			<button type="submit" class="btn-primary">Continue</button>
		</form>
	</div>
</div>
