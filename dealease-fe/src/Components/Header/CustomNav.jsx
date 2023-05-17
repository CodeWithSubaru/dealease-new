import { Nav } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";

export const CustomNav = ({ active, onSelect, children, ...props }) => {
  return (
    <>
      <Nav
        {...props}
        vertical
        activeKey={active}
        onSelect={onSelect}
        style={{ width: 100 }}
      >
        <Nav.Item eventKey="home" icon={<HomeIcon />}>
          Home
        </Nav.Item>
        <Nav.Item eventKey="news">News</Nav.Item>
      </Nav>

      <div>{children}</div>
    </>
  );
};
