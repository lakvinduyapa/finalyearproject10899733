import React from "react";

const SellerRoute = ({ children }) => {
  //get user from localstorage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isSeller = user?.userFound?.isSeller ? true : false;
  if (!isSeller) return <h1 className="text-red-600 text-2xl font-bold text-center mt-32">
  Access Denied, Seller Only
</h1>
;
  return <>{children}</>;
};

export default SellerRoute;