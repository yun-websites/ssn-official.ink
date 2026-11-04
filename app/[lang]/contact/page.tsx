import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLocaleMetadata, getSiteMetadata, isLanguageCode, message, type LanguageCode } from "@/lib/metadata";

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: rawLang } = await params;
    if (!isLanguageCode(rawLang)) notFound();
    const lang = rawLang as LanguageCode;
    const [messages, site] = await Promise.all([getLocaleMetadata(lang), getSiteMetadata()]);
    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            <h1 className="font-heading text-3xl font-semibold">{message(messages, "contact.title")}</h1>
            <p className="mt-4 text-lg leading-loose text-muted-foreground">{message(messages, "contact.lead")}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Card>
                    <CardHeader><CardTitle className="font-heading text-xl">{message(messages, "contact.emailLabel")}</CardTitle></CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        {site.contact.emails.map((email) => <a key={email} href={`mailto:${email}`} className="text-sm font-medium text-primary underline underline-offset-4">{email}</a>)}
                    </CardContent>
                </Card>
                {site.contact.showTeams && <Card>
                    <CardHeader>
                        <CardTitle className="font-heading text-xl">{message(messages, "contact.teamsLabel")}</CardTitle>
                        <CardDescription>{message(messages, "contact.teamsHint")}</CardDescription>
                    </CardHeader>
                </Card>}
            </div>
        </div>
    );
}
