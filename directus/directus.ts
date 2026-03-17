import { createDirectus, authentication, rest } from '@directus/sdk';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DIRECTUS_EMAIL || !process.env.DIRECTUS_PASSWORD) {
  throw new Error('DIRECTUS_EMAIL and DIRECTUS_PASSWORD must be set in the environment variables');
}

class Directus {
  email: string | undefined;
  password: string | undefined;
  client: any;

  constructor() {
    this.email = process.env.DIRECTUS_EMAIL;
    this.password = process.env.DIRECTUS_PASSWORD;
    this.client = createDirectus('http://localhost:8055').with(authentication('json')).with(rest());
  }

  async login() {
    await this.client.login({
      email: this.email,
      password: this.password
    });
  }
}

const directusInstance = new Directus();

await directusInstance.login();

export { directusInstance };










