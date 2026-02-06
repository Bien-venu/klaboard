import { useTranslation } from "react-i18next";

type Language = {
  code: string;
  labelKey: string;
};

const LANGUAGES: Language[] = [
  { code: "en", labelKey: "language.english" },
  { code: "fr", labelKey: "language.french" },
];

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const isActive = (code: string) => i18n.language?.startsWith(code);

  const handleChange = (code: string) => {
    if (!isActive(code)) {
      i18n.changeLanguage(code);
    }
  };

  return (
    <div
      role="tablist"
      aria-label={t("language.switcher")}
      className="border-border bg-muted/30 border-text/10 inline-flex items-center gap-1 rounded-lg border p-1"
    >
      {LANGUAGES.map(({ code, labelKey }) => {
        const active = isActive(code);

        return (
          <button
            key={code}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => handleChange(code)}
            className={[
              "rounded-lg px-2 py-1 text-xs font-medium transition-all",
              "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
              active
                ? "bg-background text-text shadow-xs"
                : "text-muted-foreground hover:bg-muted hover:text-text",
            ].join(" ")}
          >
            {t(labelKey)}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
