import { Link, NavLink, useNavigate } from "react-router-dom";
import { routes } from "../../../../config/routes";
import { useUser } from "../../../../context/UserContext";

export const publicMenuItems = [
  {
    to: routes.auth.register,
    label: "Register",
  },
  {
    to: routes.auth.login,
    label: "Login",
  },
];

export const privateMenuItems = [
  {
    to: routes.dashboard,
    label: "Dashboard",
  },
  {
    to: routes.settings,
    label: "Settings",
  },
  {
    to: routes.profile,
    label: "Profile",
  },
  {
    to: routes.posts,
    label: "Posts",
  },
];


export const PageHeader = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();


  const isLoggedIn = !!user;
  const navLinks = isLoggedIn ? privateMenuItems : publicMenuItems;

  const handleLogout = () => {
    logout();
    navigate(routes.auth.login);
  }

  return (
    <div >
      <Link to={routes.home}>Logo</Link>
      <nav>
        <ul>
          {navLinks.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {isLoggedIn && (
        <button onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};
