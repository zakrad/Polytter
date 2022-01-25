import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Layout, Typography, Row, Col, Button, Card, Avatar } from "antd";
import "antd/dist/antd.css";
import "./style.css";
import Main from "components/Main";
import MainPersonal from "components/MainPersonal";
import glStyles from "components/gstyles";
import { MessageTwoTone } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "IRANsans",
    color: "#041836",
    marginTop: "13px",
    padding: "10px",
  },
};

const App = ({ isServerInfo }) => {
  const {
    isWeb3Enabled,
    enableWeb3,
    authenticate,
    isAuthenticated,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout>
      <Router>
        <div style={styles.content}>
          <Switch>
            <Route path='/main'>
              <Main />
            </Route>
            <Route path='/feed/:handle'>
              <MainPersonal />
            </Route>
            <Route path='/nonauthenticated'>
              <div>
                <Row
                  style={{
                    display: "flex",
                    fontFamily: "IRANsans",
                    color: "#041836",
                    padding: "10px 30px",
                    maxWidth: "1200px",
                    width: "100%",
                    gap: "20px",
                  }}
                >
                  <Col className='col-lg-9'>
                    <div
                      style={{
                        ...glStyles.card,
                        fontFamily: "IRANsans",
                        padding: "10px 13px",
                        display: "flex",
                      }}
                    >
                      <Typography>
                        <Paragraph>
                          <p
                            style={{
                              fontFamily: "IRANsans",
                              display: "block",
                              justifyContent: "center",
                              alignItems: "center",
                              margin: "auto",
                              width: "100%",
                              textAlign: "center",
                            }}
                          >
                            <img
                              style={{
                                display: "inline-block",
                                verticalAlign: "middle",
                              }}
                              src={
                                "https://ipfs.moralis.io:2053/ipfs/QmTpzXzzkgB58EP1jhAGnSsnqT3cF6f9yETGVaZ4B7Upoq"
                              }
                              alt='Polytter'
                              width='200'
                              height='200'
                            />
                          </p>
                          <Title level={3}>Wellcome to polytter,</Title>
                          You can post and comment in different categories and
                          also in your feed.
                        </Paragraph>
                        <Paragraph>
                          There is a reputation mechanism in different
                          categories which shows next to your avatar after edit
                          your profile for first time.
                        </Paragraph>
                        <Paragraph>
                          {" "}
                          All data will be stored on moralis IPFS can be
                          accessed from Polygon blockchain.
                        </Paragraph>
                        <Paragraph>
                          {" "}
                          The address you use is in danger of expose and anyone
                          can donate your post and comments.
                        </Paragraph>

                        <Title level={5}>
                          Please login using the "Sign in" button and make sure
                          using "POLYGON" mainnet otherwise your actions doesn't
                          count
                        </Title>
                      </Typography>
                    </div>
                  </Col>
                  <Col
                    className='col-lg-2'
                    style={{
                      display: "inline-block",
                    }}
                  >
                    <Card
                      style={{
                        width: "auto",
                        height: "auto",
                        borderRadius: "10px",
                        fontFamily: "IRANsans",
                      }}
                    >
                      <Avatar
                        style={{
                          display: "block",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "auto",
                        }}
                        src={
                          <MessageTwoTone
                            twoToneColor='#1da1f2'
                            style={{ fontSize: "50px" }}
                          />
                        }
                        alt='Polytter'
                        size={64}
                      />

                      <Button
                        size='medium'
                        type='primary'
                        style={{
                          display: "block",
                          fontFamily: "IRANsans",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "auto",
                          borderRadius: "0.5rem",
                          fontSize: "13px",
                          fontWeight: "500",
                        }}
                        onClick={() =>
                          authenticate({
                            signingMessage: "Wellcome to Polytter!",
                          })
                        }
                      >
                        Sign in
                      </Button>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Route>
          </Switch>
          {isAuthenticated ? (
            <Redirect to='/main' />
          ) : (
            <Redirect to='/nonauthenticated' />
          )}
        </div>
      </Router>
    </Layout>
  );
};

export default App;
