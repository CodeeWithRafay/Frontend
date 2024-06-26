
import { Client, Databases } from "appwrite";

export async function Fetching ( collectionId ) {
  const client = new Client();

  const databases = new Databases(client);

  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65e69a022811af019dca');

  const promise = databases.listDocuments('65e6a28976615aa73abb', collectionId);

  return promise.then(function (response) {
    return response
  }, function (error) {
    return error;
  });
}



