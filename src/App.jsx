import { Outlet } from "react-router";
import NavBar, { SideNav } from "./Components/NavBar";
import { useEffect, useState } from "react";

function App() {
  const [showSideNav, setShowSideNav] = useState(false);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width > 640) setShowSideNav(false);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="px-5 sm:px-10 py-5 border-b-[0.5px] border-gray-300 bg-neutral-50 sticky top-0 w-full z-20">
        <NavBar
          onClick={() => {
            setShowSideNav(true);
          }}
        />
      </header>
      {showSideNav && <SideNav onClick={() => setShowSideNav(false)} />}
      <Outlet />
      <footer className="px-10 py-3 border-t-[0.5px] border-gray-300 bg-neutral-50">
        <p className="tracking-wide text-xs text-center text-gray-500">Created by @Isfaqul</p>
      </footer>
    </>
  );
}

export default App;
