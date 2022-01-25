import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import Posts from "./components/PostsFeed";
import { Row, Col } from "antd";
import glStyles from "components/gstyles";
import AddPost from "./components/AddPostFeed";

const Feed = (props) => {
  const { walletAddress } = useMoralisDapp();
  let result = null;
  const postOwner = props.postOwner;

  if (postOwner !== walletAddress) {
    result = (
      <div className='col-lg-7'>
        <div
          style={{
            ...glStyles.card,
            padding: "10px 13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        ></div>
        <Posts postOwner={postOwner} />
      </div>
    );
  } else {
    result = (
      <div className='col-lg-7'>
        <div
          style={{
            ...glStyles.card,
            padding: "10px 13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Row>
            <Col span={24}>
              <AddPost />
            </Col>
          </Row>
        </div>
        <Posts postOwner={postOwner} />
      </div>
    );
  }
  return result;
};

export default Feed;
