import { Client, Account} from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('65e69a022811af019dca');            

const account = new Account(client);

export {client,account}

