import { Suspense, lazy } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Layout } from "../Layout/Layout";
import { routes } from "../../config/routes";

const HomePage = lazy(() => import("../Home/HomePage"));
const AuthPage = lazy(() => import("../Auth/AuthPage"));
const Register = lazy(() => import("../Auth/components/Register"));
const Login = lazy(() => import("../Auth/components/Login"));
const DashboardPage = lazy(() => import("../Dashboard/DashboardPage"));
const ProfilePage = lazy(() => import("../Profile/ProfilePage"));
const SettingsPage = lazy(() => import("../Settings/SettingsPage"));
const PostsPage = lazy(() => import("../Posts/PostsPage"));

export const RootPage = () => {
  return (
    <Suspense fallback={null}>
      <ToastContainer
        limit={3}
        hideProgressBar={true}
        pauseOnFocusLoss={false}
        icon={false}
        autoClose={5000}
      />
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path={routes.auth.root} element={<AuthPage />} >
              <Route path={routes.auth.register} element={<Register />} />
              <Route path={routes.auth.login} element={<Login />} />
            </Route>
            <Route path={routes.dashboard} element={<DashboardPage />} />
            <Route path={routes.profile} element={<ProfilePage />} />
            <Route path={routes.settings} element={<SettingsPage />} />
            <Route path={routes.posts} element={<PostsPage />} />
            <Route path={"*"} element={<Navigate to={routes.home} replace={true} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense >
  );
};
