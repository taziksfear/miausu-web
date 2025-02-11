<script>
    import ThemeSwitcher from '$lib/ThemeSwitcher.svelte';
    import { browser } from '$app/environment';
    import '$lib/styles/themes.css';

    let currentTheme = 'skeleton'; // Default theme

    // Update the current theme when the page loads
    if (browser) {
        currentTheme = document.documentElement.getAttribute('data-theme') || 'skeleton';
    }

    // Function to update the theme dynamically
    function updateTheme(event) {
        const selectedTheme = event.target.value;
        document.documentElement.setAttribute('data-theme', selectedTheme);
        currentTheme = selectedTheme;
    }
</script>

<style>
    /* General input/select styling */
    [type='text'],
    input:where(:not([type])),
    [type='email'],
    [type='url'],
    [type='password'],
    [type='number'],
    [type='date'],
    [type='datetime-local'],
    [type='month'],
    [type='search'],
    [type='tel'],
    [type='time'],
    [type='week'],
    [multiple],
    textarea,
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #000000; /* Black background */
        border-color: #6b7280; /* Gray border */
        border-width: 1px;
        border-radius: 20px; /* Rounded corners */
        padding-top: 0.5rem;
        padding-right: 0.75rem;
        padding-bottom: 0.5rem;
        padding-left: 0.75rem;
        font-size: 1rem;
        line-height: 1.5rem;
        --tw-shadow: 0 0 #0000;
        color: #ffffff; /* White text */
        transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    /* Hover state for select */
    select:hover {
        background-color: #333333; /* Slightly lighter black on hover */
        border-color: #4b5563; /* Darker gray border on hover */
    }

    /* Focus state for select */
    select:focus {
        outline: none; /* Remove default focus outline */
        border-color: #1e40af; /* Blue border on focus */
        box-shadow: 0 0 0 2px rgba(30, 64, 175, 0.3); /* Subtle shadow on focus */
    }

    /* Custom dropdown arrow using pseudo-element */
    select::after {
        content: '▼'; /* Custom dropdown arrow */
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        color: #ffffff; /* Arrow color matches text */
    }

    /* Hide default dropdown arrow in IE/Edge */
    select::-ms-expand {
        display: none;
    }

    /* Styling for the popup menu */
    .popup-menu {
        background-color: #000; /* Black background */
        color: #fff; /* White text */
        border-radius: 35px; /* Rounded corners */
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Subtle shadow */
        padding: 16px;
        display: inline-block;
    }

    .popup-menu button {
        background-color: #000; /* Black background */
        color: #fff; /* White text */
        border: none;
        padding: 8px 16px;
        border-radius: 25px; /* Rounded buttons */
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .popup-menu button:hover {
        background-color: #333; /* Slightly lighter black on hover */
    }

    .popup-menu span {
        font-weight: bold;
    }

    /* General styling for the main content */
    main {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .max-w-2xl {
        width: 100%;
        max-width: 480px;
    }
</style>

<main class="p-4">
    <div class="flex justify-center items-center mb-4 relative">
        <!-- Apply custom styles to the ThemeSwitcher -->
        <ThemeSwitcher 
            class="theme-switcher"
            on:change={updateTheme}
        />
    </div>
    <div class="max-w-2xl mx-auto bg-surface-500 text-on-surface-500 p-6 rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-4">Theme Selector</h1>
        <p class="mb-4">
            Select a theme from the dropdown above to change the appearance of the site. After selecting, reload the page.
        </p>
        <p class="mb-4">
            The current theme is: <span class="font-semibold">{currentTheme}</span>
        </p>
        <div class="popup-menu">
            <button class="bg-primary-500 text-on-primary-500 px-4 py-2 rounded hover:bg-primary-600 transition duration-300">
                Update theme!
            </button>
        </div>
    </div>
</main>