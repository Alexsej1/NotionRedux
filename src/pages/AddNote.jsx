import { Link, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/selectors/user";

export default function AddNote() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const handleSetName = useCallback((e) => setName(e.target.value), []);
  const handleSetText = useCallback((e) => setText(e.target.value), []);

  const handleCreate = async () => {
    if (name === "") {
      setError("Заголовок не может быть пустым");
      return;
    }

    const date = new Date(Date.now());
    const note = {
      userId: user.id,
      title: name,
      body: text,
      date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    };

    await fetch("http://localhost:5000/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/notes");
  };

  return (
    <div className="h-auto flex flex-col mt-20 items-center bg-green-10">
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-3xl text-green-700 mb-6">Create New Note</h1>
        {error && <div className="text-red-400 mb-4">{error}</div>}
        <div className="flex flex-col gap-4">
          <input
            placeholder="Name"
            value={name}
            onChange={handleSetName}
            className="border border-green-300 p-2 rounded-md"
          />
          <textarea
            placeholder="Note text..."
            value={text}
            onChange={handleSetText}
            className="border border-green-300 p-2 rounded-md h-36"
          />
        </div>
        <div className="flex justify-end mt-6">
          <Link to="/notes">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">
              Cancel
            </button>
          </Link>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}