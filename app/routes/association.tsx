import { useTranslation } from "react-i18next";
import { team } from "~/lib/content";
import { Separator } from "~/components/ui/separator";
import type { Person } from "~/lib/team";

function roleLabel(key: string, t: (k: string) => string): string {
    return t(`association.roles.${key}`);
}

function gradeLabel(key: string, t: (k: string) => string): string {
    return t(`association.grades.${key}`);
}

function PersonList({ people, t }: { people: Person[]; t: (k: string) => string }) {
    return (
        <div className="flex flex-col gap-4">
            {people.map((person) => (
                <div key={person.name} className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                        {person.image && (
                            <img
                                src={person.image}
                                alt={person.name}
                                className="mr-1 -ml-1 size-10 shrink-0 self-center rounded-full object-cover"
                            />
                        )}
                        <span className="font-medium">{person.name}</span>
                        {person.grade && <span className="text-sm text-muted-foreground">{gradeLabel(person.grade, t)}</span>}
                        {person.period && <span className="text-sm text-muted-foreground">{person.period}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {person.roles.map((role) => roleLabel(role, t)).join(" · ")}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default function Association() {
    const { t } = useTranslation();
    return (
        <div className="mx-auto max-w-5xl px-4 py-12">
            <h1 className="font-heading text-3xl font-semibold tracking-tight">{t("association.title")}</h1>

            <section className="mt-8 flex flex-col gap-4">
                <h2 className="font-heading text-2xl font-semibold">{t("association.foundersTitle")}</h2>
                <PersonList people={team.founders} t={t} />
            </section>

            <Separator className="my-10" />

            <section className="flex flex-col gap-4">
                <h2 className="font-heading text-2xl font-semibold">{t("association.membersTitle")}</h2>
                <PersonList people={team.members} t={t} />
            </section>

            <Separator className="my-10" />

            <section className="flex flex-col gap-4">
                <h2 className="font-heading text-2xl font-semibold">{t("association.alumniTitle")}</h2>
                <PersonList people={team.alumni} t={t} />
            </section>
        </div>
    );
}
