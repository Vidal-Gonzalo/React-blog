import React, { useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "./PostDetail.css";

function PostDetail({ post, comments, newComments }) {
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();

  const addComment = () => {
    Axios.post(
      "http://localhost:3001/comments",
      {
        commentBody: newComment,
        PostId: id,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        console.log(response);
        const commentToAdd = {
          commentBody: newComment,
          username: response.data.username,
        };
        newComments([...comments, commentToAdd]);
      }
    });
    setNewComment("");
  };

  console.log(comments);

  return (
    <div className="container">
      <div className="wrap">
        <div className="row">
          <div className="col-6">
            <div className="detail-card">
              <h3 className="detail-card-title">{post.title}</h3>
              <p className="detail-card-body">{post.postText}</p>
              <p className="detail-card-footer">{post.username}</p>
            </div>
          </div>
          <div className="col-6">
            <div className="comment-section">
              <div className="add-comment-container">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Escriba su comentario"
                    id="floatingTextarea"
                    value={newComment}
                    onChange={(event) => {
                      setNewComment(event.target.value);
                    }}
                  ></textarea>
                  <label htmlFor="floatingTextarea">
                    Escriba su comentario
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mt-2"
                  onClick={addComment}
                >
                  Enviar comentario
                </button>
              </div>
              <div className="list-of-comments">
                <h3 className="mt-5">Comentarios</h3>
                {comments.commentBody !== "" ? (
                  comments.map((element, index) => {
                    return (
                      <div key={index} className="comments">
                        {element.commentBody}
                        <label>
                          Nombre de usuario: <strong>{element.username}</strong>
                        </label>
                      </div>
                    );
                  })
                ) : (
                  <p>Cargando...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
