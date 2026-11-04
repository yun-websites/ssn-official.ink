import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { supportedLanguages, type LanguageCode } from "@/lib/metadata";

function getPreferredLanguage(acceptLanguage: string | null): LanguageCode {
    const preferences = (acceptLanguage ?? "")
        .split(",")
        .map((preference) => {
            const [language, quality = "q=1"] = preference.trim().split(";");
            return { language: language.toLowerCase(), quality: Number(quality.replace(/^q=/, "")) };
        })
        .filter(({ quality }) => quality > 0 && Number.isFinite(quality))
        .sort((a, b) => b.quality - a.quality);

    for (const { language } of preferences) {
        if (language === "zh" || language.startsWith("zh-")) return "zh-CN";
        if (language === "en" || language.startsWith("en-")) return "en-GB";
    }

    return supportedLanguages[0];
}

export default async function Home() {
    const acceptLanguage = (await headers()).get("accept-language");
    redirect(`/${getPreferredLanguage(acceptLanguage)}`);
}
