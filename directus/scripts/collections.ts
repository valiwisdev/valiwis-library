import { readCollections, createCollection, deleteCollection, readFieldsByCollection} from '@directus/sdk';
import { createInterface } from 'node:readline/promises';
import type { DirectusCollection } from '@directus/sdk';
import { DirectusInstance } from "../directus.ts";
import figlet from 'figlet';
import chalk from 'chalk';
import type { ChalkInstance } from 'chalk';

const client = DirectusInstance.client;

const rl = createInterface({ input: process.stdin, output: process.stdout });

function createTitle(text: string, color: ChalkInstance) {
    const title = figlet.textSync(text, { font: 'Small Slant' });
    console.log(color(title));
}

async function listCollections(client = DirectusInstance.client): Promise<DirectusCollection[]> {
    const collections = await client.request(readCollections());
    const filteredCollections = collections.filter((collection) => !collection.collection.startsWith('directus_'));
    for (const collection of filteredCollections) {
        const fields = await client.request(readFieldsByCollection(collection.collection));
        const fielDetails = fields.map((field) => `${field.field} (${field.type})`);
        console.table({ Collection: collection.collection, Fields: fielDetails.join(', ') });
    }
    return filteredCollections;
}

async function createNewCollection() {
    const name = await rl.question('Enter collection name: ');
    const createdCollection = await client.request(createCollection({ collection: name, schema: { fields: [] }, meta: { singleton: false } }));
    console.log(createdCollection);
}

async function delCollection() {
    const collections = await client.request(readCollections());
    await listCollections(client);
    const name = await rl.question('Enter collection name to delete: ');
    const collectionExists = collections.some((collection) => collection.collection === name);
    if (!collectionExists) {
        console.log(`Collection ${name} does not exist.`);
        return;
    }
    await client.request(deleteCollection(name));
    console.log(`Collection ${name} deleted.`);
}


async function promptUser() {
    const command = await rl.question('Enter a command (create, list, delete, q): ');
    switch (command) {
        case 'create':
            process.stdout.write('\x1Bc'); 
            createTitle('Create Collection', chalk.green);
            await createNewCollection();
            break;
        case 'list':
            process.stdout.write('\x1Bc');
            createTitle('List Collections', chalk.green);
            await listCollections();
            break;
        case 'delete':
            process.stdout.write('\x1Bc');
            createTitle('Delete Collection', chalk.red);
            await delCollection();
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

