import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logo from "../Footer/logo.png"; // Correct path

export default function Footer() {
  return (
    <footer className="bg-pink-300 text-gray-900 py-10">
      <div className="w-full px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Name */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <img src={logo} alt="Logo" className="h-[120px] w-auto mb-2" />
        </div>

        {/* Shop Links */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h3 className="text-lg font-semibold text-white mb-2">Shop</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/newsfeed">Newsfeed</Link></li>
          </ul>
        </div>

        {/* Other Links */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h3 className="text-lg font-semibold text-white mb-2">Others</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5" />
            <p>No. 1, Cotta Road, Rajagiriya</p>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon className="h-5 w-5" />
            <p>+94 117 534 567</p>
          </div>
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="h-5 w-5" />
            <p>support@liyasavi.lk</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
