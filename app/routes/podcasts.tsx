import { useTranslation } from "react-i18next";
import { site, episodes } from "~/lib/content";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

function formatDate(date: string) {
    return new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default function Podcasts() {
    const { t } = useTranslation();
    const latest = episodes.latest;
    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            <h1 className="font-heading text-3xl font-semibold tracking-tight">{t("podcasts.title")}</h1>

            <section className="mt-8 flex flex-col gap-4">
                <Badge className="w-fit">{t("podcasts.latestLabel")}</Badge>
                <Card>
                    <CardHeader>
                        {latest.image && (
                            <img
                                src={latest.image}
                                alt={`${latest.series} — ${latest.title}`}
                                className="aspect-square w-full max-w-xs rounded-lg object-cover"
                            />
                        )}
                        <CardTitle className="font-heading text-2xl">
                            {latest.series} — {latest.title}
                        </CardTitle>
                        <CardDescription>
                            EPISODE {latest.number} · {formatDate(latest.date)}
                            {latest.duration ? ` · ${latest.duration}` : ""}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        <p className="leading-loose text-muted-foreground">{latest.description}</p>
                        {latest.url && (
                            <a
                                href={latest.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-medium text-primary underline underline-offset-4">
                                {t("podcasts.listenOn", { platform: site.platforms[0]?.name ?? "" })}
                            </a>
                        )}
                    </CardContent>
                </Card>
            </section>

            <Separator className="my-10" />

            <section className="flex flex-col gap-4">
                <h2 className="font-heading text-2xl font-semibold">{t("podcasts.episodesLabel")}</h2>
                <div className="flex flex-col gap-4">
                    {episodes.episodes.map((ep) => (
                        <Card key={`${ep.number}-${ep.date}`}>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                {ep.image && (
                                    <img
                                        src={ep.image}
                                        alt={`${ep.series} — ${ep.title}`}
                                        className="aspect-square w-full max-w-40 shrink-0 rounded-lg object-cover sm:my-6 sm:ml-6"
                                    />
                                )}
                                <div className="flex-1">
                                    <CardHeader>
                                        <CardTitle className="font-heading text-xl">
                                            {ep.series} — {ep.title}
                                        </CardTitle>
                                        <CardDescription>
                                            EPISODE {ep.number} · {formatDate(ep.date)}
                                            {ep.duration ? ` · ${ep.duration}` : ""}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{ep.description}</p>
                                        {ep.url && (
                                            <a
                                                href={ep.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="mt-2 inline-block text-sm font-medium text-primary underline underline-offset-4">
                                                {t("podcasts.listenOn", { platform: site.platforms[0]?.name ?? "" })}
                                            </a>
                                        )}
                                    </CardContent>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
