import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EnlargeThumbnail from "../../components/EnlargeThumbnail/EnlargeThumbnail";
import FeedItemTooltip from "../../components/FeedItemTooltip/FeedItemTooltip";
import ShowOnMap from "../../components/ShowOnMap/ShowOnMap";
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
        setImageURL(
          Object.keys(post.images).map((e) => {
            return post.images[e].url;
          })
        );
      });
  }, [id]);
  return (
    <React.Fragment>
      {post && (
        <div className="postPageContainer">
          <div className="postGrid">
            <div>
              <div className="bolder">{post.userName}</div>
              <div>
                {post.date}
                {post.time}
              </div>
            </div>
            <div></div>
            <div className="bolder">Type Of Work: </div>
            <div>{post.typeOfWork}</div>
            <div className="bolder">Description:</div>
            <div>{post.description}</div>
            <div className="bolder">Address: </div>
            <div>{post.address[0].formatted_address}</div>
            <div></div> <ShowOnMap address={post.address[0]} />
            <div></div>
            <div className="postPageAttachedImages">
              {imageURL.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt="pic"
                  className="postPageattachedSingleImg"
                  onClick={() => {
                    setImageHover(src);
                  }}
                />
              ))}
            </div>
          </div>
          <FeedItemTooltip userName={post.userName} />
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
