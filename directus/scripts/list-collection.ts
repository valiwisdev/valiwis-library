import { readCollections } from '@directus/sdk';
import { directusInstance } from "../directus.ts";

const collections = await directusInstance.client.request(readCollections()); 
console.log('Collections:', collections);
