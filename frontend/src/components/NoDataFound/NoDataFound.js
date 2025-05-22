import React from "react";
import { useTranslation } from "react-i18next";

const NoDataFound = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === "ta";
  const fontSizeClass = isTamil ? "text-base" : "text-xl";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 className={fontSizeClass}>{t("no_data_found")}</h1>
    </div>
  );
};

export default NoDataFound;
