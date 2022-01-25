import { useMoralisQuery } from "react-moralis";
import Profile2 from "./ProfilePostPic";
import { Avatar } from "antd";
import Blockie from "components/Blockie";
import { Link } from "react-router-dom";

const ShowProfilePostPic = (props) => {
  const queryPost = useMoralisQuery(
    "Posts",
    (query) =>
      query
        .equalTo("postOwner", props.postOwner)
        .equalTo(
          "categoryId",
          "0x9200000000000000000000000000000000000000000000000000000000000000"
        )
        .equalTo(
          "parentId",
          "0x9200000000000000000000000000000000000000000000000000000000000000"
        )
        .descending("block_timestamp")
        .limit(1),
    [],
    { live: true }
  );

  const fetchedPosts = JSON.parse(
    JSON.stringify(queryPost.data, ["postId", "contentId", "postOwner"])
  ).reverse();

  const havePosts = fetchedPosts.length > 0 ? true : false;

  const emptyResult = (
    <Link to={`/feed/${props.postOwner}`}>
      <Avatar src={<Blockie address={props.postOwner} scale='4' />} />
    </Link>
  );

  const postResult = fetchedPosts.map((post) => (
    <Profile2 key={post["postId"]} post={post} />
  ));

  return havePosts ? postResult : emptyResult;
};
export default ShowProfilePostPic;
