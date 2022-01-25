import glStyles from "./gstyles";
import Posts from "./ShowProfilePersonal";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const Categories = (props) => {
  return (
    <div className='col-lg-3'>
      <>
        <Posts postOwner={props.postOwner} />
      </>
      <Menu style={{ ...glStyles.card, padding: "10px 0" }} mode='inline'>
        <Menu.ItemGroup>
          <Menu.Item>
            <Link to={"/main"}>Main page</Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </div>
  );
};

export default Categories;
