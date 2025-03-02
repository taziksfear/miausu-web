<script lang="ts">
	import './style.postcss';
	import './badges.scss';
	import Popup from '$lib/components/Popup.svelte';
	import { appName, appUrl, avatarUrl } from '$lib/env';
	import { getLevelProgress, getLevel } from '$lib/level';
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { queryParam } from 'sveltekit-search-params';
	import Edit2 from 'svelte-feathers/Edit2.svelte';
	import type { Clan, PlayerStatus } from '$lib/types';
	import { getClan, getPlayerStatus } from '$lib/api';
	import { userData, userLanguage } from '$lib/storage';
	import { getCountryName } from '$lib/country';
	import { numberHumanReadable } from '$lib/stringUtil';
	import { secondsToDHM, secondsToHours } from '$lib/time';
	import UserScores from '$lib/components/userScores.svelte';
	import { removeTrailingZeroes } from '$lib/regex';
	import { __ } from '$lib/language';
	import UserRankBadges from '$lib/components/userRankBadges.svelte';
	import UserMostPlayed from '$lib/components/userMostPlayed.svelte';
	import { Privileges, isDonator, privsToGroups, isStaff } from '$lib/privs';
	import Time, { dayjs } from 'svelte-time';
	import Edit from 'svelte-feathers/Edit.svelte';
	import Check from 'svelte-feathers/Check.svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	export let data;
	let clan: Clan | undefined;

	const queryMode = queryParam('mode', undefined, {
		pushHistory: false
	});
	const queryType = queryParam('type', undefined, {
		pushHistory: false
	});

	let loading = false;
	let failed = false;
	let currentMode = 'osu';
	let currentType = 'vanilla';
	let currentModeInt: number = 0;
	let playerStatus: PlayerStatus | undefined;

	// NOTE: this is so cursed, please kill me
	let level = tweened(0, {
		duration: 500,
		easing: cubicInOut,
		interpolate: (a, b) => (t) => Math.trunc(a + (b - a) * t)
	});

	let levelProgress = tweened(0, {
		duration: 500,
		easing: cubicInOut,
		interpolate: (a, b) => (t) => Math.trunc(a + (b - a) * t)
	});

	let globalRank = tweened(0, {
		duration: 500,
		easing: cubicInOut,
		interpolate: (a, b) => (t) => Math.trunc(a + (b - a) * t)
	});

	let countryRank = tweened(0, {
		duration: 500,
		easing: cubicInOut,
		interpolate: (a, b) => (t) => Math.trunc(a + (b - a) * t)
	});

	let totalScore = tweened(0, {
		duration: 500,
		easing: cubicInOut,
		interpolate: (a, b) => (t) => Math.trunc(a + (b - a) * t)
	});

	let rankedScore = tweened(0, {
		duration: 500,
		easing: cubicInOut,
		interpolate: (a, b) => (t) => Math.trunc(a + (b - a) * t)
	});

	let hitAccuracy = tweened(0, {
		duration: 500,
		easing: cubicInOut
	});

	let playCount = tweened(0, {
		duration: 500,
		easing: cubicInOut,
		interpolate: (a, b) => (t) => Math.trunc(a + (b - a) * t)
	});

	let maxCombo = tweened(0, {
		duration: 500,
		easing: cubicInOut,
		interpolate: (a, b) => (t) => Math.trunc(a + (b - a) * t)
	});

	let replayViews = tweened(0, {
		duration: 500,
		easing: cubicInOut,
		interpolate: (a, b) => (t) => Math.trunc(a + (b - a) * t)
	});

	let performancePoints = tweened(0, {
		duration: 500,
		easing: cubicInOut,
		interpolate: (a, b) => (t) => Math.trunc(a + (b - a) * t)
	});

	let experiencePoints = tweened(0, {
		duration: 500,
		easing: cubicInOut,
		interpolate: (a, b) => (t) => Math.trunc(a + (b - a) * t)
	});

	let playTime = tweened(0, {
		duration: 500,
		easing: cubicInOut,
		interpolate: (a, b) => (t) => Math.trunc(a + (b - a) * t)
	});

	let xhGrade = tweened(0, {
		duration: 500,
		easing: cubicInOut,
		interpolate: (a, b) => (t) => Math.trunc(a + (b - a) * t)
	});

	let xGrade = tweened(0, {
		duration: 500,
		easing: cubicInOut,
		interpolate: (a, b) => (t) => Math.trunc(a + (b - a) * t)
	});

	let shGrade = tweened(0, {
		duration: 500,
		easing: cubicInOut,
		interpolate: (a, b) => (t) => Math.trunc(a + (b - a) * t)
	});

	let sGrade = tweened(0, {
		duration: 500,
		easing: cubicInOut,
		interpolate: (a, b) => (t) => Math.trunc(a + (b - a) * t)
	});

	let aGrade = tweened(0, {
		duration: 500,
		easing: cubicInOut,
		interpolate: (a, b) => (t) => Math.trunc(a + (b - a) * t)
	});

	const modes = ['osu', 'taiko', 'catch', 'mania'];
	const types = ['vanilla', 'relax'];

	const updateModeInt = async () => {
		loading = true;

		queryMode.set(currentMode);
		queryType.set(currentType);

		let mode = 0;
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
		}
		currentModeInt = mode;

		if (data.user?.info.id) {
			level.set(getLevel(data.user.stats[currentModeInt].tscore));
			levelProgress.set(getLevelProgress(data.user.stats[currentModeInt].tscore));
			globalRank.set(data.user.stats[currentModeInt].rank);
			countryRank.set(data.user.stats[currentModeInt].country_rank);
			rankedScore.set(data.user.stats[currentModeInt].rscore);
			totalScore.set(data.user.stats[currentModeInt].tscore);
			hitAccuracy.set(data.user.stats[currentModeInt].acc);
			playCount.set(data.user.stats[currentModeInt].plays);
			maxCombo.set(data.user.stats[currentModeInt].max_combo);
			replayViews.set(data.user.stats[currentModeInt].replay_views);
			performancePoints.set(data.user.stats[currentModeInt].pp);
			experiencePoints.set(data.user.stats[currentModeInt].xp);
			playTime.set(data.user.stats[currentModeInt].playtime);
			xhGrade.set(data.user.stats[currentModeInt].xh_count);
			xGrade.set(data.user.stats[currentModeInt].x_count);
			shGrade.set(data.user.stats[currentModeInt].sh_count);
			sGrade.set(data.user.stats[currentModeInt].s_count);
			aGrade.set(data.user.stats[currentModeInt].a_count);
		}
		loading = false;
	};

	const setMode = async (mode: string) => {
		if (currentMode == mode) return;
		currentMode = mode;
		await updateModeInt();
	};

	const setType = async (type: string) => {
		if (currentType == type) return;
		currentType = type;
		await updateModeInt();
	};

	let isEditing = false;
	let editedUserpage = data.user?.info.userpage_content;

	const handleEditToggle = () => {
		isEditing = !isEditing;
		if (!isEditing) {
			editedUserpage = data.user?.info.userpage_content;
		}
	};

	onMount(async () => {
		if (data.user?.info.id) {
			const selectedMode = $queryMode;
			const selectedType = $queryType;
			if (modes.includes(selectedMode!)) currentMode = selectedMode!;
			if (types.includes(selectedType!)) currentType = selectedType!;

			await updateModeInt();

			if (data.user.info.clan_id) clan = await getClan(data.user.info.clan_id);

			playerStatus = await getPlayerStatus(data.user.info.id);
		}
	});
