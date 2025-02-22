<script>
	import { browser } from '$app/environment';

	let selectedTheme = 'skeleton'; // Default theme

	// Function to set the theme
	function setTheme(theme) {
		selectedTheme = theme;

		// Set the theme in a cookie and update the data-theme attribute
		if (browser) {
			document.cookie = `theme=${theme}; path=/; max-age=31536000;`; // 1 year expiry
			document.documentElement.setAttribute('data-theme', theme); // Update the theme dynamically
		}
	}

	// Load the saved theme on page load
	if (browser) {
		const savedTheme = document.cookie
			.split('; ')
			.find((row) => row.startsWith('theme='))
			?.split('=')[1] || 'skeleton';
		setTheme(savedTheme);
	}
</script>

<select
	class="theme-selector"
	bind:value={selectedTheme}
	on:change={() => setTheme(selectedTheme)}
>
	<option value="skeleton">Default</option>
	<option value="modern">Light Sea</option>
	<option value="rocket">Ghost</option>
	<option value="wintry">Deep Ocean</option>
	<option value="vintage">Cartoon Rust</option>
	<option value="seafoam">Light Sky</option>
	<option value="crimson">Metal</option>
	<option value="hamlindigo">Old Values</option>
	<option value="gold-nouveau">Purple Party</option>
	<option value="miausu">Deep Snow</option>
</select>