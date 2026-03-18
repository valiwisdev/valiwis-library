import {
    readCollections,
    createCollection,
    deleteCollection,
    readFieldsByCollection,
} from '@directus/sdk';
import { createInterface } from 'node:readline/promises';
import type { DirectusCollection } from '@directus/sdk';
import { DirectusInstance } from '../directus.ts';
import figlet from 'figlet';
import chalk from 'chalk';

const client = DirectusInstance.client;
const rl = createInterface({ input: process.stdin, output: process.stdout });

// ─── Visual Helpers ────────────────────────────────────────────────────────────

const ICONS = {
    success: chalk.green('✔'),
    error:   chalk.red('✖'),
    warn:    chalk.yellow('⚠'),
    info:    chalk.cyan('ℹ'),
    arrow:   chalk.gray('›'),
};

const DIVIDER = chalk.gray('─'.repeat(52));

function clearScreen() {
    process.stdout.write('\x1Bc');
}

function printBanner() {
    const title = figlet.textSync('Directus CLI', { font: 'Small Slant' });
    console.log(chalk.cyanBright(title));
    console.log(chalk.gray('  Collection Manager  ·  Directus SDK\n'));
}

function printSectionHeader(label: string, color = chalk.cyanBright) {
    console.log(DIVIDER);
    console.log(color(`  ${label}`));
    console.log(DIVIDER);
}

function printSuccess(msg: string) {
    console.log(`\n${ICONS.success}  ${chalk.green(msg)}\n`);
}

function printError(msg: string) {
    console.log(`\n${ICONS.error}  ${chalk.red(msg)}\n`);
}

function printInfo(msg: string) {
    console.log(`${ICONS.info}  ${chalk.gray(msg)}`);
}

function printMenu() {
    console.log(chalk.bold('\n  What would you like to do?\n'));
    console.log(`  ${chalk.cyan('1')}  ${chalk.white('List collections')}`);
    console.log(`  ${chalk.green('2')}  ${chalk.white('Create a collection')}`);
    console.log(`  ${chalk.red('3')}  ${chalk.white('Delete a collection')}`);
    console.log(`  ${chalk.gray('q')}  ${chalk.gray('Quit')}\n`);
    console.log(DIVIDER);
}

// ─── Operations ────────────────────────────────────────────────────────────────

async function listCollections(client = DirectusInstance.client): Promise<DirectusCollection[]> {
    const all = await client.request(readCollections());
    const collections = all.filter((c) => !c.collection.startsWith('directus_'));

    if (collections.length === 0) {
        printInfo('No collections found.');
        return [];
    }

    console.log();
    for (const collection of collections) {
        const fields = await client.request(readFieldsByCollection(collection.collection));
        const fieldList = fields.map((f) => chalk.yellow(f.field) + chalk.gray(` (${f.type})`));

        console.log(`  ${chalk.cyanBright('▸')} ${chalk.bold(collection.collection)}`);
        if (fieldList.length > 0) {
            console.log(`    ${chalk.gray('Fields:')} ${fieldList.join(chalk.gray(', '))}`);
        } else {
            console.log(`    ${chalk.gray('No fields yet.')}`);
        }
        console.log();
    }

    printInfo(`${collections.length} collection(s) found.`);
    return collections;
}

async function createNewCollection() {
    const name = await rl.question(chalk.white('  Collection name: '));

    if (!name.trim()) {
        printError('Name cannot be empty.');
        return;
    }

    await client.request(
        createCollection({
            collection: name.trim(),
            schema: { fields: [] },
            meta: { singleton: false },
        })
    );

    printSuccess(`Collection "${name}" created successfully.`);
}

async function delCollection() {
    const all = await client.request(readCollections());
    const collections = all.filter((c) => !c.collection.startsWith('directus_'));

    if (collections.length === 0) {
        printInfo('No collections to delete.');
        return;
    }

    console.log();
    for (const [i, c] of collections.entries()) {
        const fields = await client.request(readFieldsByCollection(c.collection));
        const fieldList = fields.map((f) => chalk.yellow(f.field) + chalk.gray(` (${f.type})`));

        console.log(`  ${chalk.gray(String(i + 1).padStart(2))}  ${chalk.bold.white(c.collection)}`);
        if (fieldList.length > 0) {
            console.log(`      ${chalk.gray('Fields:')} ${fieldList.join(chalk.gray(', '))}`);
        } else {
            console.log(`      ${chalk.gray('No fields.')}`);
        }
        console.log();
    }

    const name = await rl.question(chalk.white('  Collection name to delete: '));

    const exists = collections.some((c) => c.collection === name.trim());
    if (!exists) {
        printError(`Collection "${name}" does not exist.`);
        return;
    }

    const confirm = await rl.question(
        chalk.red(`  ⚠  This cannot be undone. Type "${name}" to confirm: `)
    );

    if (confirm.trim() !== name.trim()) {
        printInfo('Deletion cancelled.');
        return;
    }

    await client.request(deleteCollection(name.trim()));
    printSuccess(`Collection "${name}" deleted.`);
}

// ─── Main Loop ─────────────────────────────────────────────────────────────────

async function promptUser() {
    clearScreen();
    printBanner();
    printMenu();

    const input = await rl.question(chalk.white('  › '));
    const command = input.trim().toLowerCase();

    clearScreen();
    printBanner();

    switch (command) {
        case '1':
        case 'list':
            printSectionHeader('Collections', chalk.cyanBright);
            await listCollections();
            break;

        case '2':
        case 'create':
            printSectionHeader('Create Collection', chalk.green);
            await createNewCollection();
            break;

        case '3':
        case 'delete':
            printSectionHeader('Delete Collection', chalk.red);
            await delCollection();
            break;

        case 'q':
        case 'quit':
        case 'exit':
            console.log(chalk.gray('\n  Goodbye.\n'));
            rl.close();
            process.exit(0);

        default:
            printError(`Unknown command: "${command}". Use 1, 2, 3, or q.`);
    }

    console.log();
    await rl.question(chalk.gray('  Press Enter to continue...'));
    await promptUser();
}

await promptUser();