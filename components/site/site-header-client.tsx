"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Languages, Moon, Settings2, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { message, type LanguageCode, type MessageTree } from "@/lib/metadata";

const navItems = [
    ["", "nav.home"],
    ["association", "nav.association"],
    ["contact", "nav.contact"],
] as const;
const languages: { code: LanguageCode; label: string }[] = [
    { code: "zh-CN", label: "简体中文" },
    { code: "en-GB", label: "English (UK)" },
];
const subscribeToMount = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function getLocalizedPath(pathname: string, language: LanguageCode) {
    const path = pathname.replace(/^\/(zh-CN|en-GB)(?=\/|$)/, "");
    return `/${language}${path}`;
}

export function SiteHeaderClient({ lang, messages, shortName, name }: { lang: LanguageCode; messages: MessageTree; shortName: string; name: string }) {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, resolvedTheme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(subscribeToMount, getClientSnapshot, getServerSnapshot);
    const isDark = mounted && resolvedTheme === "dark";
    const selectedTheme = mounted ? theme ?? "system" : "system";
    const themeLabel = message(messages, isDark ? "theme.switchToLight" : "theme.switchToDark");

    function changeLanguage(value: string | null) {
        if (value && (value === "zh-CN" || value === "en-GB")) {
            router.push(getLocalizedPath(pathname, value));
        }
    }

    const nav = (mobile = false) => navItems.map(([path, key]) => {
        const href = `/${lang}${path ? `/${path}` : ""}`;
        const active = path ? pathname === href || pathname.startsWith(`${href}/`) : pathname === `/${lang}`;
        return <Link key={key} href={href} aria-current={active ? "page" : undefined} className={`${mobile ? "whitespace-nowrap" : ""} rounded-md px-3 py-2 text-sm transition-colors ${active ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {message(messages, key)}
        </Link>;
    });

    return <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto grid h-16 max-w-5xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <Link href={`/${lang}`} className="flex min-w-0 items-center gap-3">
                <Image src="/logo.webp" alt="" width={40} height={40} className="size-10 shrink-0 rounded-md object-cover" />
                <span className="flex min-w-0 flex-col leading-tight">
                    <span className="font-heading text-lg font-semibold">{shortName}</span>
                    <span className="truncate text-xs text-muted-foreground">{name}</span>
                </span>
            </Link>
            <nav aria-label="Main navigation" className="hidden items-center justify-self-center gap-1 md:flex">{nav()}</nav>
            <div className="hidden items-center justify-self-end gap-1 md:col-start-3 md:flex">
                <Button variant="outline" size="icon" type="button" aria-label={themeLabel} title={themeLabel} onClick={() => setTheme(isDark ? "light" : "dark")}>
                    {isDark ? <Sun /> : <Moon />}
                </Button>
                <Select value={lang} onValueChange={changeLanguage}>
                    <SelectTrigger className="size-8 justify-center p-0 [&>svg:last-child]:hidden" aria-label={message(messages, "preferences.language")}>
                        <Languages />
                    </SelectTrigger>
                    <SelectContent align="end">
                        {languages.map((language) => <SelectItem key={language.code} value={language.code}>{language.label}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <Dialog>
                <DialogTrigger render={<Button variant="outline" size="icon" type="button" aria-label={message(messages, "preferences.title")} className="justify-self-end md:hidden"><Settings2 /></Button>} />
                <DialogContent>
                    <DialogHeader><DialogTitle>{message(messages, "preferences.title")}</DialogTitle></DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label>{message(messages, "preferences.language")}</Label>
                            <Select value={lang} onValueChange={changeLanguage}>
                                <SelectTrigger className="w-full">{languages.find((language) => language.code === lang)?.label}</SelectTrigger>
                                <SelectContent alignItemWithTrigger={false}>
                                    {languages.map((language) => <SelectItem key={language.code} value={language.code}>{language.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <Label>{message(messages, "preferences.theme")}</Label>
                            <Select value={selectedTheme} onValueChange={(value) => setTheme(value ?? "system")}>
                                <SelectTrigger className="w-full">{message(messages, `preferences.${selectedTheme}`)}</SelectTrigger>
                                <SelectContent alignItemWithTrigger={false}>
                                    <SelectItem value="system">{message(messages, "preferences.system")}</SelectItem>
                                    <SelectItem value="light">{message(messages, "preferences.light")}</SelectItem>
                                    <SelectItem value="dark">{message(messages, "preferences.dark")}</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                </DialogContent>
            </Dialog>
        </div>
        <nav aria-label="Main navigation" className="flex items-center gap-1 overflow-x-auto px-4 pb-2 md:hidden">{nav(true)}</nav>
    </header>;
}
