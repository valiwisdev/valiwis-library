import { createDirectus, rest, staticToken } from '@directus/sdk';
import { PUBLIC_APIURL } from '$env/static/public';
import type { DirectusSchema } from '$lib/directus/schema';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DIRECTUS_TOKEN) {
    console.error('Error: DIRECTUS_TOKEN is not set in the environment variables.');
    process.exit(1);
}

function getDirectusInstance(fetch?: typeof globalThis.fetch) {
    const options = fetch ? { globals: { fetch } } : {};
    const directus = createDirectus<DirectusSchema>(PUBLIC_APIURL, options).with(staticToken(process.env.DIRECTUS_TOKEN!)).with(rest());
    return directus;
}

export default getDirectusInstance;
