import { Client, Account } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65e69a022811af019dca');

const account = new Account(client);

export async function getLoginedUserDetails() {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error; 
    }
}
