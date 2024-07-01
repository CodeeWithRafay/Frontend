import { Client, Databases, Account, ID, AppwriteException } from "appwrite";
import { toast } from "react-toastify";


function handleError(error)
{
    const errorCode = error.code || error.response?.status || error.status;

    switch (errorCode) {
        case 401:
            toast.error('Invalid email or password.');
            break;
        case 409:
            toast.error('User with the same email already exists.');
            break;
        case 400:
            toast.error('User with same email already exists');
            break;
        case 429:
            toast.error('Please try again later due to High traffic.');
            break;
        case 404:
            toast.error('Requested resource not found.');
            break;
        case 403:
            toast.error('Access denied. You do not have permission to perform this action.');
            break;
        case 422:
            toast.error('Unprocessable entity. Please check the data you have provided.');
            break;
        case 500:
            toast.error('Internal server error. Please try again later.');
            break;
        case 503:
            toast.error('Service unavailable. Please try again later.');
            break;
        default:
            toast.error('An unexpected error occurred. Please try again later.');
            break;
    }
}


export async function HandleCommentPost(text, slug, username)
{
    const formattedDate = new Date().toISOString().slice(0, 10);
    const formattedusername = username.split('@')[0];

    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('65e69a022811af019dca');

    const databases = new Databases(client);

    const promise = databases.createDocument(
        '65e6a28976615aa73abb',
        '65ee7a19e402a6b0ff30',
        ID.unique(),
        {
            commentText: text,
            blogSlug: slug,
            username: formattedusername,
            Date: formattedDate
        }


    );

    promise.then(function (response)
    {

        return (response)
    }, function (error)
    {
        return (error)
    });

}
export async function HandleReplyPostComment(text, commentId, username)
{
    const formattedDate = new Date().toISOString().slice(0, 10);

    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('65e69a022811af019dca');

    const databases = new Databases(client);

    const promise = databases.createDocument(
        '65e6a28976615aa73abb',
        '65f158d4f40d89610edb',
        ID.unique(),
        {
            repliesText: text,
            commentId: commentId,
            username: username,
            date: formattedDate
        }


    );

    promise.then(function (response)
    {

        return (response)
    }, function (error)
    {
        return (error)
    });

}

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65e69a022811af019dca');

const account = new Account(client);


// Signup
export async function HandleSignup(email, password)
{
    try {
        const username = email.substring(0, email.indexOf('@'));

        // Create account
        try {
            await account.create(ID.unique(), email, password, username);
        } catch (error) {
            handleError(error);
            return;
        }

        // Create email session
        try {
            await account.createEmailSession(email, password);
        } catch (error) {
            handleError(error);
            return;
        }

        // Initiate verification process
        try {
            await account.createVerification('http://localhost:3000/verify');
            toast.success('Verification Email sent. Please check your inbox.');
        } catch (error) {
            toast.error('Something Went Wrong! Try again later', { autoClose: 2000 });
        }
    } catch (error) {
        if (error instanceof AppwriteException) {
            handleError(error);
        } else {
            toast.error('Something Went Wrong! Try again later', { autoClose: 2000 });
        }
    }
}

// Login
export async function HandleLogin(email, password)
{
    try {
        const response = await account.createEmailSession(email, password);
        return true;
    } catch (error) {
        handleError(error);
        return false;
    }
}

// Logout
export async function HandleLogout()
{
    try {
        await account.deleteSession('current');
        return true;
    } catch (error) {
        handleError(error);
        return false;
    }
}
// Reset Password
export async function HandleResetPassword(email)
{
    try {
        await account.createRecovery(email, 'http://localhost:3000/reset'); // Adjust the URL as needed
        toast.success('Instructions to reset password send to your email!');
      } catch (error) {  
          handleError(error);
      }
}

const postData = { HandleCommentPost, HandleReplyPostComment, HandleLogin, HandleSignup, HandleLogout,HandleResetPassword };

export default postData;