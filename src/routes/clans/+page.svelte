<script lang="ts">
	import type { DBClan } from '$lib/types';
	import { onMount } from 'svelte';
	import ChevronLeft from 'svelte-feathers/ChevronLeft.svelte';
	import ChevronRight from 'svelte-feathers/ChevronRight.svelte';
	import { appName } from '$lib/env';
	import { queryParam } from 'sveltekit-search-params';
	import { __ } from '$lib/language';
	import { userLanguage } from '$lib/storage';
	import Clans from '$lib/components/clans.svelte';
	import '$lib/styles/themes.css';

	const modes = ['osu', 'taiko', 'catch', 'mania'];
	const types = ['vanilla', 'relax', 'autopilot'];

	let currentLeaderboard: DBClan[] = [];
	const clansPerPage = 50;

	let firstLoad = true;
	let loading = true;
	let failed = false;

	const queryMode = queryParam('mode', undefined, {
		pushHistory: false
	});
	const queryType = queryParam('type', undefined, {
		pushHistory: false
	});
	const queryPage = queryParam('page', undefined, {
		pushHistory: false
	});

	let currentType = 'vanilla';
	let currentMode = 'osu';
	let currentPage = 1;
	let hasNextPage = true;

	const selectedMode = $queryMode;
	const selectedType = $queryType;
	if (modes.includes(selectedMode!)) currentMode = selectedMode!;
	if (types.includes(selectedType!)) currentType = selectedType!;
	if (/^\d+$/.test($queryPage!) && parseInt($queryPage!) > 0) currentPage = parseInt($queryPage!);

	const refreshLeaderboard = async () => {
		if (loading && !firstLoad) return;
		loading = true;
		currentLeaderboard = [];
		let mode = 0;
		const urlParams = new URLSearchParams();

		if (currentType == 'relax' && currentMode == 'mania') currentMode = 'osu';
		if (currentType == 'autopilot' && currentMode != 'osu') currentMode = 'osu';

		queryMode.set(currentMode);
		queryType.set(currentType);
		queryPage.set(currentPage.toFixed(0));

		switch (currentMode) {
			case 'taiko':
				mode += 1;
				break;
			case 'catch':
				mode += 2;
				break;
			case 'mania':
				mode += 3;
				break;
		}

		switch (currentType) {
			case 'relax':
				mode += 4;
				break;
			case 'autopilot':
				mode += 8;
				break;
		}

		urlParams.set('mode', mode.toFixed(0));
		urlParams.set('limit', '50');
		urlParams.set('offset', ((currentPage - 1) * clansPerPage).toFixed(0));

		try {
			const leaderboard = await fetch('?' + urlParams.toString(), { method: 'POST' });
			const leaderboardJSON = await leaderboard.json();
			hasNextPage = leaderboardJSON.length >= clansPerPage;
			currentLeaderboard = leaderboardJSON;
			failed = false;
			firstLoad = false;
		} catch {
			failed = true;
		}
		loading = false;
	};

	const setMode = (mode: string) => {
		if (currentMode == mode) return;
		currentPage = 1;
		currentMode = mode;
		refreshLeaderboard();
	};

	const setType = (type: string) => {
		if (currentType == type) return;
		currentPage = 1;
		currentType = type;
		refreshLeaderboard();
	};

	const nextPage = () => {
		currentPage += 1;
		const pageMain = document.getElementById('page');
		if (pageMain) pageMain.scrollTo({ top: 0, behavior: 'smooth' });
		refreshLeaderboard();
	};

	const prevPage = () => {
		if (currentPage <= 1) return;
		currentPage -= 1;
		const pageMain = document.getElementById('page');
		if (pageMain) pageMain.scrollTo({ top: 0, behavior: 'smooth' });
		refreshLeaderboard();
	};

	onMount(() => {
		refreshLeaderboard();
	});
</script>

<svelte:head>
	<title>{appName} :: Clans</title>
</svelte:head>

