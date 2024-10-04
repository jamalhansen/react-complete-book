import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";

export function EventsRoot() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}
