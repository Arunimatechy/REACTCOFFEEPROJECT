import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const AdminPath = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) return <Navigate to="/login" replace />;
  if (!user.isAdmin) return <Navigate to="/" replace />;

  return children;
};

export default AdminPath;

// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { UserContext } from "../Context/UserContext";

// const AdminPath = ({ children }) => {
//   const { user } = useContext(UserContext);

//   // wait for context to hydrate
//   if (user === undefined) return null;

//   if (!user) return <Navigate to="/login" replace />;
//   if (!user.isAdmin) return <Navigate to="/" replace />;

//   return children;
// };

// export default AdminPath;
