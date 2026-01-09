import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #eee" }}>
      <ul style={{ display: "flex", gap: 12, listStyle: "none", margin: 0, padding: 0 }}>
        <li>
          <Link to="/">Films populaires</Link>
        </li>
        <li>
          <Link to="/wishlist">Wishlist</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
