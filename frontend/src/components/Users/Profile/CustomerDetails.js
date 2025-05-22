import { CalendarIcon } from "@heroicons/react/20/solid";

export default function CustomerDetails({ email, dateJoined, fullName }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-10 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Hi, {fullName}! You are welcome!!!
      </h2>

      <div className="flex flex-col items-center space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mr-1.5 h-5 w-5 text-gray-400"
          >
            <path
              strokeLinecap="round"
              d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
            />
          </svg>
          {email}
        </div>

        <div className="flex items-center">
          <CalendarIcon className="mr-1.5 h-5 w-5 text-gray-400" />
          Date Joined: {dateJoined}
        </div>
      </div>
    </div>
  );
}
