<script lang="ts">
	import { goto } from '$app/navigation';
	import { appName } from '$lib/env';
	import { __ } from '$lib/language';
	import { userLanguage } from '$lib/storage';
	import { fly, scale } from 'svelte/transition';

	// Define your Ko-fi links
	const tazikKoFiLink = 'https://ko-fi.com/tazik';
	const noemiKoFiLink = 'https://ko-fi.com/noemi';
</script>

<svelte:head>
	<title>{appName} :: Donate</title>
</svelte:head>

<div class="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#004749] to-[#450046]">
	<div class="text-center mb-10">
		<h1 class="text-4xl font-bold text-white">{__('Support Us', $userLanguage)}</h1>
		<p class="text-lg text-white/80 mt-2">
			{__('Your support helps us keep this project alive!', $userLanguage)}
		</p>
	</div>

	<div class="w-full h-full grid grid-cols-2 gap-[100px] place-items-center"> <!-- Increased gap -->
		<!-- Support Tazik Block -->
		<div class="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 transition-all rounded-lg p-8 w-64 text-center scale-150"> <!-- 1.5x scale -->
			<a
				href={tazikKoFiLink}
				target="_blank"
				rel="noopener noreferrer"
				class="flex flex-col items-center justify-center"
			>
				<img
					src="https://avatars.githubusercontent.com/u/194347647?v=4"
					alt="Ko-fi"
					class="w-32 h-32 mb-4"
				/>
				<h2 class="text-xl font-semibold text-white">{__('Support Tazik', $userLanguage)}</h2>
				<p class="text-sm text-white/80 mt-2">
					{__('Gimme money pls~', $userLanguage)}
				</p>
			</a>
		</div>

		<!-- Support Noemi Block -->
		<div class="flex flex-col items-center justify-center bg-white/10 hover:bg-white/20 transition-all rounded-lg p-8 w-64 text-center scale-150"> <!-- 1.5x scale -->
			<a
				href={noemiKoFiLink}
				target="_blank"
				rel="noopener noreferrer"
				class="flex flex-col items-center justify-center"
			>
				<img
					src="https://avatars.githubusercontent.com/u/69471841?v=4"
					alt="Ko-fi"
					class="w-32 h-32 mb-4"
				/>
				<h2 class="text-xl font-semibold text-white">{__('Support Noemi', $userLanguage)}</h2>
				<p class="text-sm text-white/80 mt-2">
					{__('Buy Noemi a coffee!', $userLanguage)}
				</p>
			</a>
		</div>
	</div>

	<!-- Back Button -->
	<button
		class="mt-10 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-all"
		on:click={() => goto('/')}
	>
		{__('Back to Home', $userLanguage)}
	</button>
</div>