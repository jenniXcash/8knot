import React from "react";
import FeedItem from "../../components/FeedItem/FeedItem";
import CircularProgress from "@mui/material/CircularProgress";
import "./Feed.css";
export default function Feed({ posts, loading }) {
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false);

  // function getData(term) {
  //   if (term) {
  //     const res = fetch(`api/posts/?term=${term}`);
  //     setLoading(true);
  //     res
  //       .then(function (response) {
  //         return response.json();
  //       })
  //       .then(function (posts) {
  //         setPosts(posts);
  //         setLoading(false);
  //       });
  //   } else {
  //     const res = fetch(`api/posts`);
  //     setLoading(true);
  //     res
  //       .then(function (response) {
  //         return response.json();
  //       })
  //       .then(function (posts) {
  //         setPosts(posts);
  //         setLoading(false);
  //       });
  //   }
  // }

  // useEffect(() => {
  //   getData();
  // });

  return (
    <React.Fragment>
      <div className="feedItems">
        {loading && <CircularProgress />}
        {posts.map(
          ({
            userName,
            date,
            time,
            address,
            typeOfWork,
            description,
            images,
            _id,
          }) => (
            <FeedItem
              key={_id}
              id={_id}
              userName={userName}
              date={date}
              time={time}
              address={address}
              typeOfWork={typeOfWork}
              description={description}
              images={images}
            />
          )
        )}
      </div>
    </React.Fragment>
  );
}
