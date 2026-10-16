import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";
import HexBackground from "./HexBackground.tsx";

export default function Layout() {
  return (
    <>
      <HexBackground />
      <Header />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
}
