import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { getLocaleMetadata, isLanguageCode, type LanguageCode } from "@/lib/metadata";

export default async function LanguageLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
    const { lang: rawLang } = await params;
    if (!isLanguageCode(rawLang)) notFound();
    const lang = rawLang as LanguageCode;
    const messages = await getLocaleMetadata(lang);
    return (
        <div className="flex min-h-svh flex-col">
            <SiteHeader lang={lang} messages={messages} />
            <main className="flex-1">{children}</main>
            <SiteFooter lang={lang} />
        </div>
    );
}
