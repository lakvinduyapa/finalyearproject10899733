import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAction } from "../../../redux/slices/users/usersSlice";

export default function Customers() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    dispatch(fetchAllUsersAction());
  }, [dispatch]);

  // Combine firstname + lastname or fallback
  const getName = (user) => {
    return `${user.firstname || ""} ${user.lastname || ""}`.trim() || "Unnamed";
  };

  // Determine user role
  const getRole = (user) => {
    if (user.isAdmin) return "Admin";
    if (user.isSeller) return "Seller";
    return "Customer";
  };

  // Filter users by name
  const filteredUsers = users?.filter((user) =>
    getName(user).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort users
  const sortedUsers = [...(filteredUsers || [])].sort((a, b) => {
    if (sortBy === "name") return getName(a).localeCompare(getName(b));
    if (sortBy === "role") return getRole(a).localeCompare(getRole(b));
    if (sortBy === "date") return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h3 className="text-lg font-medium leading-6 text-gray-900 mt-3">All Customers</h3>

      {/* Search & Sort Controls */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full sm:w-1/4 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
        >
          <option value="name">Sort by Name</option>
          <option value="role">Sort by Role</option>
          <option value="date">Sort by Joined Date</option>
        </select>
      </div>

      {/* Table */}
      <div className="-mx-4 mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        {loading ? (
          <p className="p-4 text-gray-700">Loading customers...</p>
        ) : error ? (
          <p className="p-4 text-red-600">{error}</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Name
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Role
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Joined On
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {sortedUsers?.map((user) => (
                <tr key={user._id}>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {getName(user)}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">{user.email}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">{getRole(user)}</td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {sortedUsers?.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-4 py-4 text-sm text-gray-500 text-center">
                    No matching users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
