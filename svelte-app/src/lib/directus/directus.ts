import { createDirectus, rest } from '@directus/sdk';
import { PUBLIC_APIURL } from '$env/static/public';
import type { DirectusSchema } from '$lib/directus/schema';

function getDirectusInstance(fetch?: typeof globalThis.fetch) {
    const options = fetch ? { globals: { fetch } } : {};
    const directus = createDirectus<DirectusSchema>(PUBLIC_APIURL, options).with(rest());
    return directus;
}

export default getDirectusInstance;
