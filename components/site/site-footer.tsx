import { getLocaleMetadata, getSiteMetadata, message, type LanguageCode } from "@/lib/metadata";

export async function SiteFooter({ lang }: { lang: LanguageCode }) {
    const [site, messages] = await Promise.all([getSiteMetadata(), getLocaleMetadata(lang)]);
    return (
        <footer className="border-t py-8">
            <div className="mx-auto max-w-5xl px-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{site.shortName} — {site.name}</p>
                <p>{message(messages, "footer.tagline")}</p>
                <p className="mt-2">© {new Date().getFullYear()} {site.name}</p>
            </div>
        </footer>
    );
}
