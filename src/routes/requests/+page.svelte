<script lang="ts">
    import { appName, appUrl } from '$lib/env';
    import { __ } from '$lib/language';
    import { userLanguage } from '$lib/storage';
    import Frown from 'svelte-feathers/Frown.svelte';
    import '$lib/styles/themes.css';
  
    export let data;
  
    async function getMapDetails(mapId: string) {
      const response = await fetch(`https://osu.ppy.sh/api/get_beatmaps?k=YOUR_API_KEY&b=${mapId}`);
      const mapData = await response.json();
      return mapData[0];
    }
  </script>
  
  <svelte:head>
    <title>{appName} :: Map Requests</title>
    <meta property="og:title" content="Map Requests" />
    <meta property="og:url" content="{appUrl}/requests" />
  </svelte:head>
  
  <div class="container mx-auto w-full p-5">
    <h1 class="text-4xl mb-5">{__('Map Requests', $userLanguage)}</h1>
  
    {#if data.mapRequests.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each data.mapRequests as request}
          {#await getMapDetails(request.map_id) then mapDetails}
            <div class="card bg-surface-700 p-4 rounded-lg">
              <img
                src={`https://b.ppy.sh/thumb/${mapDetails.beatmapset_id}.jpg`}
                alt={mapDetails.title}
                class="w-full h-32 object-cover rounded-lg mb-3"
              />
              <p class="text-lg font-semibold">{mapDetails.title}</p>
              <a
                href={`https://osu.ppy.sh/b/${request.map_id}`}
                target="_blank"
                class="text-primary-500 hover:text-primary-300 transition-colors"
              >
                View on osu!
              </a>
            </div>
          {/await}
        {/each}
      </div>
    {:else}
      <div class="card bg-surface-700 p-6 py-12 flex flex-col items-center justify-center">
        <Frown class="pointer-events-none" size={42}></Frown>
        <p class="text-gray-300 font-semibold mt-3">{__('No map requests found.', $userLanguage)}</p>
      </div>
    {/if}
  </div>