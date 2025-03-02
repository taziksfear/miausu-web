<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.postcss';
	import '../styles/themes.css';
	import {
		AppShell,
		Avatar,
		Toast,
		initializeStores,
		Drawer,
		getDrawerStore,
		focusTrap
	} from '@skeletonlabs/skeleton';
	import { BarLoader } from 'svelte-loading-spinners';
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml';
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import ThemeSwitcher from '$lib/ThemeSwitcher.svelte';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { fade, fly, scale } from 'svelte/transition';
	import { navigating, page } from '$app/stores';
	import { userData, userLanguage } from '$lib/storage';
	import { onMount } from 'svelte';
	import { appName, avatarUrl, apiUrl } from '$lib/env';
	import Menu from 'svelte-feathers/Menu.svelte';
	import Search from 'svelte-feathers/Search.svelte';
	import NavItems from '$lib/components/navItems.svelte';
	import type { UserData } from '$lib/types';
	import Popup from '$lib/components/Popup.svelte';
	import { __, languages } from '$lib/language';

	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();

	const drawerStore = getDrawerStore();

	export let data;

	if ('currentUser' in data) {
		userData.set(data.currentUser as UserData);
	}

	let showStickyNav = false;
	let userSearchResults: { id: number; name: string }[] = [];
	let userSearchQuery = '';
	let userSearchTimeout: any;

	const searchUsers = async () => {
		if (userSearchTimeout) clearTimeout(userSearchTimeout);

		if (userSearchQuery.length <= 2) {
			userSearchResults = [];
			return;
		}

		userSearchTimeout = setTimeout(async () => {
			try {
				const url = `${apiUrl}/v1/search_players?q=${userSearchQuery}`;
				const response = await fetch(url, {
					method: 'GET'
				});
				if (response.ok) {
					const json = await response.json();
					userSearchResults = json.result;
				} else {
					userSearchResults = [];
				}
			} catch {
				userSearchResults = [];
			}
		}, 500);
	};

	onMount(() => {
		const pageMain = document.getElementById('page');
		if (pageMain) {
			showStickyNav = pageMain.scrollTop > 100;
			pageMain.addEventListener('scroll', () => {
				showStickyNav = pageMain.scrollTop > 100;
			});

			window.addEventListener('resize', () => {
				showStickyNav = pageMain.scrollTop > 100;
				drawerStore.close();
			});
		}
	});

	function handleUserSearchResult(user) {
		goto(`/u/${user.id}`);
		drawerStore.close();
		userSearchQuery = '';
		userSearchResults = [];
	}

	function handleLanguageChange(langCode) {
		userLanguage.set(langCode);
	}

	function handleNavOpen() {
		drawerStore.open({
			id: 'nav',
			padding: 'p-4',
			rounded: 'rounded-lg'
		});
	}

	function handleSearchOpen() {
		drawerStore.open({
			id: 'search',
			padding: 'pt-16 p-4',
			bgBackdrop: 'bg-black/50',
			position: 'top',
			width: 'mx-auto w-full md:w-[800px]',
			rounded: 'rounded-lg'
		});
	}

	function handleSignIn() {
		goto('/signin');
	}

	function handleSignUp() {
		goto('/signup');
	}

	function handleProfile() {
		goto(`/u/${$userData?.id}`);
	}

	function handleLogout() {
		// Add logout logic here
	}

	function handleSettings() {
		// Add settings logic here
	}

	function handleRequests() {
		// Add requests logic here
	}

	function handleThemes() {
		// Add themes logic here
	}
</script>

<Toast />

