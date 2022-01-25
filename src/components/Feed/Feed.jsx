import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import Posts from "./components/Posts";
import Reputation from "components/Reputation";
import { Typography, Row, Col } from "antd";
import glStyles from "components/gstyles";
import AddPost from "./components/AddPost";

const Feed = () => {
  const { selectedCategory } = useMoralisDapp();
  const { Title, Paragraph } = Typography;
  let result = null;

  if (selectedCategory["category"] === "default") {
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
          <Typography>
            <Paragraph>
              <p
                style={{
                  display: "block",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                  width: "100%",
                  textAlign: "center",
                  fontFamily: "IRANsans",
                }}
              >
                <img
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                  src={
                    "https://ipfs.moralis.io:2053/ipfs/QmTpzXzzkgB58EP1jhAGnSsnqT3cF6f9yETGVaZ4B7Upoq"
                  }
                  alt='Polytter'
                  width='200'
                  height='200'
                />
              </p>
              <Title level={3}>Wellcome to polytter,</Title>
              You can post and comment in different categories and also in your
              feed.
            </Paragraph>
            <Paragraph>
              There is a reputation mechanism in different categories which
              shows next to your avatar after edit your profile for first time.
            </Paragraph>
            <Paragraph>
              {" "}
              All data will be stored on moralis IPFS can be accessed from
              Polygon blockchain.
            </Paragraph>
            <Paragraph>
              {" "}
              The address you use is in danger of expose and anyone can donate
              your post and comments.
            </Paragraph>

            <Title level={5}>
              You can start your journey by choosing a catergory
            </Title>
          </Typography>
        </div>
      </div>
    );
  } else {
    result = (
      <div className='col-lg-7'>
        <div
          style={{
            ...glStyles.card,
            padding: "10px 13px",
            display: "block",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
            borderRadius: "1.5rem",
          }}
        >
          <Row>
            <Col span={24}>
              <h4
                style={{
                  fontFamily: "IRANsans",
                  marginBottom: "30px",
                  marginTop: "5px",
                }}
              >
                {" "}
                Your Reputation in {selectedCategory["category"]} is{" "}
                <Reputation />{" "}
              </h4>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <AddPost />
            </Col>
          </Row>
        </div>
        <Posts />
      </div>
    );
  }

  return result;
};

export default Feed;
