import { readCollections } from '@directus/sdk';
import { createInterface } from 'node:readline/promises';
import { DirectusInstance } from "../directus.ts";

const rl = createInterface({ input: process.stdin, output: process.stdout });

async function listCollections() {
    const collections = await DirectusInstance.client.request(readCollections());
    console.log('Collections:');
    collections.forEach((collection) => {
        console.log(`- ${collection.collection}`);
    });
}

async function promptUser() {
    const command = await rl.question('Enter a command (create, list, q): ');
    switch (command) {
        case 'create':
            console.log('Create collection functionality is not implemented yet.');
            break;
        case 'list':
            await listCollections();
            break;
        case 'q':
            console.log('Exiting...');
            rl.close();
            process.exit(0);
        default:
            console.log('Invalid command. Please try again.');
    }
    await promptUser();
}

await promptUser();
