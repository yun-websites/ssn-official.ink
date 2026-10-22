import { useTranslation } from "react-i18next";
import { languages, rememberLanguage, type LanguageCode } from "~/i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { LanguagesIcon } from "lucide-react";

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    return (
        <Select
            value={i18n.language}
            onValueChange={(value) => {
                rememberLanguage(value as LanguageCode);
                void i18n.changeLanguage(value as LanguageCode);
            }}>
            <SelectTrigger className="w-38" aria-label="Language">
                <div className="flex items-center gap-2">
                    <LanguagesIcon />
                    {languages.find((i) => i.code === i18n.language)?.label ?? i18n.language}
                </div>
            </SelectTrigger>
            <SelectContent>
                {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                        {lang.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
