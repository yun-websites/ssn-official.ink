import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlatformIcon } from "@/components/site/platform-icon";
import { getLocaleMetadata, getQuotesMetadata, getSiteMetadata, isLanguageCode, message, type LanguageCode } from "@/lib/metadata";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: rawLang } = await params;
    if (!isLanguageCode(rawLang)) notFound();
    const lang = rawLang as LanguageCode;
    const [messages, site, quotes] = await Promise.all([getLocaleMetadata(lang), getSiteMetadata(), getQuotesMetadata()]);
    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            <div className="flex flex-col gap-4">
                <Badge variant="secondary" className="w-fit">{message(messages, "home.badge")}</Badge>
                <h1 className="font-heading text-4xl font-semibold sm:text-5xl">{message(messages, "home.heroTitle")}</h1>
                <p className="max-w-2xl leading-loose whitespace-pre-line text-muted-foreground">{message(messages, "home.heroDescription")}</p>
            </div>
            <Separator className="my-10" />
            <section className="flex flex-col gap-4">
                <h2 className="font-heading text-2xl font-semibold">{message(messages, "home.quotesTitle")}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {quotes.quotes.map((quote) => (
                        <Card key={quote.name}>
                            <CardHeader><CardTitle className="font-serif text-base leading-relaxed font-normal">“{quote.quote}”</CardTitle></CardHeader>
                            <CardContent><p className="text-sm text-muted-foreground">— {quote.name}</p></CardContent>
                        </Card>
                    ))}
                </div>
            </section>
            <Separator className="my-10" />
            <section className="flex flex-col gap-4">
                <h2 className="font-heading text-2xl font-semibold">{message(messages, "home.listenTitle")}</h2>
                <p className="text-sm text-muted-foreground">{message(messages, "home.listenHint")}</p>
                <div className="flex flex-wrap gap-3">
                    {site.platforms.map((platform) => (
                        <a key={platform.name} href={platform.url} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-md border border-input px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                            <PlatformIcon icon={platform.icon} />{platform.name}
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}
