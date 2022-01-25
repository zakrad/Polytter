import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisQuery, useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import { Badge, Avatar } from "antd";
import Blockie from "components/Blockie";
import { Link } from "react-router-dom";

const Reputation = (props) => {
  const { Moralis } = useMoralis();
  const { contractABI, contractAddress, selectedCategory } = useMoralisDapp();
  const [reputationValue, setReputation] = useState(0);
  const contractABIJson = JSON.parse(contractABI);

  const { data: votes } = useMoralisQuery(
    "Votes",
    (query) => query.equalTo("postOwner", props.postOwner),
    [],
    {
      live: true,
    }
  );

  const categoryId = selectedCategory["categoryId"];

  const options = {
    contractAddress: contractAddress,
    functionName: "getReputation",
    abi: contractABIJson,
    params: {
      _address: props.postOwner,
      _categoryID: categoryId,
    },
  };

  useEffect(() => {
    async function getReputation() {
      await Moralis.enableWeb3();
      const result = await Moralis.executeFunction(options);
      setReputation(result);
    }

    getReputation();
  }, [votes, props.postOwner, categoryId]);

  return (
    <>
      {props.image !== undefined ? (
        <Link to={`/feed/${props.postOwner}`}>
          <Badge count={reputationValue}>
            <Avatar src={props.image} />
          </Badge>
        </Link>
      ) : (
        <Link to={`/feed/${props.postOwner}`}>
          <Badge count={reputationValue}>
            <Avatar src={<Blockie address={props.postOwner} />} scale='4' />
          </Badge>
        </Link>
      )}
    </>
  );
};

export default Reputation;
