import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EnlargeThumbnail from "./components/EnlargeThumbnail";
import "./PostPage.css";

export default function PostPage() {
  const [imageHover, setImageHover] = useState(false);
  const [post, setPosts] = useState(null);
  const [imageURL, setImageURL] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((post) => {
        setPosts(post);
        let tempArray = Object.keys(post.images).map((e) => {
          return post.images[e];
        });
        setImageURL(tempArray);
      });
  }, [id]);
  return (
    <React.Fragment>
      {post && (
        <div className="postPageContainer">
          <div>{post.description}</div>
          <div>{post.address}</div>

          <div className="images">
            {imageURL.map((src) => (
              <img
                key={src}
                src={src}
                alt="pic"
                className="image"
                onClick={() => setImageHover(src)}
              />
            ))}
          </div>
        </div>
      )}
      {imageHover && (
        <EnlargeThumbnail
          imageSrc={imageHover}
          setImageHover={setImageHover}
          post={post}
        />
      )}
    </React.Fragment>
  );
}
