import type { PageServerLoad } from './$types';
import getDirectusInstance from '$lib/directus/directus';
import { readSingleton } from '@directus/sdk';

export const load: PageServerLoad = async ({ fetch }) => {
    const directus = getDirectusInstance(fetch);
    return {
      global: await directus.request(readSingleton('global')),
    };
};