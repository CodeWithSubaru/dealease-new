import { NavLink, Link } from "react-router-dom";

function NavLinks() {
  const activeStyle = { color: "#d69215" };

  const navLinks = [
    { title: "Home", to: "/" },
    { title: "Message", to: "/message" },
    { title: "Profile", to: "/profile" },
  ];

  const navItem = (title, to) => {
    return (
      <li className="nav-item" key={title}>
        <NavLink
          className="nav-link"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to={to}
        >
          {title}
        </NavLink>
      </li>
    );
  };

  return (
    <>
      {navLinks.map((link) => {
        return navItem(link.title, link.to);
      })}
    </>
  );
}

export default NavLinks;
