import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DEFAULT_KEYS from "../components/keyboard/keysList";

const isUpperCase = (string) => /^[A-Z]*$/.test(string);

const getLeftShiftKey = () => {
  return DEFAULT_KEYS.find((key) => key.id === "b-5-1");
};

const getRightShiftKey = () => {
  return DEFAULT_KEYS.find((key) => key.id === "b-5-12");
};

const getShiftKey = (key) => {
  if (key.hand === "right") return getLeftShiftKey();
  else return getRightShiftKey();
};

const useNextKey = (nextChar) => {
  const [nextKey, setNextKey] = useState(null);
  const nextCharUpperCased = isUpperCase(nextChar);
  const { t } = useTranslation();

  useEffect(() => {
    if (nextChar) {
      setNextKey(
        DEFAULT_KEYS.find((key) =>
          nextCharUpperCased
            ? t(`buttons.${key.id}.upper`) === nextChar
            : t(`buttons.${key.id}.lower`) === nextChar
        )
      );
    }
  }, [nextChar]);

  let rightHandKey = null;
  let leftHandKey = null;

  if (!nextKey) {
    return [null, null];
  }
  if (nextKey && nextKey.hand === "right") {
    rightHandKey = nextKey;
    if (nextCharUpperCased) {
      leftHandKey = getShiftKey(nextKey);
    }
  } else {
    leftHandKey = nextKey;
    if (nextCharUpperCased) {
      rightHandKey = getShiftKey(nextKey);
    }
  }

  return [leftHandKey, rightHandKey];
};

export default useNextKey;
