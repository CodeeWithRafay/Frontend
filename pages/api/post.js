import { Client, Databases, ID } from "appwrite";

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
const postData = { HandleCommentPost, HandleReplyPostComment };

export default postData;