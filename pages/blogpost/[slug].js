import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Fetching } from "@/pages/api/fetching";
import { toast } from "react-toastify";
import { HandleCommentPost, HandleReplyPostComment } from "@/pages/api/post";
import logo from "@/image/logo.png";
import user from "@/image/user.png";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-jsx";
import "prismjs/themes/prism-okaidia.css";
import Head from "next/head";
import AuthContext from "@/components/AuthContext";
import DOMPurify from "dompurify";

export default function BlogPostPage({ blogs, comments, replyComments }) {
  const router = useRouter();
  const { session, setSession } = useContext(AuthContext);
  const { slug } = router.query;

  const [BlogPost, setBlogPost] = useState(null);
  const [BlogPostComments, setBlogPostComments] = useState([]);
  const [CommentText, setCommentText] = useState("");
  const [replyCommentText, setReplyCommentText] = useState("");
  const [ShowReplies, setShowReplies] = useState(false);
  const [replyFormVisible, setReplyFormVisible] = useState(null);

  const [repliedComments, setRepliedComments] = useState([]); // Track replied comments

  const [fetchedReplyComments, setFetchedReplyComments] =
    useState(replyComments); // Store fetched reply comments

  useEffect(() => {
    const filteringBlogs = blogs.filter((blog) => blog.slug === slug);
    if (filteringBlogs.length > 0) {
      setBlogPost(filteringBlogs[0]);
    } else {
      setBlogPost(null);
    }
    const filteringComments = comments.filter(
      (comment) => comment.blogSlug === slug
    );
    setBlogPostComments(filteringComments);
  }, [blogs, slug, comments]);

  useEffect(() => {
    setFetchedReplyComments(replyComments);
  }, [replyComments]);

  const replaceCodeBlocks = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const codeBlocks = doc.querySelectorAll('pre[class*="language-"]');

    codeBlocks.forEach((block, index) => {
      const code = block.textContent.trim();
      const languageClass = Array.from(block.classList).find((cls) =>
        cls.startsWith("language-")
      );
      const language = languageClass
        ? languageClass.replace("language-", "")
        : "jsx";
      const highlightedCode = Prism.highlight(
        code,
        Prism.languages[language],
        language
      );

      const wrapper = document.createElement("div");
      wrapper.classList.add("code-wrapper");

      const newPre = document.createElement("pre");
      newPre.className = block.className;

      const newCode = document.createElement("code");
      newCode.className = languageClass;
      newCode.innerHTML = highlightedCode;

      newPre.appendChild(newCode);
      wrapper.appendChild(newPre);
      block.parentNode.replaceChild(wrapper, block);
      Prism.highlightElement(newCode);
    });

    return doc.body.innerHTML;
  };

  const handleCommentText = (e) => {
    setCommentText(e.target.value);
  };

  const PostComment = async (event) => {
    event.preventDefault();
    if (session) {
      const Username = session.email.split("@")[0];
      try {
        await HandleCommentPost(CommentText, slug, Username);
        toast("Comment Added", { type: "success", autoClose: 3000 });

        setBlogPostComments([
          ...BlogPostComments,
          {
            commentText: CommentText,
            username: Username,
            Date: new Date().toISOString().slice(0, 10),
          },
        ]);

        setCommentText("");
      } catch (error) {
        toast("Failed to add comment", { type: "error", autoClose: 2000 });
      }
    } else {
      toast("You need to login first", { type: "error", autoClose: 3000 });
    }
  };

  const PostReplyComment = async (id) => {
    if (session) {
      const Username = session.email.split("@")[0];

      if (repliedComments.includes(id)) {
        toast("You have already replied to this comment", {
          type: "info",
          autoClose: 3000,
        });
        return;
      }

      try {
        // Call your API function to post the reply
        await HandleReplyPostComment(replyCommentText, id, Username);

        // Update repliedComments state to include the replied comment ID
        setRepliedComments([...repliedComments, id]);

        // Update BlogPostComments state to immediately show the reply
        setBlogPostComments((prevComments) => {
          return prevComments.map((comment) => {
            if (comment.$id === id) {
              const updatedReplies = comment.replies
                ? [...comment.replies]
                : [];
              return {
                ...comment,
                replies: [
                  ...updatedReplies,
                  {
                    replyText: replyCommentText,
                    username: Username,
                    date: new Date().toISOString().slice(0, 10),
                  },
                ],
              };
            }
            return comment;
          });
        });

        setReplyCommentText(""); // Clear the reply text input
        setReplyFormVisible(null); // Hide the reply form

        toast("Reply Added", { type: "success", autoClose: 3000 });
      } catch (error) {
        toast("Failed to add reply", { type: "error", autoClose: 2000 });
      }
    } else {
      toast("You need to login first", { type: "error", autoClose: 3000 });
    }
  };

  const showReplyFormHandler = (commentId) => {
    if (repliedComments.includes(commentId)) {
      toast("You have already replied to this comment", {
        type: "info",
        autoClose: 3000,
      });
      return;
    }

    setReplyFormVisible(commentId);
  };

  const cancelReplyHandler = () => {
    setReplyFormVisible(null);
  };

  const seo = {
    title: BlogPost
      ? BlogPost.title + " | CodeWithRafay"
      : "Web Development Agency | CodeWithRafay",
    description: BlogPost ? BlogPost.Description : "",
    image: "/graph.png",
    url: `https://codewithrafay.com/blog/${slug}`,
  };

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />

        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.image} />
        <meta property="og:url" content={seo.url} />
        <meta property="og:type" content="article" />
      </Head>
      <style global jsx>{`
        .blog-content img, video {
          margin-top: 20px;
          margin-bottom:20px;
          margin-left:20px;
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
          font-size: 30px;
          font-weight: 600;
          margin: 10px 0;
          line-height: 1.3;
        }
        .blog-content h3{
          font-size: 25px;
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
        .blog-content h3{
          font-size: 20px;
         
        }
        .blog-content img, video {
           margin-left:0px;
         
        }
        .blog-content p {
            font-size: 16px;
          }

        }


        `}</style>

      <article className="min-h-screen bg-gray-100 p-2 dark:bg-gray-900">
        {BlogPost && (
          <div className="min-h-screen bg-gray-100 p-2 md:p-4 dark:bg-gray-900">
            <div className="container max-w-full md:max-w-screen-lg bg-white mx-auto my-8 p-4 md:p-10 rounded-lg text-center shadow-lg dark:bg-gray-800">
              <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl dark:text-white">
                {BlogPost.title}
              </h1>
              <div className="flex mt-2 gap-2 md:text-sm items-center justify-center text-slate-500 after-title">
                <div className="flex items-center justify-center gap-1">
                  <Image
                    width={30}
                    className="rounded-full"
                    src={logo}
                    alt="img"
                  />
                  <h5 className=" ml-1 text-black dark:text-white">
                    Abdul Rafay
                  </h5>
                  <span className="font-bold text-sm mx-1 invisible md:visible dark:text-gray-400">
                    &middot;
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2 dark:text-white">
                  <span className=" dark:text-gray-400">
                    {new Date(BlogPost.CreatedOn).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="font-bold mx-1 dark:text-gray-400 invisible md:visible">
                    &middot;
                  </span>
                  <svg
                    className=" h-5 w-5 fill-current opacity-75"
                    viewBox="0 0 576 512"
                  >
                    <path d="M540.9 56.77c-45.95-16.66-90.23-24.09-129.1-24.75-60.7.94-102.7 17.45-123.8 27.72-21.1-10.27-64.1-26.8-123.2-27.74-40-.05-84.4 8.35-129.7 24.77C14.18 64.33 0 84.41 0 106.7v302.9c0 14.66 6.875 28.06 18.89 36.8 11.81 8.531 26.64 10.98 40.73 6.781 118.9-36.34 209.3 19.05 214.3 22.19C277.8 477.6 281.2 480 287.1 480c6.52 0 10.12-2.373 14.07-4.578 10.78-6.688 98.3-57.66 214.3-22.27 14.11 4.25 28.86 1.75 40.75-6.812C569.1 437.6 576 424.2 576 409.6V106.7c0-22.28-14.2-42.35-35.1-49.93zM272 438.1c-24.95-12.03-71.01-29.37-130.5-29.37-27.83 0-58.5 3.812-91.19 13.77-4.406 1.344-9 .594-12.69-2.047C34.02 417.8 32 413.1 32 409.6V106.7c0-8.859 5.562-16.83 13.86-19.83C87.66 71.7 127.9 63.95 164.5 64c51.8.81 89.7 15.26 107.5 23.66V438.1zm272-28.5c0 4.375-2.016 8.234-5.594 10.84-3.766 2.703-8.297 3.422-12.69 2.125C424.1 391.6 341.3 420.4 304 438.3V87.66c17.8-8.4 55.7-22.85 107.4-23.66 35.31-.063 76.34 7.484 118.8 22.88 8.2 3 13.8 10.96 13.8 19.82v302.9z"></path>
                  </svg>
                  <span className=" dark:text-gray-400">
                    {BlogPost.MinToRead} min read
                  </span>
                </div>
              </div>
              {BlogPost.BlogImage ? (
                <div className="flex justify-center my-3">
                  <Image
                    width={550}
                    height={100}
                    src={BlogPost.BlogImage}
                    alt="image cwr blog"
                    priority={true}
                  />
                </div>
              ) : (
                ""
              )}
              <div
                className="blog-content text-left mt-3 dark:text-gray-200"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    replaceCodeBlocks(BlogPost.BlogContent)
                  ),
                }}
              />
            </div>
          </div>
        )}

        <div className="container max-w-full md:max-w-screen-lg mx-auto p-4 mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <form onSubmit={PostComment}>
            <span className="font-medium dark:text-white text-xl my-5">
              Add a new comment{" "}
            </span>
            <textarea
              value={CommentText}
              onChange={handleCommentText}
              className=" bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white dark:bg-slate-600 dark:text-gray-200 dark:placeholder-gray-400"
              rows="4"
              placeholder="Type Your Comment"
              required
            />
            <button
              type="submit"
              className="bg-purple-700 dark:bg-purple-500 text-white border-0 py-2 px-3 focus:outline-none hover:bg-purple-800 rounded-lg text-sm mt-4 font-medium 
                disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-gray-200 dark:disabled:text-gray-400"
              disabled={BlogPostComments.some(
                (item) =>
                  item.username ===
                  (session?.email ? session.email.split("@")[0] : "")
              )}
            >
              Add Comment
            </button>
          </form>
        </div>

        <div className="container max-w-full md:max-w-screen-lg mx-auto p-4 mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <h3 className="font-semibold text-2xl dark:text-gray-200">
            Comments ({BlogPostComments.length})
          </h3>

          <hr className="my-4 dark:border-gray-500" />

          {BlogPostComments.length ? (
            BlogPostComments.map((comment) => (
              <div key={comment.$id} className="flex">
                <div className="object-contain w-10 flex flex-col items-center mt-3 mx-3">
                  <Image
                    width={30}
                    className="rounded-full"
                    src={user}
                    layout="responsive"
                    alt="User Image"
                  />
                </div>
                <div className="bg-gray-100 rounded-lg p-4 my-2 text-left dark:bg-gray-700 md:w-2/4">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold dark:text-white">
                      {comment.username}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-300">
                      {new Date(comment.Date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-300">
                    {comment.commentText}
                  </p>

                  <div className="mt-2">
                    {!repliedComments.includes(comment.$id) ? (
                      <button
                        className="bg-purple-700 dark:bg-purple-600 text-white border-0 px-2 focus:outline-none rounded-md text-xs uppercase font-semibold tracking-wide 
             disabled:bg-gray-200 disabled:text-gray-400 py-2 box-border hover:bg-purple-800 dark:hover:bg-purple-600"
                        onClick={() => showReplyFormHandler(comment.$id)}
                      >
                        Reply
                      </button>
                    ) : (
                      <p></p>
                    )}

                    {replyFormVisible === comment.$id && (
                      <div className="flex items-center mt-2">
                        <input
                          type="text"
                          id="replycomment"
                          name="replycomment"
                          onChange={(e) => setReplyCommentText(e.target.value)}
                          value={replyCommentText}
                          autoFocus
                          placeholder="Type reply"
                          className="dark:bg-gray-700 py-0.5 dark:text-white px-2 border rounded-sm text-md flex-grow mr-2 focus:outline-none border-gray-300 focus:border-purple-600 max-w-52"
                          required
                        />
                        <div className="flex gap-2 ">
                          <button
                            className="bg-purple-600 hover:bg-purple-800 dark:bg-purple-500 text-white px-2 py-2 rounded-md text-xs uppercase font-semibold tracking-wid dark:hover:bg-purple-600 disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-gray-200 dark:disabled:text-gray-400"
                            onClick={() => PostReplyComment(comment.$id)}
                          >
                            Post
                          </button>
                          <button
                            className="px-2 py-2 rounded-md text-xs uppercase font-semibold tracking-wide dark:text-white"
                            onClick={cancelReplyHandler}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {((comment.replies && comment.replies.length > 0) ||
                    (fetchedReplyComments &&
                      fetchedReplyComments.length > 0)) && (
                    <div className="mt-2">
                      <button
                        className="my-2 uppercase tracking-wide text-gray-400 font-bold text-xs cursor-pointer"
                        onClick={() => setShowReplies((prev) => !prev)}
                      >
                        {ShowReplies ? "Hide Replies" : "Show Replies"}
                      </button>
                      {ShowReplies && (
                        <div className="mt-2">
                          {(comment.replies || [])
                            .concat(
                              fetchedReplyComments.filter(
                                (reply) => reply.commentId === comment.$id
                              )
                            )
                            .map((reply, index) => (
                              <div
                                key={index}
                                className="bg-gray-200 rounded-lg p-2 my-2 dark:bg-gray-600"
                              >
                                <div className="flex items-center mb-2">
                                  <Image
                                    width={25}
                                    className="rounded-full"
                                    src={user}
                                    alt="User Image"
                                  />
                                  <span className="ml-2 font-semibold dark:text-white">
                                    {reply.username}
                                  </span>
                                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-300">
                                    {new Date(reply.date).toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                      }
                                    )}
                                  </span>
                                </div>
                                <p className="text-gray-800 dark:text-gray-200">
                                  {reply.repliesText}
                                </p>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-xl font-semibold dark:text-white my-4">
              No Comments Found...
            </p>
          )}
        </div>
      </article>
    </>
  );
}

export async function getServerSideProps(context) {
  // Fetch data using slug
  const collectionId = "65e6a2957e9c71c0db5c";
  const commentCollectionId = "65ee7a19e402a6b0ff30";
  const replyCommentCollectionId = "65f158d4f40d89610edb";

  let blogs = [];
  let comments = [];
  let replyComments = [];

  try {
    const blogDocuments = await Fetching(collectionId);
    blogs = blogDocuments.documents;

    const commentDocument = await Fetching(commentCollectionId);
    comments = commentDocument.documents;

    const replycommentDocument = await Fetching(replyCommentCollectionId);
    replyComments = replycommentDocument.documents;
  } catch (error) {}

  return {
    props: {
      blogs,
      comments,
      replyComments,
    },
  };
}
