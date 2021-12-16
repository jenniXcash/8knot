import React from "react";
import "./Home.css";
import Feed from "../../components/Feed/Feed";
function Home() {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const res = fetch("/api/posts");
  //   res
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (posts) {
  //       setPosts(posts);
  //     });
  // }, []);
  return (
    <React.Fragment>
      <Feed />
    </React.Fragment>
  );
}
export default Home;
