import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../../redux/slices/users/usersSlice";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import { useTranslation } from "react-i18next";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === "ta";
  const fontSizeClass = isTamil ? "text-sm" : "text-base";

  const [formData, setFormData] = useState({
    email: "admin@gmail.com",
    password: "12345",
  });

  const { email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUserAction({ email, password }));
  };

  const { error, loading, userInfo } = useSelector((state) => state?.users?.userAuth);

  useEffect(() => {
    if (userInfo?.token) {
      if (userInfo?.userFound?.isAdmin) {
        navigate("/admin");
      } else if (userInfo?.userFound?.isSeller) {
        navigate("/seller");
      } else {
        navigate("/customer-profile");
      }
    }
  }, [userInfo, navigate]);

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-100">
  <div className="w-full max-w-6xl bg-white shadow-lg flex flex-col md:flex-row">
    {/* Left Image Panel */}
    <div
      className="md:w-2/5 h-64 md:h-auto bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://nexttravelsrilanka.com/wp-content/uploads/2023/02/Pottery-Industry-in-Sri-Lanka.jpg")',
      }}
    ></div>

    {/* Right Login Form Panel */}
    <div className="md:w-3/5 p-10">
      <div className="max-w-xl mx-auto">
        <h3 className={`mb-8 text-4xl md:text-5xl text-center font-bold font-heading ${fontSizeClass}`}>
          {t("login_heading")}
        </h3>
        <p className={`mb-10 font-semibold text-center font-heading ${fontSizeClass}`}>
          {t("login_subheading")}
        </p>

        {error && <ErrorMsg message={error?.message} />}

        <form className="flex flex-wrap -mx-4" onSubmit={onSubmitHandler}>
          <div className="w-full px-4 mb-6">
            <label>
              <h4 className={`mb-3 text-gray-400 uppercase font-bold font-heading ${fontSizeClass}`}>
                {t("your_email")}
              </h4>
              <input
                name="email"
                value={email}
                onChange={onChangeHandler}
                className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                type="email"
              />
            </label>
          </div>
          <div className="w-full px-4 mb-6">
            <label>
              <h4 className={`mb-3 text-gray-400 uppercase font-bold font-heading ${fontSizeClass}`}>
                {t("password")}
              </h4>
              <input
                name="password"
                value={password}
                onChange={onChangeHandler}
                className="p-5 w-full border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                type="password"
              />
            </label>
          </div>

          <div className="w-full px-4 flex justify-center">
            {loading ? (
              <button className="bg-gray-800 text-white font-bold font-heading py-5 px-8 rounded-md uppercase">
                {t("loading")}
              </button>
            ) : (
              <button className="bg-[#FC6DC5] hover:bg-[#FFB1E1] text-black font-bold font-heading py-5 px-8 rounded-md uppercase">
                {t("login")}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

  );
};

export default Login;
