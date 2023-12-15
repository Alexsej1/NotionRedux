import { connect } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getNotes } from "../redux/actions/notes";
import Note from "./../components/Note";

function Notes({ user, notes, getNotes, loading }) {

  useEffect(() => {
    if (user) {
      getNotes(user.id);
    }
  }, [user, getNotes]);
  
  if(loading) return <div>Loading...</div>
  return (
    <div className="h-auto flex flex-col mt-20 items-center bg-gray-10">
      <h1 className="text-3xl text-green-700 mb-6">Notes:</h1>
      <Link to="/AddNote">
        <button className="bg-green-500 text-white px-4 py-2 mb-5 rounded-md mr-2">
          Add new note
        </button>
      </Link>
      <div className="w-full max-w-md">
        {notes
          .sort((a, b) => a.id < b.id)
          .map((note) => (
            <Note key={note.id} note={note} />
          ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  notes: state.notes.notes,
  loading: state.notes.loading
});

const mapDispatchToProps = {
  getNotes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
