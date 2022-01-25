import { useMoralisQuery } from "react-moralis";
import Categories from "./Categories";
import Feed from "./Feed";
import AccountRight from "./AccountRight";

const Main = () => {
  const queryCategories = useMoralisQuery("Categories");
  const fetchedCategories = JSON.parse(
    JSON.stringify(queryCategories.data, ["categoryId", "category"])
  );

  return (
    <div className='container'>
      <div
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
        <Categories categories={fetchedCategories} />
        <Feed />
        <AccountRight />
      </div>
    </div>
  );
};

export default Main;
