import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CustomButton,
  EditProfile,
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TextInput,
  TopBar,
} from "../components";
import { suggest, requests, posts } from "../assets/data";
import { Link, useNavigate } from "react-router-dom";
import { NoProfile } from "../assets";
import { BsFiletypeGif, BsPersonFillAdd } from "react-icons/bs";
import {
  BiImages,
  BiLike,
  BiSolidCommentCheck,
  BiSolidVideo,
} from "react-icons/bi";
import { useForm } from "react-hook-form";
import IMG1 from "../../public/asstes/images/home-01/team-01.jpg";

const Home = () => {
  const { user, edit } = useSelector((state) => state.user);
  const [friendRequest, setFriendRequest] = useState(requests);
  // const [suggestedFriends, setSuggestedFriends] = useState(suggest);
  const [suggestedFriends, setSuggestedFriends] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [posting, setPosting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postsData, setPostsData] = useState(posts);
  const navigate = useNavigate();

  //
  const [articles, setArticles] = useState([]); // New state for articles
  const [editArticle, setEditArticle] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [fileType, setFileType] = useState(""); // Add this state

  const handleFileChange = (e, type) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileType(type);

    // Create a preview URL for the selected file
    const previewURL = URL.createObjectURL(selectedFile);
    setPreviewImage(previewURL);
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

  const storedUserData = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:8088/api/articles/");
        const result = await response.json();

        // Extract userIds from articles
        const userIds = result.rows.map((article) => article.userId);

        // Fetch user information for each userId
        const usersResponse = await Promise.all(
          userIds.map((userId) =>
            fetch(`http://localhost:8088/api/user/${userId}`).then((response) =>
              response.json()
            )
          )
        );
        console.log(usersResponse);

        const articlesWithUsers = result.rows.map((article, index) => ({
          ...article,
          user: usersResponse[index],
        }));

        setArticles(articlesWithUsers);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const [comment, setComment] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  ////////////////////////////////
  const [articleComments, setArticleComments] = useState({});

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

  //////////////
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [commentReply, setCommentReply] = useState("");

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

  //////////////for profil card /////////
  const [userpf, setUserpf] = useState(null);
  const [friendRequests, setFriendRequests] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Get user ID from local storage
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    console.log("User Profile Data:", userpf);
    console.log("suggestedFriends:", suggestedFriends);

    // Fetch user info using user ID
    if (userId) {
      fetch(`http://localhost:8088/api/user/${userId}`)
        .then((response) => {
          console.log("Response from the server:", response);
          return response.json();
        })
        .then((data) => {
          console.log("Data received:", data);
          setUserpf(data);
        })
        .catch((error) => console.error("Error fetching user info:", error));
    }
    const fetchSuggestedFriends = async () => {
      try {
        const userId = storedUserData.id; 
        const response = await fetch(
          `http://localhost:8088/api/user/${userId}/suggest/random`
        );
        const data = await response.json();
        setSuggestedFriends(data);
      } catch (error) {
        console.error("Error fetching suggested friends:", error);
      }
    };

    fetchSuggestedFriends();

    const fetchFriendRequests = async () => {
      try {
        const response = await fetch(
          `http://localhost:8088/api/user/${userId}/friend-requests`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setFriendRequests(data);
      } catch (err) {
        console.error("Error fetching friend requests:", err);
        setError("Error fetching friend requests.");
      }
    };

    fetchFriendRequests();
  }, []);

  if (!userpf) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Assuming the structure of your friendRequests object, you might need to adjust this part accordingly
  const pendingFriendRequests = friendRequests?.receiver || [];
  const handleEditClick = (article) => {
    setEditArticle(article);
    // Navigate to the edit page with the article ID
    navigate(`/edit/${article.id}`);
  };
  return (
    <>
      <div className="w-full px-2 lg:px-4 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-full overflow-hidden">
        {/* <TopBar /> */}

        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-1 h-full">
          {/* LEFT */}
          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
            <ProfileCard userpf={userpf} />
            {/* <FriendsCard friends={user?.friends} /> */}
          </div>

          {/* CENTER */}
          <div className="flex-1 h-full px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
            <form
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
            </form>
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
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            {/* FRIEND REQUEST */}
            <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
              <div className="flex items-center justify-between text-xl text-ascent-1 pb-2 border-b border-[#66666645]">
                <span> Friend Request</span>
                <span>{pendingFriendRequests?.length}</span>
              </div>

              <div className="w-full  flex flex-col gap-4 pt-4">
                {pendingFriendRequests.length > 0 ? (
                  <div className="">
                    {pendingFriendRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex items-center justify-between bg-primary rounded-lg p-4 mb-4"
                      >
                        <Link
                          to={`/profile/${request.id}`}
                          className="flex gap-4 items-center cursor-pointer"
                        >
                          <img
                            src={request?.image ?? NoProfile}
                            alt={request?.nom}
                            className="w-10 h-10 object-cover rounded-full"
                          />
                          <div className="flex-1">
                            <p className="text-base font-medium text-ascent-1">
                              {request?.nom} {request?.prenom}
                            </p>
                            <span className="text-sm text-ascent-2">
                              {/* {request?.profil ?? "No Profession"} */}
                            </span>
                          </div>
                        </Link>

                        <div className="flex gap-1">
                          <CustomButton
                            title="Accept"
                            containerStyles="bg-[#0444a4] text-xs text-white px-2 py-1 rounded-full"
                          />
                          <CustomButton
                            title="Deny"
                            containerStyles="border border-[#666] text-xs text-ascent-1 px-2 py-1 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No pending friend requests found.</p>
                )}
              </div>
            </div>

            {/* SUGGESTED FRIENDS */}
            <div className="w-full bg-primary shadow-sm rounded-lg px-5 py-5">
              <div className="flex items-center justify-between text-lg text-ascent-1 border-b border-[#66666645]">
                <span>Friend Suggestion</span>
              </div>
              <div className="w-full flex flex-col gap-4 pt-4">
                {suggestedFriends?.map((friend) => (
                  <div
                    className="flex items-center justify-between"
                    key={friend.id}
                  >
                    <Link
                      to={`/profile/${friend?.id}`} 
                      className="w-full flex gap-4 items-center cursor-pointer"
                    >
                      <img
                        src={friend?.image || NoProfile}
                        alt={`${friend?.firstName} ${friend?.lastName}`}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-base font-medium text-ascent-1">
                          {friend.nom} {friend.prenom}
                        </p>
                        <span className="text-sm text-ascent-2">
                          {friend?.profil || "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <div className="flex gap-1">
                      <button
                        className="bg-[#0444a430] text-sm text-white p-1 rounded"
                        onClick={() => {
                          // Add your logic to handle friend request
                        }}
                      >
                        <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {edit && <EditProfile />}
    </>
  );
};

export default Home;
