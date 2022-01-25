import { useMoralisQuery } from "react-moralis";
import { useEffect, useState } from "react";
import Text from "antd/lib/typography/Text";
import { Link } from "react-router-dom";

const Profile = ({ post }) => {
  const { contentId } = post;
  const [postContent, setPosContent] = useState({
    title: "default",
    content: "default",
  });

  const { data } = useMoralisQuery("Contents", (query) =>
    query.equalTo("contentId", contentId)
  );

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

  return (
    <>
      {postContent["title"] !== "" ? (
        <Link to={`/feed/${post["postOwner"]}`}>
          <Text
            type='secondary'
            style={{ fontSize: "14px", fontFamily: "IRANsans" }}
          >
            {decodeURIComponent(postContent["title"])}
          </Text>
        </Link>
      ) : (
        <Link to={`/feed/${post["postOwner"]}`}>
          <Text
            type='secondary'
            copyable
            style={{ fontSize: "12px", fontFamily: "IRANsans" }}
          >
            {decodeURIComponent(post["postOwner"])}{" "}
          </Text>
        </Link>
      )}
    </>
  );
};

export default Profile;
