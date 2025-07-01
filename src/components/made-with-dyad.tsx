import { useTranslation } from "react-i18next"; // Import useTranslation

export const MadeWithDyad = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  return (
    <div className="p-4 text-center">
      <a
        href="https://www.dyad.sh/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-red-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        {t("made_with_shri")}
      </a>
    </div>
  );
};