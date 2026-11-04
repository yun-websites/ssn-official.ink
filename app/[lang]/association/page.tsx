import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { getLocaleMetadata, getTeamMetadata, isLanguageCode, message, type LanguageCode, type PersonMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang: rawLang } = await params;
    if (!isLanguageCode(rawLang)) notFound();
    const messages = await getLocaleMetadata(rawLang);
    return { title: message(messages, "association.title") };
}

function sortedByName(people: PersonMetadata[]) {
    return [...people].sort((a, b) => a.name.localeCompare(b.name));
}

function sortedAlumni(people: PersonMetadata[]) {
    return [...people].sort((a, b) => {
        const year = (period?: string) => Number(period?.match(/\d{4}/)?.[0] ?? Number.POSITIVE_INFINITY);
        return year(a.period) - year(b.period) || a.name.localeCompare(b.name);
    });
}

function PersonList({ people, messages }: { people: PersonMetadata[]; messages: Awaited<ReturnType<typeof getLocaleMetadata>> }) {
    return (
        <div className="grid gap-x-8 gap-y-4 lg:grid-cols-2">
            {people.map((person) => (
                <div key={person.name} className="flex gap-1">
                    {person.image && <Image src={person.image} alt={person.name} width={40} height={40} className="mr-1 -ml-1 size-10 shrink-0 self-center rounded-full object-cover" />}
                    <div className="flex flex-col items-baseline">
                        <span className="flex items-baseline gap-2 font-medium">
                            {person.name}
                            {person.grade && <span className="text-sm text-muted-foreground">{message(messages, `association.grades.${person.grade}`)}</span>}
                            {person.period && <span className="text-sm text-muted-foreground">{person.period}</span>}
                        </span>
                        <p className="-translate-y-px text-sm text-muted-foreground">{person.roles.map((role) => message(messages, `association.roles.${role}`)).join(" · ")}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default async function Association({ params }: { params: Promise<{ lang: string }> }) {
    const { lang: rawLang } = await params;
    if (!isLanguageCode(rawLang)) notFound();
    const lang = rawLang as LanguageCode;
    const [messages, team] = await Promise.all([getLocaleMetadata(lang), getTeamMetadata()]);
    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            <h1 className="font-heading text-3xl font-semibold">{message(messages, "association.title")}</h1>
            <section className="mt-8 flex flex-col gap-4">
                <h2 className="font-heading text-2xl font-semibold">{message(messages, "association.foundersTitle")}</h2>
                <PersonList people={sortedByName(team.founders)} messages={messages} />
            </section>
            <Separator className="my-10" />
            <section className="flex flex-col gap-4">
                <h2 className="font-heading text-2xl font-semibold">{message(messages, "association.membersTitle")}</h2>
                <PersonList people={sortedByName(team.members)} messages={messages} />
            </section>
            {team.alumni.length > 0 && <>
                <Separator className="my-10" />
                <section className="flex flex-col gap-4">
                    <h2 className="font-heading text-2xl font-semibold">{message(messages, "association.alumniTitle")}</h2>
                    <PersonList people={sortedAlumni(team.alumni)} messages={messages} />
                </section>
            </>}
        </div>
    );
}
