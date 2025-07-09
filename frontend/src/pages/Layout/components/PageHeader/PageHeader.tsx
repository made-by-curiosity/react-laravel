import { Link, NavLink } from "react-router-dom";
import { routes } from "../../../../config/routes";
import { useState } from "react";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navLinks = isLoggedIn ? privateMenuItems : publicMenuItems;

  const toggleLogin = () => {
    setIsLoggedIn((isLoggedIn) => !isLoggedIn);
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
      <div>
        <button onClick={toggleLogin}>{isLoggedIn ? 'Log out' : 'Log in'}</button>
      </div>
    </div>
  );
};
