import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === "loading" ? <p>Loading...</p> : null} */}
        <Outlet />
      </main>
    </>
  );
}
