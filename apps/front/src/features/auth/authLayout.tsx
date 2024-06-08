import { Outlet } from "@tanstack/react-router";

export const AuthLayout = () => {
  return (
    <div className="w-[100%] h-[100%] m-0 p-0 flex flex-col justify-center items-center">
      <div className="p-16">
        <Outlet />
      </div>
    </div>
  );
};
