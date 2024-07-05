import React, { useContext, useState,useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import user from "@/image/user.png";
import { HandleCommentPost, HandleReplyPostComment } from "@/pages/api/post";
import { toast } from "react-toastify";
import AuthContext from "@/components/AuthContext";
import { useRouter } from "next/router";
import { Fetching } from "@/pages/api/fetching";

export default function Videos({
  CourseVideos,
  comments,
  replyComments,
  slug,
}) {
  const router = useRouter();
  const { session } = useContext(AuthContext);

  const [active, setActive] = useState(1);
  const [BlogPostComments, setBlogPostComments] = useState([]);
  const [CommentText, setCommentText] = useState("");
  const [replyCommentText, setReplyCommentText] = useState("");
  const [ShowReplies, setShowReplies] = useState(false);
  const [replyFormVisible, setReplyFormVisible] = useState(null);

  const [repliedComments, setRepliedComments] = useState([]); // Track replied comments

  const [fetchedReplyComments, setFetchedReplyComments] =
    useState(replyComments); // Store fetched reply comments


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
              const updatedReplies = comment.replies ? [...comment.replies] : [];
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
  

  // filtering comments for active video
  const filterComments = comments.filter((object) => object.blogSlug === slug);

  useEffect(() => {
    if (CourseVideos.length > 0) {
      const VIDEO = CourseVideos.filter((item) => item.VideoSlug === slug)[0];

      // iframe
      const iframeData = VIDEO.iframe;
      const iframe = document.querySelector(".iframe");
      iframe.innerHTML = iframeData;

      // videoContent
      const videoContentData = VIDEO.VideoContent;
      const videoContent = document.querySelector(".video-content");
      videoContent.innerHTML = videoContentData;

      // announcement
      if (VIDEO.Announcement) {
        const announcementData = VIDEO.Announcement;
        const announcement = document.querySelector(".announcement");
        announcement.innerHTML = announcementData;
      } else {
        const announcement = document.querySelector(".announcement");
        announcement.innerHTML = "No Announcements as of now!";
      }
      // downloads
      if (VIDEO.Download.length > 0) {
        const downloadData = VIDEO.Download;
        const download = document.querySelector(".downloads");
        download.innerHTML = downloadData;
      } else {
        const download = document.querySelector(".downloads");
        download.innerHTML = "No Downloads to show!";
      }
    }
  }, [CourseVideos, slug]);

  const showReplyFormHandler = (commentId) => {
    if (replyComments.includes(commentId)) {
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

  const handleCommentText = (e) => {
    setCommentText(e.target.value);
  };

  const showSvg = `<svg className=" text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clip-rule="evenodd"/>
</svg>`;

  const hideSvg = `<svg className=" text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm5.757-1a1 1 0 1 0 0 2h8.486a1 1 0 1 0 0-2H7.757Z" clip-rule="evenodd"/>
</svg>`;

  return (
    <>
      <style global jsx>{`
        .video-content img,video{
          width:630px;
          margin:20px 0;
          border-radius:0.5rem;
        }
        .video-content a{
          color:	rgb(37 99 235/1);
          font-weight:normal;
          text-decoration:underline;
        }
        .video-content p{
          margin:top:10px;
          margin-left:10px;
          line-height:1.6;
        }
        .video-content ol{
          margin-left:20px;
        }
        .video-content li{
            margin-left:20px;
        }
        .video-content h2{
          font-size:27px;
          font-weight:600;
          margin:10px 0;
          line-height:1.3;
        }
        .video-content h1{
          font-size:32px;
          font-weight:600;
          margin:10px 0;
          line-height:1.3;
        }
      
        .show{
          display:flex;
        }
        
        .active{
          border-bottom:2px solid #9333ea;
        }
        @media only Screen and (max-width:1100px){

          .main-grid{
            grid-template-columns:1fr !important;
            min-height: 35vh;       
          }

          .hide{
            display:none;
          }
          

          .show-content-div{
            display:flex;
          }

          .video-content{
            width:100% !important;
          }


          .iframe{
            height:34vh !important;
          }

          .content{
            width:100% !important;
          }
        }

        iframe{
          width:100%;
          height:100%
        }

        ::-webkit-scrollbar-track {
          background-color:white;
      }
        .dark ::-webkit-scrollbar-track {
          background-color:#111827;
      }

      `}</style>
      <div className="min-h-screen pb-10">
        <div
          className="w-full grid max-h-[70vh] lg:min-h-[70vh] px-3 main-grid"
          style={{ gridTemplateColumns: "2fr 1fr" }}
        >
          <div className="">
            <div className="iframe w-full p-1 h-full border dark:border-gray-700"></div>
          </div>
          <div className="md:-mb-3 my-2 ">
            <div className="">
              <div
                className="hidden dark:text-white show-content-div font-medium text-xl my-3"
                onClick={() => {
                  const showContent = document.querySelector(".show-content");
                  const svg = document.querySelector(".svg");
                  const listHidden = document.querySelector(".list-hidden");

                  if (showContent.innerHTML == "Show Course Contents") {
                    showContent.innerHTML = "Hide Course Contents";
                    svg.innerHTML = hideSvg;
                    listHidden.classList.add("show");
                    listHidden.classList.remove("hide");
                  } else if (showContent.innerHTML == "Hide Course Contents") {
                    showContent.innerHTML = "Show Course Contents";
                    svg.innerHTML = showSvg;
                    listHidden.classList.add("hide");
                    listHidden.classList.remove("show");
                  }
                }}
              >
                <button className="show-content" role="button">
                  Show Course Contents
                </button>
                <span className="svg mx-2 svg font-extrabold h-7 w-7">
                  <svg
                    className=" text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="flex-col overflow-y-scroll transition-all w-full mt-1 md:my-4 mb-6 md:px-3 list-hidden hide">
              {CourseVideos &&
                CourseVideos.map((item) => {
                  return (
                    <>
                      <div
                        key={Math.random()}
                        className="flex flex-wrap justify-center items-center dark:bg-slate-900 dark:text-white bg-white rounded-lg w-full px-2 mb-4 "
                      >
                        <Link
                          className="w-full"
                          href={`/videos/${item.VideoSlug}`}
                        >
                          <div className=" w-full font-medium text-lg shadow-lg py-3 px-6 rounded-xl dark:bg-slate-800 dark:border-gray-700 border-2 box-border">
                            {item.VideoTitle}
                          </div>
                        </Link>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="md:mx-4 md:mt-4">
          <div className="flex font-medium items-center mb-5">
            {["Overview", "Q&A", "Downloads", "Announcements"].map(
              (tab, index) => (
                <button
                  key={index}
                  className={`dark:text-gray-400 text-gray-900 capitalize md:px-3 px-2 pb-2 md:text-md border-purple-600 ${
                    active === index + 1 ? "active" : ""
                  }`}
                  onClick={() => setActive(index + 1)}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          <div className="content mt-2 mx-2 dark:text-white w-4/6 ">
            <div
              className={`video-content flex flex-col ${
                active === 1 ? "" : "hidden"
              }`}
            ></div>
            <div
              className={`comment mt-2 dark:text-white ${
                active === 2 ? "" : "hidden"
              }`}
            >
              {/* comments section start */}
              <section>
                <div className="container bg-white px-4 mt-5 border dark:border-gray-500  rounded-lg text-center shadow-lg -section md:w-2/5 dark:bg-slate-700  ">
                  <form
                    onSubmit={PostComment}
                    className="w-full bg-white lg:mx-0 mb-1 rounded-lg sm:px-2 sm:mx-2 px-4 pt-2 dark:bg-slate-700"
                  >
                    <div className="flex flex-wrap  mb-6">
                      <span className="font-medium text-lg my-2">
                        Add a new comment
                      </span>
                      <textarea
                        value={CommentText}
                        maxLength={500}
                        onChange={handleCommentText}
                        name="comment"
                        id="comment"
                        className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white dark:bg-slate-600 dark:text-gray-200 dark:placeholder-gray-400"
                        placeholder="Type Your Comment"
                        required
                      ></textarea>
                      <button
                        type="submit"
                        className="bg-purple-700 dark:bg-purple-500 text-white border-0 py-2 px-3 focus:outline-none hover:bg-purple-800 rounded-lg text-sm mt-4 font-medium 
                disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-gray-200 dark:disabled:text-gray-400"
                        disabled={filterComments.some(
                          (item) =>
                            item.username ===
                            (session?.email ? session.email.split("@")[0] : "")
                        )}
                      >
                        Post Comment
                      </button>
                    </div>
                  </form>
                </div>

                
                <div className="p-4 mt-2 rounded-lg shadow-l">
          <h3 className="font-semibold text-2xl dark:text-gray-200">
            Comments ({filterComments.length})
          </h3>

          <hr className="my-4 dark:border-gray-500"/>
          
          {filterComments.length ? (
            filterComments.map((comment) => (
              <div  key={comment.$id} className="flex">
                <div className="object-contain w-10 flex flex-col items-center mt-3 mx-3">
              <Image
                width={30}
                className="rounded-full"
                src={user}
                layout="responsive"
                alt="User Image"
              />
               </div>
              <div
              
                className="bg-gray-100 rounded-lg p-4 my-2 text-left dark:bg-gray-700 md:w-2/4"
              >
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
                        className="dark:bg-gray-700 py-0.5 dark:text-white px-2 border rounded-sm text-md flex-grow mr-2 focus:outline-none border-gray-300 focus:border-purple-600 max-w-52 "
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
              </section>
            </div>
            <div
              className={`mt-2 dark:text-white ${active === 3 ? "" : "hidden"}`}
            >
              <h2 className="text-3xl font-semibold">Downloads</h2>
              <div className="downloads  mt-4">

              </div>
            </div>
            <div
              className={`mt-3 dark:text-white ${active === 4 ? "" : "hidden"}`}
            >
              <h2 className="text-3xl font-semibold">Announcements</h2>
              <div className="announcement mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  let CourseVideos = [];
  let comments = [];
  let replyComments = [];

  try {
    const collectionIdVideos = "66836b64001276075376";
    const videos = await Fetching(collectionIdVideos);
    const mappedVideos = videos.documents.map((document) => document);

    const filteredObjects = mappedVideos.filter((object) =>
      object.AllVideosSlug.some((videoSlug) => videoSlug === slug)
    );
    CourseVideos = filteredObjects[0].videos;

    const collectionIdComments = "65ee7a19e402a6b0ff30";
    const commentDocument = await Fetching(collectionIdComments);
    comments = commentDocument.documents.map((document) => document);

    const collectionIdReplies = "65f158d4f40d89610edb";
    const replycommentDocument = await Fetching(collectionIdReplies);
    replyComments = replycommentDocument.documents.map((document) => document);
  } catch (error) {
    
  }

  return {
    props: {
      CourseVideos,
      comments,
      replyComments,
      slug,
    },
  };
}
