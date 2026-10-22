import { useTranslation } from "react-i18next";
import { site } from "~/lib/content";

export function SiteFooter() {
    const { t } = useTranslation();
    return (
        <footer className="border-t py-8">
            <div className="mx-auto max-w-5xl px-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">
                    {site.shortName} — {site.name}
                </p>
                <p>{t("footer.tagline")}</p>
                <p className="mt-2">
                    © {new Date().getFullYear()} {site.name}
                </p>
            </div>
        </footer>
    );
}
