<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css'; // Import global styles
	import { base } from '$app/paths'; // Import base path

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<nav>
		<h1>Haiku Scribe</h1>
		<ul>
			<li><a href="{base}/" class:active={data.url === '/'}>Editor</a></li>
			<li><a href="{base}/my-haikus" class:active={data.url === '/my-haikus'}>My Haikus</a></li>
		</ul>
	</nav>
</header>

<main>
	{@render children?.()}
</main>

<style>
	header {
		background-color: #f0f0f0;
		padding: 1em;
		border-bottom: 1px solid #ccc;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 960px;
		margin: 0 auto;
	}

	nav ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		gap: 1em;
	}

	nav a {
		text-decoration: none;
		color: #333;
		font-weight: bold;
	}

	nav a.active {
		color: #007bff;
		text-decoration: underline;
	}

	main {
		max-width: 960px;
		margin: 1em auto;
		padding: 0 1em;
	}
</style>
