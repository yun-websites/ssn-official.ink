import { useTranslation } from "react-i18next";
import { site, quotes } from "~/lib/content";
import { PlatformIcon } from "~/components/platform-icon";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export default function Home() {
    const { t } = useTranslation();
    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            <div className="flex flex-col gap-4">
                <Badge variant="secondary" className="w-fit">
                    {t("home.badge")}
                </Badge>
                <div className="flex items-center gap-4">
                    <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">{t("home.heroTitle")}</h1>
                </div>
                <p className="max-w-2xl leading-loose whitespace-pre-line text-muted-foreground">{t("home.heroDescription")}</p>
            </div>

            <Separator className="my-10" />

            <section className="flex flex-col gap-4">
                <h2 className="font-heading text-2xl font-semibold">{t("home.quotesTitle")}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    {quotes.quotes.map((q) => (
                        <Card key={q.name}>
                            <CardHeader>
                                <CardTitle className="font-serif text-base leading-relaxed font-normal">“{q.quote}”</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">— {q.name}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <Separator className="my-10" />

            <section className="flex flex-col gap-4">
                <h2 className="font-heading text-2xl font-semibold">{t("home.listenTitle")}</h2>
                <p className="text-sm text-muted-foreground">{t("home.listenHint")}</p>
                <div className="flex flex-wrap gap-3">
                    {site.platforms.map((platform) => (
                        <a
                            key={platform.name}
                            href={platform.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-10 items-center gap-2 rounded-lg border border-input px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                            <PlatformIcon name={platform.icon} />
                            {platform.name}
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}
