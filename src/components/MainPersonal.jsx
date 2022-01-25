import Categories from "./CategoriesPersonal";
import Feed from "components/Feed/FeedPersonal";
import { useParams } from "react-router-dom";
import AccountRight from "./AccountRight";

const MainPersonal = () => {
  let { handle } = useParams();
  const postOwner = handle;
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
        <Categories postOwner={postOwner} />
        <Feed postOwner={postOwner} />
        <AccountRight />
      </div>
    </div>
  );
};

export default MainPersonal;