</script>

<svelte:head>
	{#if data.user?.info.id}
		<title>{appName} :: {data.user.info.name} - player info</title>
		<meta property="og:type" content="profile" />
		<meta property="og:title" content="{appName} :: {data.user.info.name} - player info" />
		<meta property="og:url" content="{appUrl}/u/{data.user.info.id}" />
		<meta property="og:image" content="{avatarUrl}/{data.user.info.id}" />
		<meta property="profile:username" content={data.user.info.name} />
	{:else}
		<title>{appName} :: player not found</title>
	{/if}
</svelte:head>
<div class="container mx-auto w-full p-5">
	{#if isStaff($userData?.priv) || (data.user?.info.id && data.user?.info.priv & Privileges.VERIFIED)}
		<div class="mx-auto card">
			<div class="w-full flex flex-col">
				<div class="overflow-hidden rounded-lg">
					<div class="relative p-3 bg-surface-600">
						<div
							class="absolute h-full w-full top-0 left-0 bg-no-repeat bg-top blur opacity-10"
							style="background-image: url('/u/{data.user.info.id}/cover');"
						></div>
						<div class="grid md:grid-cols-[auto_auto] gap-2">
							<div class="w-full justify-center md:justify-start flex rounded-lg">
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
									disabled={loading || failed}
								>
									Relax
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
									disabled={loading || failed}
								>
									taiko
								</button>
								<button
									class="w-[25%] !scale-100 btn {currentMode == 'catch'
										? 'bg-surface-500'
										: 'bg-surface-600'} rounded-none"
									on:click={() => setMode('catch')}
									disabled={loading || failed}
								>
									catch
								</button>
								<button
									class="w-[25%] !scale-100 btn {currentMode == 'mania'
										? 'bg-surface-500'
										: 'bg-surface-600'} rounded-lg rounded-l-none"
									on:click={() => setMode('mania')}
									disabled={loading || failed}
								>
									mania
								</button>
							</div>
						</div>
					</div>
				</div>
				<div
					class="relative h-28 md:h-64 bg-center bg-cover bg-no-repeat"
					style="background-image: url('/u/{data.user?.info.id}/cover');"
				>
					{#if $userData?.id == data.user.info.id}
						<a
							class="btn btn-icon variant-filled-surface absolute flex justify-center items-center bottom-2 right-2 h-10 w-10"
							href="/settings"
						>
							<Edit2 class="pointer-events-none" size={20} />
						</a>
					{/if}
				</div>
				<div class="relative flex flex-row bg-surface-600 md:px-12 p-2">
					<div
						class="absolute h-full w-full top-0 left-0 bg-no-repeat bg-bottom blur opacity-10"
						style="background-image: url('/u/{data.user.info.id}/cover');"
					></div>
					<div class="md:absolute md:-top-[55px] w-14 h-14 md:w-56 md:h-32">
						{#if playerStatus && playerStatus.player_status.online}
							<div
								class="top-0 left-[6.75rem] w-6 h-6 hidden md:block absolute badge bg-green-500 border-2 border-green-600 shadow"
							></div>
							<div
								class="top-0 left-[6.75rem] w-6 h-6 animate-ping hidden md:block absolute badge bg-green-500 border-2 border-green-600"
							></div>
						{:else}
							<div
								class="top-0 left-[6.75rem] w-6 h-6 hidden md:block absolute badge bg-gray-400 border-2 border-surface-400"
							></div>
						{/if}
						<span
							class="block w-14 h-14 md:w-32 md:h-32 bg-no-repeat bg-center bg-cover rounded-[30%] shadow-[0_2px_5px_1px_rgba(0,0,0,0.4)] transition-all"
							style="background-image: url({avatarUrl}/{data.user.info.id});"
						></span>
					</div>
					<div class="flex flex-col my-auto gap-1 md:gap-2 ms-2 md:ms-36 z-[5]">
						<div class="flex flex-row items-center gap-1 text-xl md:text-2xl">
							{#if clan}
								<a
									class="chip variant-soft-primary hover:variant-filled-primary"
									href="/clan/{clan.id}">{clan.tag}</a
								>
							{/if}

							<span
								class={privsToGroups(data.user.info.priv)
									.reverse()
									.filter((group) => group > Privileges.VERIFIED)
									.map((group) => 'priv-' + Privileges[group].toLowerCase())
									.pop()}>{data.user.info.name}</span
							>
						</div>
						<div class="flex flex-row items-center md:gap-2">
							<Popup placement="top">
								<img
									class="min-w-5 w-5 md:w-8"
									src="/flags/{data.user.info.country?.toUpperCase() ?? "XX"}.png"
									alt="country flag"
								/>
								<svelte:fragment slot="popup">
									<div class="card p-2 px-4 rounded-lg variant-filled-surface text-sm">
										{getCountryName(data.user.info.country)}
										<div
											class="arrow border-r border-b border-gray-700 variant-filled-surface"
										></div>
									</div>
								</svelte:fragment>
							</Popup>
							<span class="hidden md:block">{getCountryName(data.user.info.country)}</span>
							<UserRankBadges userPriv={data.user.info.priv}></UserRankBadges>
						</div>
					</div>
					<div class="ms-auto flex flex-row items-center gap-5">
						<div class="flex flex-col font-semibold text-xs text-end">
							<Popup placement="top">
								<div
									class="hidden md:block relative h-2 w-24 lg:w-52 bg-gray-950 rounded-lg border border-surface-700"
								>
									<div
										class="bg-gradient-to-r from-primary-400 to-primary-600 h-full rounded-lg"
										style="width: {$levelProgress}%;"
									></div>
									<div class="absolute mt-[2px] top-[100%] right-0">
										{Math.trunc($levelProgress)}%
									</div>
								</div>
								<svelte:fragment slot="popup">
									<div class="card p-2 px-4 rounded-lg variant-filled-surface font-normal text-xs">
										{__('progress to next level', $userLanguage)}
										<div
											class="arrow border-r border-b border-gray-700 variant-filled-surface"
										></div>
									</div>
								</svelte:fragment>
							</Popup>
						</div>
						<div class="relative inline-flex items-center justify-center h-[50px] w-[50px]">
							<div class="absolute w-full h-full level-icon level level-{$level}"></div>
							<span class="absolute text-[20px] font-semibold">{$level}</span>
						</div>
					</div>
				</div>
				<div class="p-3 md:p-0 bg-surface-800">
					<div class="flex flex-col md:flex-row justify-between gap-10">
						<!-- left side -->
						<div class="w-full flex md:ms-12 flex-col justify-around gap-1">
							<div class="w-full flex flex-row justify-around md:justify-normal gap-10">
								<div class="flex flex-col w-[50%] md:w-fit">
									<span class="text-xs">{__('Global Ranking', $userLanguage)}</span>
									<span class="text-xl md:text-3xl font-semibold text-primary-200"
										>#{$globalRank <= 0 ? '-' : $globalRank}</span
									>
								</div>
								<div class="flex flex-col w-[50%] md:w-fit">
									<span class="text-xs">{__('Country Ranking', $userLanguage)}</span>
									<span class="text-xl md:text-3xl font-semibold text-primary-200"
										>#{$countryRank <= 0 ? '-' : $countryRank}</span
									>
								</div>
							</div>

							<div
								class="w-full flex flex-col md:flex-row justify-around items-center md:items-end md:justify-normal gap-10"
							>
								<div class="w-full flex flex-row justify-around md:justify-normal gap-10">
									<div class="flex flex-col w-[50%] md:w-fit">
										<span class="text-xs">{__('Performance Points', $userLanguage)}</span>
										<span class="text-normal font-semibold text-primary-200"
											>{numberHumanReadable($performancePoints)}</span
										>
									</div>
									<div class="flex flex-col w-[50%] md:w-fit">
										<span class="text-xs">{__('Total Play Time', $userLanguage)}</span>
										<span
											class="text-normal font-semibold text-primary-200 tooltip"
											aria-label={secondsToHours($playTime, $userLanguage)}
											>{secondsToDHM($playTime)}</span
										>
									</div>
								</div>
								<div class="flex flex-row gap-8 md:ms-auto">
									<div class="flex flex-col items-center justify-center">
										<span class="text-2xl font-semibold grade grade-xh">SS</span>
										<span class="text-xs">{numberHumanReadable($xhGrade)}</span>
									</div>
									<div class="flex flex-col items-center justify-center">
										<span class="text-2xl font-semibold grade grade-x">S</span>
										<span class="text-xs">{numberHumanReadable($xGrade)}</span>
									</div>
									<div class="flex flex-col items-center justify-center">
										<span class="text-2xl font-semibold grade grade-sh">SS</span>
										<span class="text-xs">{numberHumanReadable($shGrade)}</span>
									</div>
									<div class="flex flex-col items-center justify-center">
										<span class="text-2xl font-semibold grade grade-a">A</span>
										<span class="text-xs">{numberHumanReadable($aGrade)}</span>
									</div>
								</div>
							</div>
						</div>

						<!-- right side -->
						<div class="p-3 md:mr-6 grid grid-cols-2 gap-[4px_100px] text-xs font-semibold">
							<dl class="contents drop-shadow-[0_0_2px_rgba(0,0,0,1)]">
								<dt class="w-max">{__('Joined', $userLanguage)}</dt>
								<dd
									class="tooltip"
									aria-label={new Date(data.user.info.creation_time * 1000).toUTCString()}
								>
									<Time
										timestamp={dayjs(data.user.info.creation_time * 1000).locale($userLanguage)}
										relative
									/>
								</dd>
							</dl>
							<dl class="contents drop-shadow-[0_0_2px_rgba(0,0,0,1)]">
								<dt class="w-max">{__('Latest Activity', $userLanguage)}</dt>
								<dd
									class="tooltip"
									aria-label={new Date(data.user.info.latest_activity * 1000).toUTCString()}
								>
									<Time
										timestamp={dayjs(data.user.info.latest_activity * 1000).locale($userLanguage)}
										relative
									/>
								</dd>
							</dl>
							<dl class="contents drop-shadow-[0_0_2px_rgba(0,0,0,1)]">
								<dt class="w-max">{__('Ranked Score', $userLanguage)}</dt>
								<dd>{numberHumanReadable($rankedScore)}</dd>
							</dl>
							<dl class="contents">
								<dt class="w-max">{__('Hit Accuracy', $userLanguage)}</dt>
								<dd>{removeTrailingZeroes($hitAccuracy)}%</dd>
							</dl>
							<dl class="contents">
								<dt class="w-max">{__('Play Count', $userLanguage)}</dt>
								<dd>{$playCount}</dd>
							</dl>
							<dl class="contents">
								<dt class="w-max">{__('Total Score', $userLanguage)}</dt>
								<dd>{numberHumanReadable($totalScore)}</dd>
							</dl>
							<dl class="contents">
								<dt class="w-max">{__('Maximum Combo', $userLanguage)}</dt>
								<dd>{numberHumanReadable($maxCombo)}</dd>
							</dl>
							<dl class="contents">
								<dt class="w-max">{__('Replays Watched by Others', $userLanguage)}</dt>
								<dd>{numberHumanReadable($replayViews)}</dd>
							</dl>
						</div>
					</div>
				</div>
				<div class="flex flex-col gap-2 bg-surface-800 p-7 py-2">
					<div class="card !bg-surface-700 w-full py-3 p-6 relative">
						<div class="flex flex-col gap-5">
							<div class="flex justify-between items-center">
								<p
									class="text-lg font-bold underline underline-offset-4 decoration-2 decoration-primary-400"
								>
									{__('me!', $userLanguage)}
								</p>
								{#if $userData?.id == data.user.info.id}
									{#if !isEditing}
										<button 
											class="btn btn-icon variant-filled-surface h-10 w-10 absolute top-2 right-2"
											on:click={handleEditToggle}
										>
											<Edit2 class="pointer-events-none" size={20} />
										</button>
									{:else}
										<div class="absolute top-2 right-2 flex gap-2">
											<button 
												class="btn btn-icon variant-filled-surface h-10 w-10"
												on:click={handleEditToggle}
											>
												<Edit2 class="pointer-events-none" size={20} />
											</button>
											<form 
												method="POST" 
												action="?/updateUserpage"
												use:enhance={() => {
													return async ({ update }) => {
														await update({ reset: false });
														isEditing = false;
													};
												}}
											>
												<input 
													type="hidden" 
													name="userpage" 
													value={editedUserpage} 
												/>
												<button 
													type="submit"
													class="btn btn-icon variant-filled-primary h-10 w-10"
												>
													<Check class="pointer-events-none" size={20} />
												</button>
											</form>
										</div>
									{/if}
								{/if}
							</div>

							{#if !isEditing}
								<div class="w-full text-left userpage max-h-[550px] overflow-y-auto">
									{#if data.userpage.length > 0}
										{@html data.userpage}
									{:else}
										<p class="text-surface-400 italic">{__("this user hasn't set an about me! section yet", $userLanguage)}</p>
									{/if}
								</div>
							{:else}
								<textarea 
									class="textarea w-full min-h-[300px] bg-surface-600"
									bind:value={editedUserpage}
									placeholder={__('write something about yourself...', $userLanguage)}
								></textarea>
							{/if}
						</div>
					</div>
					<div class="card !bg-surface-700 w-full py-3 p-6">
						<div class="flex flex-col gap-5">
							<p
								class="text-lg font-bold underline underline-offset-4 decoration-2 decoration-primary-400"
							>
								{__('Ranks', $userLanguage)}
							</p>
							<div class="relative flex flex-col gap-5">
								{#key currentModeInt}
									<UserScores
										title="pinned scores"
										{currentMode}
										{currentType}
										userId={data.user.info.id}
										scoreAmount={5}
										scoresType="pinned"
										currentUserId={$userData?.id}
									/>

									<UserScores
										title="Best Performance"
										{currentMode}
										{currentType}
										userId={data.user.info.id}
										scoreAmount={5}
										scoresType="best"
										currentUserId={$userData?.id}
									/>

									<UserScores
										title="first place scores"
										{currentMode}
										{currentType}
										userId={data.user.info.id}
										scoreAmount={5}
										scoresType="first"
										currentUserId={$userData?.id}
									/>

									<UserScores
										title="Recent"
										{currentMode}
										{currentType}
										userId={data.user.info.id}
										scoreAmount={5}
										scoresType="recent"
										currentUserId={$userData?.id}
									/>
								{/key}
							</div>
						</div>
					</div>
					<div class="card !bg-surface-700 w-full py-3 p-6">
						<div class="flex flex-col gap-5">
							<p
								class="text-lg font-bold underline underline-offset-4 decoration-2 decoration-primary-400"
							>
								{__('Historical', $userLanguage)}
							</p>
							<div class="relative flex flex-col gap-5">
								{#key currentModeInt}
									<UserMostPlayed
										title="Most Played Beatmaps"
										{currentMode}
										{currentType}
										userId={data.user.info.id}
										scoreAmount={5}
									/>
								{/key}
							</div>
						</div>
					</div>
				</div>
				<div class="p-2 bg-surface-700 rounded-b-lg"></div>
			</div>
		</div>
	{:else}
		<div class="mx-auto card p-6 py-12">
			<div
				class="w-full flex flex-col lg:divide-x divide-surface-500 lg:flex-row items-center justify-around gap-5 lg:gap-2"
			>
				<div class="flex flex-col items-center justify-center">
					<p class="text-4xl">404</p>
					<p class="text-xl">{__('User Profile not found.', $userLanguage)}</p>
				</div>
				<div class="flex flex-col items-center lg:items-start justify-normal lg:ps-20 gap-2">
					<p class="text-lg font-semibold underline underline-offset-2">
						{__('There are a few possible reasons for this:', $userLanguage)}
					</p>
					<ul class="list-disc ms-5">
						<li>{__('They may have changed their username', $userLanguage)}</li>
						<li>
							{__(
								'The account may be temporarily unavailable due to security or abuse issues',
								$userLanguage
							)}
						</li>
						<li>{__('You may have made a typo!', $userLanguage)}</li>
					</ul>
					<a class="mx-auto mt-10 btn variant-filled-surface" href="/"
						>{__('Back to Home', $userLanguage)}</a
					>
				</div>
			</div>
		</div>
	{/if}
</div>