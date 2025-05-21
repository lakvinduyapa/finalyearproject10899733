import React, { useState } from "react";
import ErrorComponent from "../../ErrorMsg/ErrorMsg";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../redux/slices/users/usersSlice";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    email: "",
    password: "",
    role: "customer", // default role
  });

  const { firstname, lastname, contact, email, password, role } = formData;

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
      isSeller: role === "seller" ? true : false,
      isAdmin: false,
    };

    dispatch(registerUserAction(payload));
  };

  const { loading, userAuth } = useSelector((state) => state.users);

  if (userAuth?.userInfo?.status) {
    window.location.href = "/login";
  }

  return (
    <section className="relative overflow-x-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="w-full lg:w-2/6 px-4 mb-12 lg:mb-0">
            <div className="py-20 text-center">
              <h3 className="mb-8 text-4xl md:text-5xl font-bold font-heading">
                Signing up with social is super quick
              </h3>

              {userAuth?.error?.message && (
                <ErrorComponent message={userAuth?.error?.message} />
              )}

              <p className="mb-10">Please, do not hesitate</p>
              <form onSubmit={onSubmitHandler}>
                <select
                  name="role"
                  value={role}
                  onChange={onChangeHandler}
                  className="w-full mb-4 px-12 py-4 border border-gray-300 rounded-md"
                >
                  <option value="customer">Register as Customer</option>
                  <option value="seller">Register as Seller</option>
                </select>

                <input
                  name="firstname"
                  value={firstname}
                  onChange={onChangeHandler}
                  className="w-full mb-4 px-12 py-6 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                  type="text"
                  placeholder="First Name"
                />
                <input
                  name="lastname"
                  value={lastname}
                  onChange={onChangeHandler}
                  className="w-full mb-4 px-12 py-6 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                  type="text"
                  placeholder="Last Name"
                />
                <input
                  name="contact"
                  value={contact}
                  onChange={onChangeHandler}
                  className="w-full mb-4 px-12 py-6 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                  type="text"
                  placeholder="Contact"
                />
                <input
                  name="email"
                  value={email}
                  onChange={onChangeHandler}
                  className="w-full mb-4 px-12 py-6 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                  type="email"
                  placeholder="Enter your email"
                />
                <input
                  name="password"
                  value={password}
                  onChange={onChangeHandler}
                  className="w-full mb-4 px-12 py-6 border border-gray-200 focus:ring-blue-300 focus:border-blue-300 rounded-md"
                  type="password"
                  placeholder="Enter your password"
                />
                <button
                  disabled={loading}
                  className="mt-12 md:mt-16 bg-blue-800 hover:bg-blue-900 text-white font-bold font-heading py-5 px-8 rounded-md uppercase"
                >
                  {loading ? "Loading..." : "Register"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className="hidden lg:block lg:absolute top-0 bottom-0 right-0 lg:w-3/6 bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://cdn.pixabay.com/photo/2017/03/29/04/47/high-heels-2184095_1280.jpg")',
        }}
      />
    </section>
  );
};

export default RegisterForm;
