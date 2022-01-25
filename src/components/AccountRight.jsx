import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "helpers/formatters";
import { Button, Card, Row, Col, Avatar } from "antd";
import { SelectOutlined, MessageTwoTone } from "@ant-design/icons";
import { getExplorer } from "helpers/networks";
const styles = {
  account: {
    fontFamily: "IRANsans",
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    backgroundColor: "#f5f8fa",
    cursor: "pointer",
  },
  text: {
    color: "#14171a",
  },
};

function AccountRight() {
  const { authenticate, isAuthenticated, logout } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();

  if (!isAuthenticated) {
    return (
      <div
        style={styles.account}
        onClick={() =>
          authenticate({ signingMessage: "Wellcome to Polytter!" })
        }
      >
        <p style={styles.text}>Sign in</p>
      </div>
    );
  }

  return (
    <Row>
      <Col>
        <Card
          className='col-lg-2'
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
          <a
            href={`${getExplorer(chainId)}/address/${walletAddress}`}
            target='_blank'
            rel='noreferrer'
          >
            <div style={styles.account}>
              <p style={{ marginRight: "5px", ...styles.text }}>
                {getEllipsisTxt(walletAddress, 6)}
              </p>
              <SelectOutlined
                style={{ marginRight: "5px", fontFamily: "IRANsans" }}
              />
            </div>
          </a>
          <Button
            size='medium'
            type='primary'
            style={{
              display: "block",
              fontFamily: "IRANsans",
              justifyContent: "center",
              alignItems: "center",
              width: "80%",
              margin: "auto",
              borderRadius: "0.5rem",
              fontSize: "13px",
              fontWeight: "500",
            }}
            onClick={() => {
              logout();
            }}
          >
            Disconnect
          </Button>
        </Card>
      </Col>
    </Row>
  );
}

export default AccountRight;
