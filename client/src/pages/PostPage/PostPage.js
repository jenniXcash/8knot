import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./PostPage.css";
import EnlargeThumbnail from "./components/EnlargeThumbnail";

export default function PostPage() {
  const [imageHover, setImageHover] = useState(false);
  const [post, setPosts] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((post) => setPosts(post));
  }, [id]);
  return (
    <React.Fragment>
      {post && (
        <div className="postPageContainer">
          <div>{post.description}</div>
          <div>{post.address}</div>
          <div className="images">
            <img
              src={post.images.image1}
              alt="pic"
              onClick={() => setImageHover(post.images.image1)}
              className="image"
            />
            <img
              src={post.images.image2}
              alt="pic"
              onClick={() => setImageHover(post.images.image2)}
              className="image"
            />
            <img
              src={post.images.image3}
              alt="pic"
              onClick={() => setImageHover(post.images.image3)}
              className="image"
            />
          </div>
        </div>
      )}
      {imageHover && (
        <EnlargeThumbnail imageSrc={imageHover} setImageHover={setImageHover} />
      )}
    </React.Fragment>
  );
}
