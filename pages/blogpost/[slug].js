import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Fetching } from '@/pages/api/fetching';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { HandleCommentPost, HandleReplyPostComment } from '@/pages/api/post';
import logo from "@/image/logo.png";
import user from '@/image/user.png';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/themes/prism-okaidia.css';
import Head from 'next/head';
import graph from '../graph.png'

export default function BlogPostPage({ blogs, comments, replyComments })
{
  const router = useRouter();
  const { data: session } = useSession();
  const { slug } = router.query;

  // State variables
  const [BlogPost, setBlogPost] = useState(null);
  const [BlogPostComments, setBlogPostComments] = useState([]);
  const [CommentText, setCommentText] = useState('');
  const [replyCommentText, setReplyCommentText] = useState('');
  const [ShowReplies, setShowReplies] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyFormVisible, setReplyFormVisible] = useState(null);

  const [repliedComments, setRepliedComments] = useState([]); // Track replied comments

  const [fetchedReplyComments, setFetchedReplyComments] = useState(replyComments); // Store fetched reply comments

  useEffect(() =>
  {
    const filteringBlogs = blogs.filter((blog) => blog.slug === slug);
    if (filteringBlogs.length > 0) {
      setBlogPost(filteringBlogs[0]);
    } else {
      setBlogPost(null);
    }
    const filteringComments = comments.filter((comment) => comment.blogSlug === slug);
    setBlogPostComments(filteringComments);

  }, [blogs, slug, comments]);


  useEffect(() =>
  {
    setFetchedReplyComments(replyComments);
  }, [replyComments]);


  // Function to replace code blocks with highlighted Prism code
  const replaceCodeBlocks = (content) =>
  {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const codeBlocks = doc.querySelectorAll('pre[class*="language-"]');

    codeBlocks.forEach((block) =>
    {
      const code = block.textContent.trim();
      const languageClass = Array.from(block.classList).find((cls) => cls.startsWith('language-'));
      const language = languageClass ? languageClass.replace('language-', '') : 'jsx'; // Default language is JSX
      const highlightedCode = Prism.highlight(code, Prism.languages[language], language);

      block.innerHTML = `<code class="${languageClass}">${highlightedCode}</code>`;
      Prism.highlightElement(block.querySelector('code'));
    });

    return doc.body.innerHTML;
  };

  // Handle input change for comment text area
  const handleCommentText = (e) =>
  {
    setCommentText(e.target.value);
  };

  // Function to post a comment
  const PostComment = async (event) =>
  {
    event.preventDefault();
    if (session) {
      const Username = session.user.email.split('@')[0];
      try {
        await HandleCommentPost(CommentText, slug, Username);
        toast('Comment Added', { type: 'success', autoClose: 4000 });

        // Update state with new comment
        setBlogPostComments([...BlogPostComments, {
          commentText: CommentText,
          username: Username,
          Date: new Date().toISOString().slice(0, 10),
        }]);

        // Clear comment text
        setCommentText('');
      } catch (error) {
        toast('Failed to add comment', { type: 'error', autoClose: 4000 });
      }
    } else {
      toast('You need to login first', { type: 'error', autoClose: 4000 });
    }
  };

  // Function to post a reply to a comment
  const PostReplyComment = async (id) =>
  {
    if (session) {
      const Username = session.user.email.split('@')[0];

      // Check if the comment has already been replied to
      if (repliedComments.includes(id)) {
        toast('You have already replied to this comment', { type: 'info', autoClose: 4000 });
        return;
      }

      try {
        // Call your function to handle posting replies
        await HandleReplyPostComment(replyCommentText, id, Username);

        // Update state with the new reply
        setBlogPostComments(prevComments =>
        {
          const updatedComments = prevComments.map(comment =>
          {
            if (comment.$id === id) {
              // Ensure comment.replies is initialized as an array
              const updatedReplies = comment.replies ? [...comment.replies] : [];
              return {
                ...comment,
                replies: [
                  ...updatedReplies,
                  {
                    replyText: replyCommentText,
                    username: Username,
                    date: new Date().toISOString().slice(0, 10),
                  }
                ]
              };
            }
            return comment;
          });
          return updatedComments;
        });

        // Clear reply comment text
        setReplyCommentText('');
        setReplyFormVisible(null); // Close reply form

        // Add the comment id to repliedComments
        setRepliedComments([...repliedComments, id]);

        // Notify user of successful reply addition
        toast('Reply Added', { type: 'success', autoClose: 4000 });
      } catch (error) {
        // Handle error if reply addition fails
        // console.error('Failed to add reply:', error);
        toast('Failed to add reply', { type: 'error', autoClose: 4000 });
      }
    } else {
      // Notify user to login first if not authenticated
      toast('You need to login first', { type: 'error', autoClose: 4000 });
    }
  };


  const showReplyFormHandler = (commentId) =>
  {
    // Check if the comment has already been replied to
    if (repliedComments.includes(commentId)) {
      toast('You have already replied to this comment', { type: 'info', autoClose: 4000 });
      return;
    }

    setReplyFormVisible(commentId);
  };


  // Function to cancel reply to a comment
  const cancelReplyHandler = () =>
  {
    setReplyFormVisible(null);
  };

  // SEO Metadata
  const seo = {
    title: BlogPost ? BlogPost.title + ' | CodeWithRafay' : 'Loading...',
    description: BlogPost ? BlogPost.Description : 'Loading...',
    image: BlogPost ? BlogPost.thumbnail : graph,
    url: `https://codewithrafay.com/blogpost/${slug}`,
  };

  return (
    <>

      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />

        {/* Open Graph tags */}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.image} />
        <meta property="og:url" content={seo.url} />
        <meta property="og:type" content="article" />
      </Head>
      <style global jsx>{`
        .blog-content img, video {
          width: 630px;
          margin: 20px 0;
          border-radius: 0.5rem;
        }
        .blog-content a {
          color: rgb(37 99 235/1);
          font-weight: normal;
          text-decoration: underline;
        }
        .blog-content p {
          margin: top: 10px;
          margin-left: 10px;
          line-height: 1.6;
        }
        .blog-content ol {
          margin-left: 20px;
        }
        .blog-content li {
          margin-left: 20px;
        }
        .blog-content h2 {
          font-size: 27px;
          font-weight: 600;
          margin: 10px 0;
          line-height: 1.3;
        }
        Footer {
          padding: 0;
        }
        @media only screen and (max-width: 500px) {
          .after-title {
            flex-direction: column;
          }
        }
        @media only screen and (max-width: 700px) {
          .blog-content h2 {
            font-size: 25px;
          }
          .blog-content p {
            font-size: 15px;
          }
        }
      `}</style>



      <div className="min-h-screen bg-gray-100 p-2 dark:bg-gray-900">
        {BlogPost && (
          <div className="min-h-screen bg-gray-100 p-2 md:p-4 dark:bg-gray-900">
            <div className="container max-w-full md:max-w-screen-lg bg-white mx-auto my-8 p-4 md:p-10 rounded-lg text-center shadow-lg dark:bg-gray-800">
              <h1 className="font-semibold text-3xl md:text-3xl lg:text-4xl dark:text-white">
                {BlogPost.title}
              </h1>
              <div className="flex mt-2 gap-1 items-center justify-center text-slate-500 after-title">
                <div className="flex items-center justify-center gap-1">
                  <Image width={30} className="rounded-full" src={logo} alt="img" />
                  <h5 className="text-sm ml-1 dark:text-white">CodeWithRafay</h5>
                  <span className="font-bold text-sm mx-1 invisible md:visible dark:text-gray-400">
                    &middot;
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1 dark:text-white">
                  <span className="text-sm dark:text-gray-400">
                    {new Date(BlogPost.CreatedOn).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="font-bold text-sm mx-1 dark:text-gray-400">&middot;</span>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v3.55l-.94 1.44a.75.75 0 001.26.81l1-1.5A.75.75 0 0010.75 10.5v-3.75z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-sm dark:text-gray-400">
                    {BlogPost.MinToRead} min read
                  </span>
                </div>
              </div>

              <div
                className="blog-content dark:text-gray-200"
                dangerouslySetInnerHTML={{ __html: replaceCodeBlocks(BlogPost.BlogContent) }}
              />
            </div>
          </div>
        )}

        <div className="container max-w-full md:max-w-screen-lg mx-auto p-4 mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <form onSubmit={PostComment}>
            <span className='font-medium dark:text-white text-xl my-5'>Add a new comment </span>
            <textarea
              value={CommentText}
              onChange={handleCommentText}
              className=' bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white dark:bg-slate-600 dark:text-gray-200 dark:placeholder-gray-400'
              rows="4"
              placeholder="Write your comment here..."
              required
            />
            <button
              type="submit"
              className='bg-purple-700 dark:bg-purple-500 text-white border-0 py-2 px-3 focus:outline-none hover:bg-purple-800 rounded-lg text-sm mt-4 font-medium 
                disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-gray-200 dark:disabled:text-gray-400'
              disabled={BlogPostComments.some(item => item.username === (session?.user?.email ? session.user.email.split('@')[0] : ''))}
            >
              Add Comment
            </button>
          </form>
        </div>

        <div className="container max-w-full md:max-w-screen-lg mx-auto p-4 mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <h3 className='font-semibold text-2xl dark:text-gray-200'>Comments ({BlogPostComments.length})</h3>
          {

          }
          {BlogPostComments.length ? (BlogPostComments.map((comment) => (
            <div key={comment.$id} className="bg-gray-100 rounded-lg p-4 my-2 text-left dark:bg-gray-700">
              <div className="flex items-center mb-2">
                <Image width={30} className="rounded-full" src={user} alt="User Image" />
                <span className="ml-2 font-semibold dark:text-white">{comment.username}</span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-300">
                  {new Date(comment.Date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <p className="text-gray-800 dark:text-gray-300">{comment.commentText}</p>

              <div className="mt-2">
                {!repliedComments.includes(comment.$id) ? (
                  <button
                    className='bg-purple-700 dark:bg-purple-600 text-white border-0 px-2 focus:outline-none rounded-md text-xs uppercase font-semibold tracking-wide 
             disabled:bg-gray-200 disabled:text-gray-400 py-2 box-border hover:bg-purple-800 dark:hover:bg-purple-600'
                    onClick={() => showReplyFormHandler(comment.$id)}
                  >
                    Reply
                  </button>
                ) : (
                  <p></p>
                )}

                {replyFormVisible === comment.$id && (
                  <div className='flex items-center mt-2'>
                    <input
                      type='text'
                      id='replycomment'
                      name='replycomment'
                      onChange={(e) => setReplyCommentText(e.target.value)}
                      value={replyCommentText}
                      autoFocus
                      placeholder='Type reply'
                      className='dark:bg-gray-700 py-0.5 dark:text-white px-2 border rounded-sm text-md flex-grow mr-2 focus:outline-none border-gray-300 focus:border-purple-600 max-w-52'
                      required
                    />
                    <div className="flex gap-2 ">
                      <button
                        className='bg-purple-600 hover:bg-purple-800 dark:bg-purple-500 text-white px-2 py-2 rounded-md text-xs uppercase font-semibold tracking-wid dark:hover:bg-purple-600 disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-gray-200 dark:disabled:text-gray-400'
                        onClick={() => PostReplyComment(comment.$id)}
                      >
                        Post
                      </button>
                      <button
                        className='px-2 py-2 rounded-md text-xs uppercase font-semibold tracking-wide dark:text-white'
                        onClick={cancelReplyHandler}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {((comment.replies && comment.replies.length > 0) || (fetchedReplyComments && fetchedReplyComments.length > 0)) && (
                <div className="mt-2">
                  <button
                    className='my-2 uppercase tracking-wide text-gray-400 font-bold text-xs cursor-pointer'
                    onClick={() => setShowReplies((prev) => !prev)}
                  >
                    {ShowReplies ? 'Hide Replies' : 'Show Replies'}
                  </button>
                  {ShowReplies && (
                    <div className="mt-2">
                      {(comment.replies || []).concat(fetchedReplyComments.filter(reply => reply.commentId === comment.$id)).map((reply, index) => (
                        <div key={index} className="bg-gray-200 rounded-lg p-2 my-2 dark:bg-gray-600">
                          <div className="flex items-center mb-2">
                            <Image width={25} className="rounded-full" src={user} alt="User Image" />
                            <span className="ml-2 font-semibold dark:text-white">{reply.username}</span>
                            <span className="ml-2 text-sm text-gray-500 dark:text-gray-300">
                              {new Date(reply.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                          <p className="text-gray-800 dark:text-gray-200">{reply.repliesText}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))) : <p className='text-xl font-semibold dark:text-white my-4'>No Comments Found...</p>}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context)
{
  const { slug } = context.query;

  // Fetch data using slug
  const collectionId = '65e6a2957e9c71c0db5c';
  const blogCollectionId = '65ee7a19e402a6b0ff30';
  const replyCommentCollectionId = '65f158d4f40d89610edb';

  let blogs = [];
  let comments = [];
  let replyComments = [];

  try {
    const blogDocuments = await Fetching(collectionId);
    blogs = blogDocuments.documents;

    const commentDocument = await Fetching(blogCollectionId);
    comments = commentDocument.documents;

    const replycommentDocument = await Fetching(replyCommentCollectionId);
    replyComments = replycommentDocument.documents;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }

  return {
    props: {
      blogs,
      comments,
      replyComments,
    },
  };
}