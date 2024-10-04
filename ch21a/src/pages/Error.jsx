import { MainNavigation } from "../components/MainNavigation";

export function Error() {
  return (
    <>
      <MainNavigation />
      <main>
        <h1>An error occured!</h1>
        <p> Could not find this page</p>
      </main>
    </>
  );
}
