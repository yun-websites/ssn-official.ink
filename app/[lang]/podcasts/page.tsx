import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Headphones } from "lucide-react";
import { getLocaleMetadata, getPodcastsMetadata, isLanguageCode, message, translate, type LanguageCode } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang: rawLang } = await params;
    if (!isLanguageCode(rawLang)) notFound();
    const messages = await getLocaleMetadata(rawLang);
    return { title: message(messages, "podcasts.title") };
}

export default async function PodcastsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: rawLang } = await params;
    if (!isLanguageCode(rawLang)) notFound();
    const lang = rawLang as LanguageCode;
    const [messages, podcasts] = await Promise.all([getLocaleMetadata(lang), getPodcastsMetadata()]);

    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            <header className="flex flex-col gap-3 border-b pb-8">
                <h1 className="font-heading text-3xl font-semibold">{message(messages, "podcasts.title")}</h1>
                <p className="max-w-2xl leading-relaxed text-muted-foreground">
                    {message(messages, "podcasts.overviewDescription")}
                </p>
            </header>
            {podcasts.series.length ? (
                <ul className="divide-y">
                    {podcasts.series.map((series) => (
                        <li key={series.id}>
                            <Link
                                href={`/${lang}/podcast/${series.id}`}
                                className="group flex items-center justify-between gap-4 py-6">
                                <span className="flex min-w-0 items-start gap-4">
                                    <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-muted">
                                        <Headphones className="size-5" />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block font-heading text-lg font-semibold group-hover:underline">
                                            {series.title[lang]}
                                        </span>
                                        <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                                            {series.description[lang]}
                                        </span>
                                        <span className="mt-2 block text-xs text-muted-foreground">
                                            {translate(messages, "podcasts.episodeCount", {
                                                count: String(series.episodes.length),
                                            })}
                                        </span>
                                    </span>
                                </span>
                                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex flex-col items-center gap-3 py-20 text-center">
                    <Headphones className="size-8 text-muted-foreground" />
                    <h2 className="font-heading text-xl font-semibold">{message(messages, "podcasts.emptyTitle")}</h2>
                    <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                        {message(messages, "podcasts.emptyDescription")}
                    </p>
                </div>
            )}
        </div>
    );
}
