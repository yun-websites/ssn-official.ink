import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Headphones } from "lucide-react";
import { getLocaleMetadata, getPodcastsMetadata, isLanguageCode, message, type LanguageCode } from "@/lib/metadata";

export default async function PodcastSeriesPage({ params }: { params: Promise<{ lang: string; seriesId: string }> }) {
    const { lang: rawLang, seriesId } = await params;
    if (!isLanguageCode(rawLang)) notFound();
    const lang = rawLang as LanguageCode;
    const [messages, podcasts] = await Promise.all([getLocaleMetadata(lang), getPodcastsMetadata()]);
    const series = podcasts.series.find((item) => item.id === seriesId);
    if (!series) notFound();

    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            <Link
                href={`/${lang}/podcasts`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="size-4" />
                {message(messages, "podcasts.backToSeries")}
            </Link>
            <header className="mt-8 border-b pb-8">
                <h1 className="font-heading text-3xl font-semibold">{series.title[lang]}</h1>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{series.description[lang]}</p>
            </header>
            <section className="pt-8">
                <h2 className="font-heading text-xl font-semibold">{message(messages, "podcasts.episodesLabel")}</h2>
                {series.episodes.length ? (
                    <ol className="mt-4 divide-y">
                        {series.episodes.map((episode, index) => (
                            <li key={episode.id} className="flex items-start gap-4 py-5">
                                <span className="w-8 shrink-0 pt-1 text-sm text-muted-foreground tabular-nums">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-medium">{episode.title[lang]}</h3>
                                    {episode.description && (
                                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                            {episode.description[lang]}
                                        </p>
                                    )}
                                    <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                                        {episode.publishedAt && (
                                            <time dateTime={episode.publishedAt}>{episode.publishedAt}</time>
                                        )}
                                        {episode.duration && <span>{episode.duration}</span>}
                                    </div>
                                </div>
                                {episode.url && (
                                    <a
                                        href={episode.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={episode.title[lang]}
                                        title={episode.title[lang]}
                                        className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground">
                                        <Headphones className="size-4" />
                                    </a>
                                )}
                            </li>
                        ))}
                    </ol>
                ) : (
                    <p className="py-8 text-sm text-muted-foreground">{message(messages, "podcasts.noEpisodes")}</p>
                )}
            </section>
        </div>
    );
}
