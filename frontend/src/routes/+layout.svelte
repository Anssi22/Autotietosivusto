<script>
	import favicon from '$lib/assets/favicon.svg';
	import "../app.css"

	let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Autotietosivusto</title>
</svelte:head>

<div class="app-shell">
  <div class="app-container">
    {@render children()}
  </div>
</div>