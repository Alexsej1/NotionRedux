import { useSelector } from "react-redux";
import { selectUser } from "../redux/selectors/user";

function Home() {
  const user = useSelector(selectUser)
  return (
    <div className="h-auto flex mt-20 justify-center bg-gray-10">
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-4xl">Hello, {user.email}!</h1>
      </div>
    </div>
  );
}

export { Home };
