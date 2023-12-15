import { useCallback, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectUserError, selectUserLoading } from "../redux/selectors/user";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("Zar@mail.ru");
  const [password, setPassword] = useState("A12345678");
  const errors = useSelector(selectUserError);
  const user = useSelector(selectUser);
  const handleSetEmail = useCallback((e) => setEmail(e.target.value), []);
  const handleSetPassword = useCallback((e) => setPassword(e.target.value), []);
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const query = new URLSearchParams({
        email,
        password,
      }).toString();
      dispatch({ type: "SET/USER/LOADING" });
      const users = await fetch(`http://localhost:5000/users/?${query}`).then(
        (r) => r.json()
      );
      if (users.length === 1) {
        dispatch({ type: "SET/USER/DATA", payload: users[0] });
        navigate("/");
      } else {
        throw new Error("Неправильный логин или пароль");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        dispatch({ type: "SET/USER/ERROR", payload: err.format() });
      } else {
        dispatch({ type: "SET/USER/ERROR", payload: err });
      }
    }
  };

  useEffect(() => {
    if (user?.email) {
      navigate("/notes");
    }
  }, [navigate, user]);

  if (useSelector(selectUserLoading)) return <div>loading...</div>;

  return (
    <div className="h-auto flex mt-20 justify-center bg-gray-10">
      <div className="w-full max-w-md bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-3xl text-center mb-6">Login</h1>
        <div className="flex flex-col gap-4">
          <input
            placeholder="Email"
            value={email}
            onChange={handleSetEmail}
            type="email"
            className="border border-gray-300 p-2 rounded-md"
          />
          {errors?.email && (
            <div className="text-red-400">{errors?.email?._errors}</div>
          )}
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={handleSetPassword}
            className="border border-gray-300 p-2 rounded-md"
          />
          {errors?.password && (
            <div className="text-red-400">{errors?.password?._errors}</div>
          )}
          {errors?.message && (
            <div className="text-red-400">{errors?.message}</div>
          )}
        </div>
        <div className="flex flex-col items-center mt-6">
          <button
            onClick={handleLogin}
            className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Login
          </button>
          <Link
            to="/signup"
            className="mt-4 text-blue-500"
            onClick={() => dispatch({ type: "SET/USER/ERROR", payload: null })}
          >
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Login };
