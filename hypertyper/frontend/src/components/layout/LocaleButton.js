import React from "react";
import { useTranslation } from "react-i18next";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

const locales = [
  {
    code: "fr",
    label: {
      fr: "Français",
      en: "French",
    },
  },
  {
    code: "en",
    label: {
      fr: "Anglais",
      en: "English",
    },
  },
];

const LocaleButton = () => {
  const { i18n } = useTranslation();

  const handleClick = (lang) => (e) => {
    i18n.changeLanguage(lang);
  };
  return (
    <NavDropdown
      title={
        <>
          <FontAwesomeIcon icon={faLanguage} />{" "}
          {locales.find((l) => l.code === i18n.language).label[i18n.language]}
          {" - "} {i18n.language}
        </>
      }
      id="locale-dropdown"
    >
      {locales.map((locale) => (
        <NavDropdown.Item key={locale.code} onClick={handleClick(locale.code)}>
          {locale.label[i18n.language]}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};

export default LocaleButton;
