<script lang="ts">
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Wedding Inbox — Admin</title>
</svelte:head>

<div class="page-wrapper">
	<header class="site-header">
		<h1>Wedding Inbox</h1>
		<p class="tagline">Administrator — Register a Wedding</p>
	</header>

	<div class="content-card">
		<h2 class="card-title">Register Wedding</h2>
		<p class="card-subtitle">Create a new wedding entry and generate a guest passphrase.</p>

		{#if form?.success}
			<div class="alert alert-success">
				Wedding registered successfully! The couple may now share their passphrase with guests.
			</div>
		{/if}

		{#if form?.error}
			<div class="alert alert-error">{form.error}</div>
		{/if}

		<form method="POST">
			<div class="form-row">
				<div class="form-group">
					<label for="partner1_first">Partner 1 — First Name</label>
					<input
						type="text"
						id="partner1_first"
						name="partner1_first"
						value={form?.values?.partner1_first ?? ''}
						placeholder="First name"
						required
					/>
				</div>
				<div class="form-group">
					<label for="partner1_last">Partner 1 — Last Name</label>
					<input
						type="text"
						id="partner1_last"
						name="partner1_last"
						value={form?.values?.partner1_last ?? ''}
						placeholder="Last name"
						required
					/>
				</div>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="partner2_first">Partner 2 — First Name</label>
					<input
						type="text"
						id="partner2_first"
						name="partner2_first"
						value={form?.values?.partner2_first ?? ''}
						placeholder="First name"
						required
					/>
				</div>
				<div class="form-group">
					<label for="partner2_last">Partner 2 — Last Name</label>
					<input
						type="text"
						id="partner2_last"
						name="partner2_last"
						value={form?.values?.partner2_last ?? ''}
						placeholder="Last name"
						required
					/>
				</div>
			</div>

			<div class="form-group">
				<label for="wedding_date">Wedding Date</label>
				<input
					type="date"
					id="wedding_date"
					name="wedding_date"
					value={form?.values?.wedding_date ?? ''}
					required
				/>
			</div>

			<div class="form-group">
				<label for="coordinator_email">Coordinator Email</label>
				<input
					type="email"
					id="coordinator_email"
					name="coordinator_email"
					value={form?.values?.coordinator_email ?? ''}
					placeholder="coordinator@example.com"
					required
				/>
			</div>

			<hr class="divider" />

			<div class="form-group">
				<label for="password">Guest Passphrase</label>
				<input
					type="text"
					id="password"
					name="password"
					placeholder="Choose a memorable passphrase for guests"
					autocomplete="off"
					required
				/>
			</div>

			<button type="submit" class="btn-primary">Register Wedding</button>
		</form>
	</div>
</div>
