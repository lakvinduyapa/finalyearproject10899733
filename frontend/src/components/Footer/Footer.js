import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../Footer/logo.png"; // Correct path

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-pink-300 text-gray-900 py-10">
      <div className="w-full px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Name */}
        <div className="flex flex-col px-20 items-center sm:items-start text-center sm:text-left">
          <img src={logo} alt="Logo" className="h-[120px] w-auto mb-2" />
        </div>

        {/* Shop Links */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h3 className="text-lg font-semibold text-white mb-2">{t("footer_shop")}</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/">{t("home")}</Link></li>
            <li><Link to="/products">{t("products")}</Link></li>
            <li><Link to="/newsfeed">{t("newsfeed")}</Link></li>
          </ul>
        </div>

        {/* Other Links */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h3 className="text-lg font-semibold text-white mb-2">{t("footer_others")}</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/register">{t("create_account")}</Link></li>
            <li><Link to="/login">{t("sign_in")}</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5" />
            <p>{t("address")}</p>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon className="h-5 w-5" />
            <p>{t("phone")}</p>
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
