<script>
	import { appName } from '$lib/env';
	import { __ } from '$lib/language';
	import { userData, userLanguage } from '$lib/storage';

	export let data;
</script>

<svelte:head>
	<title>{appName} :: Home</title>
</svelte:head>

<div class="h-full w-screen">
	<div class="bg-primary-500/30 w-screen h-full">
		<div class="h-full flex flex-col justify-center items-center text-center gap-5">
			<div class="flex flex-col gap-10">
				<h1 class="h1 font-bold">{appName}</h1>
				<h5 class="h5">
					an unrestricted Sandbox, Cheating, and Testing Server where the possibilities are endless in-game.
					From embracing the serene realms of Relax Cheats to venturing into uncharted territories
				</h5>
			</div>
			<div class="flex flex-row gap-3">
				{#if $userData}
					<a class="btn variant-filled-surface rounded-lg font-semibold" href="/leaderboards">
						{__('View Leaderboards', $userLanguage)}
					</a>
					<a class="btn variant-filled-tertiary rounded-lg" href="/u/{$userData.id}">
						{__('View Profile', $userLanguage)}
					</a>
				{:else}
					<a class="btn variant-filled-surface rounded-lg font-semibold" href="/signup">
						{__('Sign Up', $userLanguage)}
					</a>
					<a class="btn variant-filled-tertiary rounded-lg" href="/signin">
						{__('Sign In', $userLanguage)}
					</a>
				{/if}
			</div>
			<div class="flex flex-row gap-3">
				<p class="bg-black/50 rounded-full py-1 px-6">
					<span class="font-bold text-green-400">{data.userCounts?.counts.online}</span>
					{__('online users', $userLanguage)}
				</p>
				<p class="bg-black/50 rounded-full py-1 px-6">
					<span class="font-bold text-primary-400">{data.userCounts?.counts.total}</span>
					{__('registered users', $userLanguage)}
				</p>
			</div>
		</div>
	</div>
</div>