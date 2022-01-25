import { useMoralisQuery } from "react-moralis";
import Profile from "./ProfilePostName";
import Text from "antd/lib/typography/Text";
import { Link } from "react-router-dom";

const ShowProfilePostName = (props) => {
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
      <Text type='secondary' style={{ fontSize: "12px" ,fontFamily:"IRANsans" }} copyable>
        {props.postOwner}{" "}
      </Text>
    </Link>
  );

  const postResult = fetchedPosts.map((post) => (
    <Profile key={post["postId"]} post={post} />
  ));

  return havePosts ? postResult : emptyResult;
};
export default ShowProfilePostName;