<div class="container mx-auto w-full p-5">
	<div class=" flex flex-col justify-center">
		<div class="bg-surface-700 rounded-t-lg">
			<div class="grid md:grid-cols-[auto_auto] gap-2 p-3">
				<div class="w-full flex justify-center md:justify-start rounded-lg">
					<button
						class="w-[100%] md:w-[25%] !scale-100 btn {currentType == 'vanilla'
							? 'bg-surface-500'
							: 'bg-surface-600'} rounded-lg rounded-r-none"
						on:click={() => setType('vanilla')}
						disabled={loading || failed}
					>
						Vanilla
					</button>
					<button
						class="w-[100%] md:w-[25%] !scale-100 btn {currentType == 'relax'
							? 'bg-surface-500'
							: 'bg-surface-600'} rounded-none"
						on:click={() => setType('relax')}
						disabled={currentMode == 'mania' || loading || failed}
					>
						Relax
					</button>
					<button
						class="w-[100%] md:w-[25%] !scale-100 btn {currentType == 'autopilot'
							? 'bg-surface-500'
							: 'bg-surface-600'} rounded-lg rounded-l-none"
						disabled={currentMode == 'taiko' ||
							currentMode == 'catch' ||
							currentMode == 'mania' ||
							loading ||
							failed}
						on:click={() => setType('autopilot')}
					>
						Autopilot
					</button>
				</div>
				<div class="w-full flex rounded-lg">
					<button
						class="w-[25%] !scale-100 btn {currentMode == 'osu'
							? 'bg-surface-500'
							: 'bg-surface-600'} rounded-lg rounded-r-none"
						on:click={() => setMode('osu')}
						disabled={loading || failed}
					>
						osu!
					</button>
					<button
						class="w-[25%] !scale-100 btn {currentMode == 'taiko'
							? 'bg-surface-500'
							: 'bg-surface-600'} rounded-none"
						on:click={() => setMode('taiko')}
						disabled={currentType == 'autopilot' || loading || failed}
					>
						taiko
					</button>
					<button
						class="w-[25%] !scale-100 btn {currentMode == 'catch'
							? 'bg-surface-500'
							: 'bg-surface-600'} rounded-none"
						on:click={() => setMode('catch')}
						disabled={currentType == 'autopilot' || loading || failed}
					>
						catch
					</button>
					<button
						class="w-[25%] !scale-100 btn {currentMode == 'mania'
							? 'bg-surface-500'
							: 'bg-surface-600'} rounded-lg rounded-l-none"
						on:click={() => setMode('mania')}
						disabled={currentType == 'relax' || currentType == 'autopilot' || loading || failed}
					>
						mania
					</button>
				</div>
			</div>
		</div>
		<div class="bg-surface-800 p-3 pb-0 px-0">
			<div class="w-full flex flex-row justify-between items-center px-2">
				<button
					class="btn variant-filled-surface rounded-lg"
					on:click={prevPage}
					disabled={currentPage <= 1 || loading || failed}
				>
					<ChevronLeft class="outline-none border-none" />
				</button>
				<p class="text-slate-400">{__('Page', $userLanguage)} {currentPage}</p>
				<button
					class="btn variant-filled-surface rounded-lg"
					on:click={nextPage}
					disabled={loading || failed || !hasNextPage}
				>
					<ChevronRight class="outline-none border-none" />
				</button>
			</div>
			{#if failed}
				<div class="w-full flex flex-col justify-center items-center gap-2">
					<p class="text-slate-400">{__('Failed to load leaderboard.', $userLanguage)}</p>
					<button class="btn variant-filled-surface rounded-lg" on:click={refreshLeaderboard}>
						{__('Refresh', $userLanguage)}
					</button>
				</div>
			{:else}
				<Clans
					leaderboardData={currentLeaderboard}
					page={currentPage}
					usersPerPage={clansPerPage}
					{currentMode}
					{currentType}
				/>
			{/if}

			<div class="w-full flex flex-row justify-between items-center px-2 mb-2">
				<button
					class="btn variant-filled-surface rounded-lg"
					on:click={prevPage}
					disabled={currentPage <= 1 || loading || failed}
				>
					<ChevronLeft class="outline-none border-none" />
				</button>
				<p class="text-slate-400">{__('Page', $userLanguage)} {currentPage}</p>
				<button
					class="btn variant-filled-surface rounded-lg"
					on:click={nextPage}
					disabled={loading || failed || !hasNextPage}
				>
					<ChevronRight class="outline-none border-none" />
				</button>
			</div>
		</div>
		<div class="bg-surface-700 p-2 rounded-b-lg"></div>
	</div>
</div>
