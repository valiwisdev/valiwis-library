import { readCollections } from '@directus/sdk';
import { DirectusInstance } from "../directus.ts";


async function listCollections() {

    const collections = await DirectusInstance.client.request(readCollections());
    console.log('Collections:');
    collections.forEach((collection) => {
        console.log(`- ${collection.collection}`);
    });
}

await listCollections();
process.exit(0);
