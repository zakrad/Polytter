import { useMoralisQuery } from "react-moralis";
import { useEffect, useState } from "react";
import Text from "antd/lib/typography/Text";
import Blockie from "components/Blockie";
import { Skeleton, Card, Avatar } from "antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import AddPost from "./AddProfile";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { Link } from "react-router-dom";

const Profile = ({ post }) => {
  const { walletAddress } = useMoralisDapp();
  const [showAddPost, setShowAddPost] = useState(false);
  const { Meta } = Card;
  const { contentId, postOwner } = post;
  const [postContent, setPosContent] = useState({
    title: "default",
    content: "default",
  });

  const { data } = useMoralisQuery("Contents", (query) =>
    query.equalTo("contentId", contentId)
  );
  function toogleShowAddPost() {
    setShowAddPost(!showAddPost);
  }

  useEffect(() => {
    function extractUri(data) {
      const fetchedContent = JSON.parse(JSON.stringify(data, ["contentUri"]));
      const contentUri = fetchedContent[0]["contentUri"];
      return contentUri;
    }
    async function fetchIPFSDoc(ipfsHash) {
      console.log(ipfsHash);
      const url = ipfsHash;
      const response = await fetch(url);
      return await response.json();
    }
    async function processContent() {
      const content = await fetchIPFSDoc(extractUri(data));
      setPosContent(content);
    }
    if (data.length > 0) {
      processContent();
    }
  }, [data]);

  const loading = "";

  const result = (
    <Card
      className='col-lg-3'
      style={{
        width: 285,
        marginBottom: 16,
        fontFamily: "IRANsans",
        borderRadius: "0.5rem",
      }}
      actions={
        postOwner === walletAddress
          ? [
              <SettingOutlined key='setting' onClick={toogleShowAddPost} />,
              <Link to={`/feed/${walletAddress}`}>
                <EditOutlined key='setting' />
              </Link>,
            ]
          : ""
      }
    >
      <Skeleton loading={loading} avatar active>
        <Meta
          avatar={
            <>
              {postContent["image"] !== undefined ? (
                <Avatar
                  size={50}
                  src={postContent["image"]}
                  alt='img'
                  style={{
                    display: "block",
                  }}
                />
              ) : (
                <Avatar
                  src={<Blockie address={post["postOwner"]} scale='4' />}
                />
              )}
            </>
          }
          title={
            <>
              {postContent["title"] !== "" ? (
                <Text
                  strong
                  style={{
                    fontSize: "20px",
                    color: "#333",
                    fontFamily: "IRANsans",
                  }}
                >
                  {decodeURIComponent(postContent["title"])}
                </Text>
              ) : (
                <Text strong>{post["postOwner"]} </Text>
              )}
            </>
          }
          description={
            <>
              {postContent["content"] !== "" ? (
                <p
                  style={{
                    fontSize: "15px",
                    color: "#111",
                    fontFamily: "IRANsans",
                  }}
                >
                  {decodeURIComponent(postContent["content"])}
                </p>
              ) : (
                <Text strong>... </Text>
              )}
            </>
          }
        />
      </Skeleton>
      <Skeleton loading={loading} avatar active>
        {showAddPost ? <AddPost /> : ""}
      </Skeleton>
    </Card>
  );

  return postContent["title"] === "default" ? loading : result;
};

export default Profile;