<Drawer>
	{#if $drawerStore.id == 'nav'}
		<NavItems {drawerStore} />
	{:else if $drawerStore.id == 'search'}
		<div class="p-3 pb-0 w-full h-full flex flex-col overflow-hidden">
			<div class="w-full" use:focusTrap={true}>
				<input
					class="input mb-3 rounded-lg w-full"
					placeholder={__('Who are you looking for?', $userLanguage)}
					bind:value={userSearchQuery}
					on:input={searchUsers}
				/>
			</div>
			<div class="overflow-y-auto">
				<div class="flex flex-col gap-2">
					{#each userSearchResults as user}
						<div
							class="flex items-center gap-2 p-1 rounded-lg cursor-pointer bg-surface-900 hover:bg-surface-700 transition-all"
							transition:scale={{ start: 0.99, duration: 200 }}
							on:click={() => handleUserSearchResult(user)}
						>
							<img src="{avatarUrl}/{user.id}" alt={user.name} class="w-10 h-10 rounded-lg" />
							<p>{user.name}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</Drawer>

{#if $navigating}
	<div
		class="fixed top-0 right-0 w-screen h-screen z-50 pointer-events-none"
		in:fade={{ delay: 1500 }}
		out:fade={{ duration: 500 }}
	>
		<div class="h-full flex flex-col justify-center items-center gap-2 bg-surface-900/80">
			<BarLoader size="60" color="#000" unit="px" duration="1s" />
			<p class="text-xs font-light">
				{__('This is taking longer than expected...', $userLanguage)}
			</p>
		</div>
	</div>
{/if}

<AppShell>
	<svelte:fragment slot="header">
		{#if ($page.data.url != '/signin' && $page.data.url != '/signup') || $page.status != 200}
			<div
				class="fixed w-full"
				in:fly={{ y: -15, duration: 200, delay: 200 }}
				out:fly={{ y: -15, duration: 200 }}
			>
				<div class="mx-auto border {showStickyNav
					? 'mt-2 w-[82%] bg-gradient-to-r from-[#000000] to-[#121212] rounded-lg border-surface-450'
					: 'w-[100%] bg-gradient-to-r from-[#141414] to-[#121212] border-surface-700'}  transition-all duration-700 z-[9999]"
				>
					<div class="flex p-2 px-4 flex-row justify-between items-center gap-2">
						<a class="text-xl uppercase cursor-pointer mr-12" on:click={() => goto('/')}
							>{appName}</a
						>
						<div class="hidden md:flex flex-row justify-start items-center gap-2 me-auto">
							<NavItems {drawerStore} />
						</div>
						<div class="flex flex-row gap-5 items-center">
							<div class="hidden md:block">
								<Popup event="click" placement="bottom">
									<button class="btn px-2 py-2 rounded-lg variant-ghost-surface">
										<img
											width="30"
											class="pointer-events-none"
											src="/flags/{$userLanguage}.png"
											alt="language"
										/>
									</button>
									<svelte:fragment slot="popup">
										<div class="flex flex-col gap-2 card variant-filled-surface p-2 rounded-lg">
											{#each languages as lang}
												<button
													class="flex flex-row items-center {$userLanguage == lang.code
														? 'bg-primary-600/30'
														: 'bg-surface-600 hover:bg-surface-700'} hover:scale-[1.005] active:scale-[0.995] transition-all px-6 py-2 rounded-lg cursor-pointer"
													on:click={() => userLanguage.set(lang.code)}
												>
													<img
														width="30"
														src="/flags/{lang.code}.png"
														alt="flag-{lang.code}"
														class="mr-2"
													/>
													{lang.name}
												</button>
											{/each}
										</div>
									</svelte:fragment>
								</Popup>
							</div>
							<button
								class="btn px-5 variant-ghost-surface"
								on:click={handleSearchOpen}
							>
								<Search class="pointer-events-none" size={18} />
							</button>
							<div class="hidden md:block">
								<Popup event="click" placement="bottom">
									<Avatar
										src="{avatarUrl}/{$userData?.id ?? 0}"
										class="!w-10 select-none cursor-pointer hover:ring hover:ring-surface-600 transition-all"
									/>
									<svelte:fragment slot="popup">
										<div class="card p-4 variant-filled-surface">
											<div class="flex flex-col gap-2">
												{#if $userData}
													<button
														class="w-32 btn variant-filled-surface rounded-lg"
														on:click={handleProfile}
														>{__('Profile', $userLanguage)}</button
													>
													<a class="w-32 btn variant-filled-surface rounded-lg" href="/logout"
														>{__('Logout', $userLanguage)}</a
													>
													<a class="w-32 btn variant-filled-surface rounded-lg" href="/settings"
														>{__('Settings', $userLanguage)}</a
													>
													<!--<a class="w-32 btn variant-filled-surface rounded-lg" href="/requests"
														>{__('Requests', $userLanguage)}</a
											>-->
													<a class="w-32 byn variant-filled-surface rounded-lg" href="/themes"
														>{__('Themes', $userLanguage)}</a
													>
												{:else}
													<button
														class="w-32 btn variant-filled-surface rounded-lg"
														on:click={handleSignIn}>{__('Sign In', $userLanguage)}</button
													>
													<a class="w-32 btn variant-filled-surface rounded-lg" href="/themes"
														>{__('Themes', $userLanguage)}</a
													>
													<button
														class="w-32 btn variant-filled-surface rounded-lg"
														on:click={handleSignUp}>{__('Sign Up', $userLanguage)}</button
													>
												{/if}
											</div>
											<div
												class="arrow variant-filled-surface border-t border-l border-gray-700 !right-[0px]"
											/>
										</div>
									</svelte:fragment>
								</Popup>
							</div>
							<div class="md:hidden">
								<button
									class="btn btn-icon variant-ghost-surface rounded-lg"
									on:click={handleNavOpen}
								>
									<Menu class="pointer-events-none" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</svelte:fragment>
	{#key data.url}
		<div
			class={($page.data.url != '/signin' && $page.data.url != '/signup') || $page.status != 200
				? 'mt-14 h-[calc(100vh-3.5rem)]'
				: ''}
			in:scale={{ start: 0.99, duration: 200, delay: 200 }}
			out:scale={{ start: 0.99, duration: 200 }}
		>
			<slot />
		</div>
	{/key}
</AppShell>