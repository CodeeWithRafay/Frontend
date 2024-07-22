import { Client, Account } from 'appwrite';

const client = new Client()
.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);

export async function getLoginedUserDetails() {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
      
    }
}
