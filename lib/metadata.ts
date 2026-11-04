import siteData from "@/content/site/site.json";
import teamData from "@/content/site/team.json";
import quotesData from "@/content/site/quotes.json";

export interface PlatformMetadata {
    name: string;
    icon: string;
    url: string;
}

export interface SiteMetadata {
    name: string;
    shortName: string;
    tagline: string;
    founded: string;
    description: string;
    platforms: PlatformMetadata[];
    contact: { emails: string[]; showTeams: boolean };
}

export interface PersonMetadata {
    name: string;
    grade?: string;
    period?: string;
    roles: string[];
    image?: string;
}

export interface TeamMetadata {
    founders: PersonMetadata[];
    members: PersonMetadata[];
    alumni: PersonMetadata[];
}

export interface QuoteMetadata {
    name: string;
    quote: string;
}

export interface QuotesMetadata {
    quotes: QuoteMetadata[];
}

// Page code depends on these accessors, not the storage format or provider.
export async function getSiteMetadata(): Promise<SiteMetadata> {
    return siteData;
}

export async function getTeamMetadata(): Promise<TeamMetadata> {
    return teamData;
}

export async function getQuotesMetadata(): Promise<QuotesMetadata> {
    return quotesData;
}

export type LanguageCode = "zh-CN" | "en-GB";
export type MessageTree = { [key: string]: string | MessageTree };

const localeLoaders: Record<LanguageCode, () => Promise<{ default: MessageTree }>> = {
    "zh-CN": () => import("@/content/locales/zh-CN.json"),
    "en-GB": () => import("@/content/locales/en-GB.json"),
};

export async function getLocaleMetadata(language: LanguageCode): Promise<MessageTree> {
    return (await localeLoaders[language]()).default;
}

export const supportedLanguages: LanguageCode[] = ["zh-CN", "en-GB"];

export function isLanguageCode(value: string): value is LanguageCode {
    return supportedLanguages.includes(value as LanguageCode);
}

export function message(messages: MessageTree, path: string): string {
    const value = path.split(".").reduce<string | MessageTree | undefined>(
        (current, key) => (typeof current === "object" && current ? current[key] : undefined),
        messages,
    );
    return typeof value === "string" ? value : path;
}

export function translate(messages: MessageTree, path: string, values: Record<string, string> = {}): string {
    return Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{{${key}}}`, value), message(messages, path));
}
