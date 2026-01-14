// import { useContext } from "react";
// import { UserContext } from "../Context/UserContext.jsx";
// import { Navigate } from "react-router-dom";

// const AdminPath = ({ children }) => {
//   const { user } = useContext(UserContext);
//   return user?.isAdmin ? children : <Navigate to="/" replace />;
// };

// export default AdminPath;
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";

const AdminPath = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminPath;
