import { createDirectus, authentication, rest } from '@directus/sdk';
import dotenv from 'dotenv';

dotenv.config();

const client = createDirectus('http://localhost:8055').with(authentication('json')).with(rest());

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

if (!email || !password) {
  console.error('EMAIL and PASSWORD must be set in the .env file');
  process.exit(1);
}

const result = await client.login({
  email: email,
  password: password
});

console.log('Login successful:', result);






