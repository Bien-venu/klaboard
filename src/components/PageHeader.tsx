import { useTranslation } from "react-i18next";

const PageHeader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col px-4 lg:px-6">
      <h1 className="text-2xl">{t("pageHeader.title")}</h1>
      <p className="text-text/70">{t("pageHeader.subtitle")}</p>
    </div>
  );
}

export default PageHeader