import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Headphones } from "lucide-react";
import { getLocaleMetadata, getPodcastsMetadata, isLanguageCode, message, type LanguageCode } from "@/lib/metadata";

type PodcastEpisodeParams = { lang: string; seriesId: string; podcastId: string };

export async function generateMetadata({ params }: { params: Promise<PodcastEpisodeParams> }): Promise<Metadata> {
    const { lang: rawLang, seriesId, podcastId } = await params;
    if (!isLanguageCode(rawLang)) notFound();
    const [messages, podcasts] = await Promise.all([getLocaleMetadata(rawLang), getPodcastsMetadata()]);
    const series = podcasts.series.find((item) => item.id === seriesId);
    const episode = series?.episodes.find((item) => item.id === podcastId);
    if (!series || !episode) notFound();
    const title = episode.title[rawLang];
    return { title: title ? `${title} | ${series.title[rawLang]}` : message(messages, "podcasts.title") };
}

export default async function PodcastEpisodePage({
    params,
}: {
    params: Promise<PodcastEpisodeParams>;
}) {
    const { lang: rawLang, seriesId, podcastId } = await params;
    if (!isLanguageCode(rawLang)) notFound();
    const lang = rawLang as LanguageCode;
    const [messages, podcasts] = await Promise.all([getLocaleMetadata(lang), getPodcastsMetadata()]);
    const series = podcasts.series.find((item) => item.id === seriesId);
    const episode = series?.episodes.find((item) => item.id === podcastId);
    if (!series || !episode) notFound();

    return (
        <article className="mx-auto max-w-5xl px-4 py-12">
            <Link
                href={`/${lang}/podcast/${series.id}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="size-4" />
                {series.title[lang]}
            </Link>
            <header className="mt-8 max-w-3xl">
                <p className="text-sm text-muted-foreground">{series.title[lang]}</p>
                <h1 className="mt-2 font-heading text-3xl font-semibold">{episode.title[lang]}</h1>
                {episode.description && <p className="mt-4 leading-relaxed text-muted-foreground">{episode.description[lang]}</p>}
                <div className="mt-4 flex gap-4 text-sm text-muted-foreground">
                    {episode.publishedAt && <time dateTime={episode.publishedAt}>{episode.publishedAt}</time>}
                    {episode.duration && <span>{episode.duration}</span>}
                </div>
            </header>
            {episode.url && (
                <a
                    href={episode.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex h-10 items-center gap-2 rounded-md border border-input px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                    <Headphones className="size-4" />
                    {message(messages, "podcasts.listenEpisode")}
                </a>
            )}
        </article>
    );
}
