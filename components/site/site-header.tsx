import { SiteHeaderClient } from "@/components/site/site-header-client";
import { getSiteMetadata, type LanguageCode, type MessageTree } from "@/lib/metadata";

export async function SiteHeader({ lang, messages }: { lang: LanguageCode; messages: MessageTree }) {
    const site = await getSiteMetadata();
    return <SiteHeaderClient lang={lang} messages={messages} shortName={site.shortName} name={site.name} />;
}
