import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  const token = localStorage.getItem("token");
  return (
    <main>
      <nav>
        <div>Logo</div>
        <ul>
          <li>login</li>
          <li>Register</li>
          {token && <li>log out</li>}
        </ul>{" "}
      </nav>
      <Outlet />
      <p>footer</p>{" "}
    </main>
  );
};

export default Layout;
