import { useMoralisQuery } from "react-moralis";
import { useEffect, useState } from "react";
import Reputation from "components/ReputationPost";

const Profile2 = ({ post }) => {
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
      const image = await fetchIPFSDoc(extractUri(data));
      setPosContent(image);
    }
    if (data.length > 0) {
      processContent();
    }
  }, [data]);

  return (
    <Reputation postOwner={post["postOwner"]} image={postContent["image"]} />
  );
};

export default Profile2;
