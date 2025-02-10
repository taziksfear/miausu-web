import { getMapRequests } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    const mapRequests = await getMapRequests();

    return {
      mapRequests: mapRequests || [],
    };
  } catch (error) {
    console.error('Failed to load map requests:', error);
    return {
      mapRequests: [],
    };
  }
};