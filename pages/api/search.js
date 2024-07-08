// lib/appwrite.js
import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('65e69a022811af019dca'); // Your project ID

const databases = new Databases(client);

export { client, databases };
