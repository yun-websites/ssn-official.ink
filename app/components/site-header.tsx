import { Link, NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { site } from "~/lib/content";
import { LanguageSwitcher } from "~/components/language-switcher";

const navItems = [
    { to: "/", key: "nav.home" },
    { to: "/podcasts", key: "nav.podcasts" },
    { to: "/association", key: "nav.association" },
    { to: "/contact", key: "nav.contact" },
] as const;

export function SiteHeader() {
    const { t } = useTranslation();
    return (
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
                <Link to="/" className="flex items-center gap-3">
                    <img src="/logo.webp" alt="" width={40} height={40} className="size-10 shrink-0 rounded-md object-cover" />
                    <span className="flex flex-col leading-tight">
                        <span className="font-heading text-lg font-semibold">{site.shortName}</span>
                        <span className="text-xs text-muted-foreground">{site.name}</span>
                    </span>
                </Link>
                <nav className="hidden items-center gap-1 sm:flex">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.key}
                            to={item.to}
                            className={({ isActive }) =>
                                `rounded-md px-3 py-2 text-sm transition-colors ${
                                    isActive
                                        ? "bg-accent font-medium text-accent-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                }`
                            }>
                            {t(item.key)}
                        </NavLink>
                    ))}
                </nav>
                <LanguageSwitcher />
            </div>
            <nav className="flex items-center gap-1 overflow-x-auto px-4 pb-2 sm:hidden">
                {navItems.map((item) => (
                    <NavLink
                        key={item.key}
                        to={item.to}
                        className={({ isActive }) =>
                            `rounded-md px-3 py-2 text-sm whitespace-nowrap transition-colors ${
                                isActive
                                    ? "bg-accent font-medium text-accent-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`
                        }>
                        {t(item.key)}
                    </NavLink>
                ))}
            </nav>
        </header>
    );
}
