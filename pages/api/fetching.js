
import { Client, Databases } from "appwrite";

export async function Fetching ( collectionId ) {
  const client = new Client();

  const databases = new Databases(client);

  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

  const promise = databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, collectionId);

  return promise.then(function (response) {
    return response
  });
}



