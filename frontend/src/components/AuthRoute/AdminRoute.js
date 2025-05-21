import React from "react";

const AdminRoute = ({ children }) => {
  //get user from localstorage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = user?.userFound?.isAdmin ? true : false;
  if (!isAdmin) return <h1 className="text-red-600 text-2xl font-bold text-center mt-32">
  Access Denied, Admin Only
</h1>
;
  return <>{children}</>;
};

export default AdminRoute;