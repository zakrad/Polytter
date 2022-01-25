import { Skeleton, Card, Avatar } from "antd";
import { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import AddPost from "./AddProfile";
import { useMoralisQuery } from "react-moralis";
import Profile from "./Profile";
import Blockie from "components/Blockie";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";

const Posts = (props) => {
  const { walletAddress } = useMoralisDapp();
  const [showAddPost, setShowAddPost] = useState(false);
  const { Meta } = Card;
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

  function toogleShowAddPost() {
    setShowAddPost(!showAddPost);
  }

  const loading = "";

  const fetchedPosts = JSON.parse(
    JSON.stringify(queryPost.data, ["postId", "contentId", "postOwner"])
  ).reverse();

  const havePosts = fetchedPosts.length > 0 ? true : false;

  const emptyResult = (
    <Card
      className='col-lg-3'
      style={{ width: 285, marginBottom: 16 }}
      actions={
        props.postOwner === walletAddress
          ? [<SettingOutlined key='setting' onClick={toogleShowAddPost} />]
          : ""
      }
    >
      <Skeleton loading={loading} avatar active>
        <Meta
          avatar={
            <Avatar src={<Blockie address={props.postOwner} scale='4' />} />
          }
          title={
            <Text
              style={{
                fontFamily: "IRANsans",
              }}
              strong
            >
              {props.postOwner}{" "}
            </Text>
          }
          description={
            <Text
              style={{
                fontFamily: "IRANsans",
              }}
              strong
            >
              ...{" "}
            </Text>
          }
        />
      </Skeleton>
      <Skeleton loading={loading} avatar active>
        {showAddPost ? <AddPost /> : ""}
      </Skeleton>
    </Card>
  );

  const postResult = (
    <div className='col-lg-3' mode='inline'>
      {fetchedPosts.map((post) => (
        <Profile key={post["postId"]} post={post} />
      ))}
    </div>
  );

  return havePosts ? postResult : emptyResult;
};

export default Posts;
