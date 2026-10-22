import { useTranslation } from "react-i18next";
import { site } from "~/lib/content";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

export default function Contact() {
    const { t } = useTranslation();
    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            <h1 className="font-heading text-3xl font-semibold tracking-tight">{t("contact.title")}</h1>
            <p className="mt-4 text-lg leading-loose text-muted-foreground">{t("contact.lead")}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-heading text-xl">{t("contact.emailLabel")}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        {site.contact.emails.map((email) => (
                            <a
                                key={email}
                                href={`mailto:${email}`}
                                className="text-sm font-medium text-primary underline underline-offset-4">
                                {email}
                            </a>
                        ))}
                    </CardContent>
                </Card>

                {site.contact.showTeams && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-heading text-xl">{t("contact.teamsLabel")}</CardTitle>
                            <CardDescription>{t("contact.teamsHint")}</CardDescription>
                        </CardHeader>
                    </Card>
                )}
            </div>
        </div>
    );
}
