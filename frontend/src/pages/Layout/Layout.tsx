import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { PageHeader } from "./components/PageHeader";

export const Layout = () => {
  return (
    <>
      <PageHeader />
      <Suspense fallback={null}>
        <main>
          <Outlet />
        </main>
      </Suspense>
    </>
  );
};
