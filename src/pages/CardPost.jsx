import React, { useState, useEffect } from 'react';
import { BiSolidCommentCheck } from 'react-icons/bi';

const ArticleComponent = () => {
  const [articles, setArticles] = useState([]);
  const [comment, setComment] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  // Fetch articles from the backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:8088/api/articles/');
        const result = await response.json();

        // Extract articles from the paginated response
        const articlesData = result.rows;

        // Extract userIds from articles 
        const userIds = articlesData.map((article) => article.userId);

        // Fetch user information for each userId
        const usersResponse = await Promise.all(
          userIds.map((userId) =>
            fetch(`http://localhost:8088/api/user/${userId}`).then((response) => response.json())
          )
        );

        const articlesWithUsers = articlesData.map((article, index) => ({
          ...article,
          user: usersResponse[index],
        }));

        setArticles(articlesWithUsers);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  // Create a comment for a specific article
  const addComment = async () => {
    try {
      if (selectedArticleId) {
        // Retrieve user information from local storage
        const user = JSON.parse(localStorage.getItem('user'));
  
        const response = await fetch('http://localhost:8088/api/commentaires/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            description: comment,
            userId: user.id,
            articleId: selectedArticleId,
          }),
        });
  
        const data = await response.json();
        console.log('Comment created:', data);
  
        // You may want to update the state to reflect the new comment
        // For simplicity, let's just log the data for now
  
        // Clear the comment input
        setComment('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-8">
      {articles.map((article) => (
        <div key={article.id} className="bg-white rounded-md shadow-md p-6 mb-4">
          <h1 className="text-2xl font-semibold mb-4">{article.titre}</h1>
          <p className="text-gray-700">{article.description}</p>

          {/* Your existing card content */}
          <img
            className="w-full h-80 mt-4 object-cover"
            src={article.image}
            alt={article.titre}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{article.titre}</div>
            <p className="text-gray-700 text-base">{article.description}</p>
          </div>

          {/* Additional logic for comments */}
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
                <label>--{article.user && article.user.profil}--</label>
              </p>
            </div>
            <p className="text-gray-600 ml-80 float-right">
              {article.createdAt && article.createdAt.substring(0, 10)}
            </p>
          </div>

          {/* Comment section */}
          {selectedArticleId === article.id && (
            <div className="bg-gray-200 p-4 rounded-lg mt-4">
              {/* Render existing comments */}
              {article.comments && article.comments.map((commentItem, index) => (
                <div key={index} className="mb-2">
                  {commentItem.description}
                </div>
              ))}

              {/* Comment input */}
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Type your comment here..."
                className="w-full h-16 p-2 border rounded"
              />

              <button
                type="button"
                onClick={addComment}
                className="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm mt-2"
              >
                Add Comment
              </button>
            </div>
          )}

          {/* Button to select the article for comments */}
          <label className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer">
            <BiSolidCommentCheck />
            <span onClick={() => setSelectedArticleId(article.id)}>Comment</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default ArticleComponent;
