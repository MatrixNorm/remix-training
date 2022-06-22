import { Outlet } from "@remix-run/react";

export default function () {
  return (
    <div className="p-5">
      <Outlet />
    </div>
  );
}
