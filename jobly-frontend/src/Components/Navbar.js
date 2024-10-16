import { Link } from "react-router-dom";

function Navbar({ currentUser, logout }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      {currentUser ? (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Sign Out</button>
        </>
      ) : (
        <>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
