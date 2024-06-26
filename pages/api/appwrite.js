import { Client, Account} from "appwrite";

const client = new Client()
    // .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT) // Your API Endpoint
    // .setProject(process.env.NEXT_APPWRITE_PROJECTID);               // Your project ID
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('65e69a022811af019dca');               // Your project ID

const account = new Account(client);

export {ID,Account} from 'appwrite'

// const promise = account.create('[USER_ID]', 'email@example.com', '');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });

