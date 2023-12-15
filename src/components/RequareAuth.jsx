import { Navigate } from "react-router-dom";
import { connect } from 'react-redux';

export const RequareAuth = connect((state) => ({
  user: state.user.user,
}))(({ user, children }) => {
  if (!user?.email) {
    return <Navigate to="/login" />;
  }
  return children;
});
