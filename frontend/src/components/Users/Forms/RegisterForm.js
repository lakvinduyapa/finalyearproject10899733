import React, { useState, useEffect } from "react";
import ErrorComponent from "../../ErrorMsg/ErrorMsg";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../redux/slices/users/usersSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === "ta";
  const fontSizeClass = isTamil ? "text-sm" : "text-base";

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    email: "",
    password: "",
    role: "customer",
  });

  const { firstname, lastname, contact, email, password, role } = formData;
  const { loading, userAuth, error } = useSelector((state) => state.users);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (userAuth?.userInfo?._id) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [userAuth?.userInfo, navigate]);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const payload = {
      firstname,
      lastname,
      contact,
      email,
      password,
      isSeller: role === "seller",
      isAdmin: false,
    };
    dispatch(registerUserAction(payload));
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-6xl bg-white shadow-lg flex flex-col lg:flex-row">
        {/* Image Panel */}
        <div
          className="lg:w-1/2 h-64 lg:h-auto bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://salaglobal.com/wp-content/uploads/2021/12/ghfuyg.jpg")',
          }}
        ></div>

        {/* Register Form Panel */}
        <div className="lg:w-1/2 p-10">
          <div className="max-w-xl mx-auto">
            <h3 className={`mb-8 text-4xl md:text-5xl text-center font-bold font-heading ${fontSizeClass}`}>
              {t("signup_heading")}
            </h3>

            {error?.message && (
              <ErrorComponent message={error?.message} />
            )}

            {showSuccess && (
              <div className="mb-4 p-4 text-green-700 bg-green-100 border border-green-300 rounded">
                {t("register_success") || "Registration successful! Redirecting to login..."}
              </div>
            )}

            <p className={`mb-10 text-center ${fontSizeClass}`}>
              {t("signup_subheading")}
            </p>

            <form onSubmit={onSubmitHandler}>
              <select
                name="role"
                value={role}
                onChange={onChangeHandler}
                className="w-full mb-4 px-6 py-4 border border-gray-300 rounded-md"
              >
                <option value="customer">{t("register_as_customer")}</option>
                <option value="seller">{t("register_as_seller")}</option>
              </select>

              <input
                name="firstname"
                value={firstname}
                onChange={onChangeHandler}
                className="w-full mb-4 px-6 py-4 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                type="text"
                placeholder={t("first_name")}
              />
              <input
                name="lastname"
                value={lastname}
                onChange={onChangeHandler}
                className="w-full mb-4 px-6 py-4 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                type="text"
                placeholder={t("last_name")}
              />
              <input
                name="contact"
                value={contact}
                onChange={onChangeHandler}
                className="w-full mb-4 px-6 py-4 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                type="text"
                placeholder={t("contact")}
              />
              <input
                name="email"
                value={email}
                onChange={onChangeHandler}
                className="w-full mb-4 px-6 py-4 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                type="email"
                placeholder={t("enter_email")}
              />
              <input
                name="password"
                value={password}
                onChange={onChangeHandler}
                className="w-full mb-4 px-6 py-4 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                type="password"
                placeholder={t("enter_password")}
              />
              <button
                disabled={loading}
                className="mt-8 bg-[#FC6DC5] hover:bg-[#FFB1E1] text-black font-bold font-heading py-4 px-8 rounded-md uppercase w-full"
              >
                {loading ? t("loading") : t("register")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
