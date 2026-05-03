<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>Wedding Inbox</title>
	<meta name="description" content="Submit questions and suggestions for the wedding coordinator." />
</svelte:head>

{@render children?.()}
