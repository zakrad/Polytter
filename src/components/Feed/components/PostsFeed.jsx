import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisQuery } from "react-moralis";
import Post from "./Post";

const Posts = (props) => {
  const { walletAddress } = useMoralisDapp();
  const queryPost = useMoralisQuery(
    "Posts",
    (query) =>
      query
        .equalTo(
          "categoryId",
          "0x9300000000000000000000000000000000000000000000000000000000000000"
        )
        .equalTo(
          "parentId",
          "0x9300000000000000000000000000000000000000000000000000000000000000"
        )
        .equalTo("postOwner", props.postOwner),
    { live: true }
  );

  const fetchedPosts = JSON.parse(
    JSON.stringify(queryPost.data, ["postId", "contentId", "postOwner"])
  ).reverse();
  const havePosts = fetchedPosts.length > 0 ? true : false;

  const emptyResult = (
    <div style={{ fontFamily: "IRANsans" }}>
      {props.postOwner === walletAddress ? (
        <h3 style={{ fontFamily: "IRANsans" }}>
          This is your wall, Post on it
        </h3>
      ) : (
        <h3 style={{ fontFamily: "IRANsans" }}>This user has no post yet</h3>
      )}
    </div>
  );

  const postResult = (
    <div>
      {fetchedPosts.map((post) => (
        <Post key={post["postId"]} post={post} />
      ))}
    </div>
  );

  return havePosts ? postResult : emptyResult;
};

export default Posts;
