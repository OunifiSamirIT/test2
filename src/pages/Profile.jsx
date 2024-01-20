import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FriendsCard,
  Loading,
  PostCard,  TextInput,

  ProfileCard,
  TopBar,
} from "../components";
import { posts } from "../assets/data";
import {
  BiImages,
  BiLike,
  BiSolidCommentCheck,
  BiSolidVideo,
} from "react-icons/bi";
import { useForm } from "react-hook-form";
import IMG1 from "../../public/asstes/images/home-01/team-01.jpg";
import {
  CustomButton,
  EditProfile,
} from "../components";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import Gallery from "./Galleryuser";


const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // const { posts } = useSelector((state) => state.posts);
  const [userInfo, setUserInfo] = useState(user);
  const [loading, setLoading] = useState(false);
  const [userpf, setUserpf] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [articles, setArticles] = useState([]); // New state for articles
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [articleComments, setArticleComments] = useState({});
  const [commentReply, setCommentReply] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [comment, setComment] = useState("");
  const [editArticle, setEditArticle] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [posting, setPosting] = useState(false);
  const [userInfop, setUserInfop] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const handleDelete = () => {};
  // const handleLikePost = () => {};
  const [friendRequests, setFriendRequests] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await fetch(`http://localhost:8088/api/user/${id}`);
        const userData = await userDataResponse.json();
        setUserpf(userData);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchUserArticles = async () => {
      try {
        const articlesResponse = await fetch(`http://localhost:8088/api/articles/byUser/${id}`);
        const articlesData = await articlesResponse.json();
        setArticles(articlesData);
      } catch (error) {
        console.error("Error fetching articles by userId:", error);
      }
    };

    fetchUserData();
    fetchUserArticles();
  }, [id]);








  
  const storedUserData = JSON.parse(localStorage.getItem("user"));

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileType(type);

    // Create a preview URL for the selected file
    const previewURL = URL.createObjectURL(selectedFile);
    setPreviewImage(previewURL);
  };
  const handleEditClick = (article) => {
    setEditArticle(article);
    // Navigate to the edit page with the article ID
    navigate(`/edit/${article.id}`);
  };
  const handlePostSubmit = async (data) => {
    try {
      if (!data.description ) {
        setErrMsg({ status: "failed", message: "Fill all the information" });
        return;
      }

      setPosting(true);

      const formData = new FormData();
      formData.append("titre", "Your default title");
      formData.append("description", data.description);
      formData.append("userId", storedUserData.id);
      formData.append("type", "Your default type");
      formData.append("file", file);
      formData.append("fileType", fileType);

      // Make a POST request to create a new article
      await fetch("http://localhost:8088/api/articles/", {
        method: "POST",
        body: formData,
      });

      // After creating the article, fetch the updated list of articles
      const response = await fetch("http://localhost:8088/api/articles/");
      const updatedPostsData = await response.json();

      // Update the list of posts and reset the preview image
      setPostsData(updatedPostsData);
      setPreviewImage(null);

      setPosting(false);
    } catch (error) {
      // Handle errors
      console.error("Error submitting post:", error);
      setErrMsg({ status: "failed", message: "Error submitting post" });
      setPosting(false);
    }
  };
  const addComment = async (articleId) => {
    try {
      if (articleId) {
        // Retrieve user information from local storage
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch(
          "http://localhost:8088/api/commentaires/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              description: comment,
              userId: user.id,
              articleId: articleId,
            }),
          }
        );

        const data = await response.json();
        console.log("Comment created:", data);

        // Update the state with the new comment
        setArticleComments((prevComments) => ({
          ...prevComments,
          [articleId]: [...(prevComments[articleId] || []), data],
        }));

        // Clear the comment input
        setComment("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  const addReply = async (commentId, replyText) => {
    try {
      if (commentId && replyText) {
        // Retrieve user information from local storage
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch(
          `http://localhost:8088/api/replies`, // Update the endpoint here
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              description: replyText,
              userId: user.id,
              nom: user.login,
              imageuser: user.image,
              commentaireId: commentId,
            }),
          }
        );

        const data = await response.json();
        console.log("Reply created:", data);

        // Update the state with the new reply
        setArticleComments((prevComments) => {
          const updatedComments = { ...prevComments };
          updatedComments[commentId] = [
            ...(updatedComments[commentId] || []),
            data,
          ];
          return updatedComments;
        });

        // Clear the reply input
        setCommentReply("");
      }
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };
  return (
    <>        <TopBar />

<div className="w-full px-2 lg:px-4 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-full overflow-hidden">
        {/* <TopBar /> */}
        <div class="bg-white rounded-lg shadow-xl ">
            {/* <div x-data="{ openSettings: false }" class="absolute right-12 mt-4 rounded">
                <button  class="border border-gray-400 p-2 rounded text-gray-300 hover:text-gray-300 bg-gray-100 bg-opacity-10 hover:bg-opacity-20" title="Settings">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                    </svg>
                </button>
                <div x-show="openSettings" class="bg-white absolute right-0 w-40 py-2 mt-1 border border-gray-200 shadow-2xl" style={{display: "none"}}>
                    <div class="py-2 border-b">
                        <p class="text-gray-400 text-xs px-6 uppercase mb-1">Settings</p>
                        <button class="w-full flex items-center px-6 py-1.5 space-x-2 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                            </svg>
                            <span class="text-sm text-gray-700">Share Profile</span>
                        </button>
                        <button class="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                            </svg>
                            <span class="text-sm text-gray-700">Block User</span>
                        </button>
                        <button class="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-sm text-gray-700">More Info</span>
                        </button>
                    </div>
                    <div class="py-2">
                        <p class="text-gray-400 text-xs px-6 uppercase mb-1">Feedback</p>
                        <button class="w-full flex items-center py-1.5 px-6 space-x-2 hover:bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                            <span class="text-sm text-gray-700">Report</span>
                        </button>
                    </div>
                </div>
            </div> */}
            <div class="w-full h-[250px]">  
                <img src="/src/assets/08.jpg" class="w-full h-full rounded-tl-lg object-cover rounded-tr-lg"/>
            </div>
            <div class="flex flex-col items-center bg-primary -mt-20">
                <img src="/src/assets/pic.jpg" class="w-40 h-40 border-4 border-white rounded-full"/>
                <div class="flex items-center space-x-2 mt-2">
                    <p class="text-2xl text-white">{userpf?.nom} {" "} {userpf?.prenom}</p>
                    <span class="bg-black rounded-full p-1" title="Verified">
                        <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-100 h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </span>
                </div>
                <p class="text-white">{userpf?.profil}</p>
                <p class="text-sm text-white">{userpf?.nationality}</p>
            </div>
            <div class="flex-1 flex flex-col items-center bg-primary lg:items-end justify-end px-8 ">
                <div class="flex items-center bg-primary space-x-4 mt-2">
                    <button class="flex items-center bg-blue hover:bg-blue-700 text-white px-8 py-2 mb-2  rounded text-sm space-x-2 transition duration-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                        </svg>
                        <span>Connect</span>
                    </button>
                    <button class="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                        </svg>
                        <span>Message</span>
                    </button>
                </div>
            </div>
        </div>
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-1 h-full">
          {/* LEFT */}
          <div className='hidden w-1/3 lg:w-1/4 md:flex flex-col gap-6 overflow-y-auto'>


            <div className='block lg:hidden'>
            </div>
          </div>

          {/* CENTER */}
          <div className="flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
            {/* <form
              onSubmit={handleSubmit(handlePostSubmit)}
              className="bg-primary px-4 rounded-lg"
            >
              <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
                <img
                  src={IMG1 ?? NoProfile}
                  alt="User Image"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <label>{storedUserData.login}</label>
                <TextInput
                  styles="w-full rounded-full py-5 text-bl"
                  placeholder="Show your Skills here , your dream begin from here...."
                  name="description"
                  register={register("description", {
                    required: "Write something about post",
                  })}
                  error={errors.description ? errors.description.message : ""}
                />
              </div>

              <div className="w-full flex items-center border-[#66666645]">
                {previewImage && (
                  <img
                    src={previewImage}
                    className="ml-24 w-80 h-60 object-contain"
                  />
                )}
              </div>

              {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${
                    errMsg?.status === "failed"
                      ? "text-[#f64949fe]"
                      : "text-[#2ba150fe]"
                  } mt-0.5`}
                >
                  {errMsg?.message}
                </span>
              )}
              <div className="flex items-center justify-between py-4">
                <label
                  htmlFor="imgUpload"
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="imgUpload"
                    data-max-size="5120"
                    accept=".jpg, .png, .jpeg"
                  />
                  <BiImages />
                  <span>Image</span>
                </label>

                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                  htmlFor="videoUpload"
                >
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "video")}
                    className="hidden"
                    id="videoUpload"
                    data-max-size="5120"
                    accept=".mp4, .wav"
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label>

                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                  htmlFor="vgifUpload"
                >
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, "gif")}
                    className="hidden"
                    id="vgifUpload"
                    data-max-size="5120"
                    accept=".gif"
                  />
                  <BsFiletypeGif />
                  <span>Gif</span>
                </label>

                <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type="submit"
                      title="Post"
                      containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
                    />
                  )}
                </div>
              </div>
            </form> */}
            <div className="flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
              {articles.map((article) => (
                <div key={article.id} className="mt-10">
                  <div className="bg-primary px-4 rounded-lg">
                    {article.video ? (
                      <video controls className="w-full h-80">
                        <source src={article.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        className="w-96 h-80 ml-8 mt-4 object-contain"
                        src={article.image}
                        alt={article.titre}
                      />
                    )}

                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">
                        {article.titre}
                      </div>
                      <p className="text-gray-700 text-base">
                        {article.description}
                      </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                      {/* Additional content can go here if needed */}
                    </div>
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 rounded-full mr-4"
                        src="/img/jonathan.jpg"
                        alt="Avatar of Jonathan Reinink"
                      />
                      <div className="text-sm">
                        <p className="text-gray-900 leading-none">
                          <p className="text-gray-700 text-base">
                            {"   "} {article.user && article.user.login}
                          </p>
                          <label>
                            --{article.user && article.user.profil}--
                          </label>
                        </p>
                      </div>
                      <p className="text-gray-600 ml-80 float-right">
                        {article.createdAt &&
                          article.createdAt.substring(0, 10)}
                      </p>
                    </div>
                    {article.user && article.user.id === storedUserData.id && (
  <div className="flex items-center justify-end mt-2">
    <label
      className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
      onClick={() => handleEditClick(article)}
    >
      <BiSolidCommentCheck />
      <span>Edit</span>
    </label>
  </div>
)}

                    {selectedArticleId === article.id && (
                      <div className="bg-gray-200 p-4 rounded-lg mt-4">
                        {/* Fetch and render all comments for the selected article */}
                        {(() => {
                          // Check if comments for the selected article are already in the state
                          if (!articleComments[article.id]) {
                            // Fetch comments for the selected article
                            fetch(
                              `http://localhost:8088/api/commentaires/article/${article.id}`
                            )
                              .then((response) => response.json())
                              .then((comments) => {
                                // Update the state with the fetched comments
                                setArticleComments({
                                  ...articleComments,
                                  [article.id]: comments,
                                });
                              })
                              .catch((error) =>
                                console.error("Error fetching comments:", error)
                              );

                            // Return a loading state or placeholder while fetching comments
                            return <p>Loading comments...</p>;
                          }

                          // Render all comments for the selected article after fetching
                          return (
                            <>
                              {articleComments[article.id]?.map(
                                (commentItem) => (
                                  <div
                                    key={commentItem.comm_id}
                                    className="mb-2"
                                  >
                                    {/* Display comment details */}
                                    <div className="bg-white rounded-sm float-left mr-4 border-2">
                                      {commentItem.user_login}
                                      {"  "}
                                    </div>
                                    <div className="bg-white rounded-sm ml-6 ">
                                      {commentItem.comm_desc}
                                    </div>

                                    {/* Display Reply button */}
                                    <label className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer">
                                      <BiSolidCommentCheck />
                                      <span
                                        onClick={async () => {
                                          setCommentReply("");
                                          setSelectedCommentId(
                                            selectedCommentId ===
                                              commentItem.comm_id
                                              ? null
                                              : commentItem.comm_id
                                          );

                                          // Fetch replies for the selected comment
                                          if (
                                            !articleComments[
                                              commentItem.comm_id
                                            ]
                                          ) {
                                            try {
                                              const response = await fetch(
                                                `http://localhost:8088/api/replies/${commentItem.comm_id}`
                                              );
                                              const replies =
                                                await response.json();

                                              // Update the state with the fetched replies
                                              setArticleComments(
                                                (prevComments) => ({
                                                  ...prevComments,
                                                  [commentItem.comm_id]:
                                                    replies,
                                                })
                                              );
                                            } catch (error) {
                                              console.error(
                                                "Error fetching replies:",
                                                error
                                              );
                                            }
                                          }
                                        }}
                                      >
                                        {selectedCommentId ===
                                        commentItem.comm_id
                                          ? "Cancel Reply"
                                          : "Reply"}
                                      </span>
                                    </label>

                                    {/* Display replies for the comment */}
                                    {articleComments[commentItem.comm_id]?.map(
                                      (reply) => (
                                        <div
                                          key={reply.id}
                                          className="ml-8 mb-2"
                                        >
                                          <div className="bg-white rounded-sm float-left mr-4 border-2">
                                            {reply.nom}
                                            {"  "}
                                          </div>
                                          <div className="bg-white rounded-sm ml-6 ">
                                            {reply.description}
                                          </div>
                                        </div>
                                      )
                                    )}

                                    {/* Display reply input */}
                                    {selectedCommentId ===
                                      commentItem.comm_id && (
                                      <div className="bg-gray-200 p-4 rounded-lg mt-4">
                                        <textarea
                                          value={commentReply}
                                          onChange={(e) =>
                                            setCommentReply(e.target.value)
                                          }
                                          placeholder="Type your reply here..."
                                          className="w-full h-16 p-2 border rounded"
                                        />

                                        <button
                                          type="button"
                                          onClick={() => {
                                            addReply(
                                              commentItem.comm_id,
                                              commentReply
                                            );
                                            setCommentReply("");
                                          }}
                                          className="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm mt-2"
                                        >
                                          Add Reply
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )
                              )}

                              {/* Comment input */}
                              <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Type your comment here..."
                                className="w-full h-16 p-2 border rounded"
                              />

                              <button
                                type="button"
                                onClick={() => {
                                  addComment(article.id);
                                  // Reset the comment input after adding a comment
                                  setComment("");
                                }}
                                className="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm mt-2"
                              >
                                Add Comment
                              </button>
                            </>
                          );
                        })()}
                      </div>
                    )}

                    {/* Button to select the article for comments */}
                    <label className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer">
                      <BiSolidCommentCheck />
                      <span
                        onClick={() =>
                          setSelectedArticleId(
                            selectedArticleId === article.id ? null : article.id
                          )
                        }
                      >
                        {selectedArticleId === article.id
                          ? "Close Comments"
                          : "Comment"}
                      </span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            {/* {loading ? (
              <Loading />
            ) : postsData?.length > 0 ? (
              postsData?.map((post) => (
                <PostCard
                  key={post?._id}
                  post={post}
                  user={user}
                  deletePost={() => {}}
                  likePost={() => {}}
                />
              ))
            ) : (
              <div className='flex w-full h-full items-center justify-center'>
                <p className='text-lg text-ascent-2'>No Post Available</p>
              </div>
            )} */}
          </div>

          {/* RIGHT */}
          <div className='hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto'>
            {/* <FriendsCard friends={userInfo?.friends} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
