import React, { useContext } from "react";
import SearchPostsContext from "../../context/SearchPostsContext";
export default function SearchPostsResults() {
  const { search } = useContext(SearchPostsContext);
  console.log(`search results ${search}'s`);

  return (
    <React.Fragment>
      <div> search results for: {search}</div>
    </React.Fragment>
  );
}
