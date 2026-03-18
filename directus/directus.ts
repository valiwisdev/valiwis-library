import { createDirectus, staticToken, rest } from '@directus/sdk';
import type { DirectusClient, RestClient } from '@directus/sdk';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DIRECTUS_TOKEN) {
    console.error('Error: DIRECTUS_TOKEN is not set in the environment variables.');
    process.exit(1);
}

class Directus {
  token: string;
  client: DirectusClient<object> & RestClient<object>;

  constructor() {
    this.token = process.env.DIRECTUS_TOKEN!;
    this.client = createDirectus('http://localhost:8055').with(staticToken(this.token)).with(rest());
  }
}

const DirectusInstance = new Directus();

export { DirectusInstance };










