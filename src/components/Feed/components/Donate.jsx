import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { Input, InputNumber, Button, Select, message, Row, Col } from "antd";
import Icon from "@ant-design/icons";
import MaticSvg from "components/image.svg";

function Donate(props) {
  const { Moralis } = useMoralis();
  const [tx, setTx] = useState();
  const [amount, setAmount] = useState();
  const [isPending, setIsPending] = useState(false);
  const { walletAddress } = useMoralisDapp();
  const selectBefore = (
    <Select
      loading={isPending}
      onClick={() => DoDonate("donate")}
      disabled={!tx}
      style={{ width: 60 }}
    >
      Donate
    </Select>
  );
  useEffect(() => {
    amount ? setTx({ amount }) : setTx();
  }, [amount]);

  async function DoDonate(donate) {
    if (walletAddress.toLowerCase() === props.postOwner.toLowerCase())
      return message.error("You cannot donate on your posts");

    const { amount } = tx;

    const options2 = {
      type: "native",
      amount: Moralis.Units.ETH(amount),
      receiver: props.postOwner,
      awaitReceipt: false,
    };

    setIsPending(true);

    const transaction = await Moralis.transfer(options2);
    transaction.on("confirmation", (confirmationNumber, receipt) => {
      setIsPending(false);
    });
  }

  return (
    <Row>
      <Col span='6'>
        <Input
          type='number'
          size='default'
          onChange={(e) => {
            setAmount(`${e.target.value}`);
          }}
        />
      </Col>
      <Col span='6'>
        <Button
          type='primary'
          size='default'
          loading={isPending}
          onClick={() => DoDonate("donate")}
          disabled={!tx}
          style={{
            fontFamily: "IRANsans",
            borderRadius: "3px",
            fontSize: "12px",
            fontWeight: "500",
            padding: "0 3px",
          }}
        >
          Donate
        </Button>
      </Col>
    </Row>
  );
}

export default Donate;
