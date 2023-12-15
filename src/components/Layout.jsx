import { Outlet, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/selectors/user";

export default function Layout() {
  const dispacth = useDispatch();
  const user = useSelector(selectUser)
  const handleLogout = () => {
    dispacth({ type: "SET/USER/DATA", payload: null });
  };

  return (
    <div className="p-4">
      <header className="flex w-full justify-between items-center">
        <span className="pl-10 text-xl font-medium">
          Hello, {user.email}
        </span>
        <div className="flex justify-end space-x-4 text-gray-400">
          <NavLink
            to="/about"
            end
            className={({ isActive }) =>
              isActive ? "font-medium text-black" : ""
            }
          >
            About
          </NavLink>
          <NavLink
            to="/notes"
            end
            className={({ isActive }) =>
              isActive ? "font-medium text-black" : ""
            }
          >
            Notes
          </NavLink>
          <button className="text-red-500" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="mt-10">
        <hr />
        <div className="flex justify-center pr-10 pl-10 text-gray-400">
          <span>Created by: me</span>
        </div>
      </footer>
    </div>
  );
}
