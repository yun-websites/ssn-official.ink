import iconData from "@/lib/platform-icons.json";

type IconDefinition = { width: number; height: number; body: string };
type IconCollection = { icons: Record<string, IconDefinition> };

const collection = (iconData as { logos: IconCollection }).logos;

export function PlatformIcon({ icon }: { icon: string }) {
    const iconName = icon.split(",")[0];
    const [, name] = iconName.split(":");
    const definition = collection.icons[name];
    if (!definition) return null;
    const useTextColor = icon.split(",")[1] === "true";
    const body = useTextColor ? `<g fill="currentColor">${definition.body.replace(/fill\\s*=\\s*(["'])[^"']*\\1/g, "")}</g>` : definition.body;
    return <svg aria-hidden="true" focusable="false" viewBox={`0 0 ${definition.width} ${definition.height}`} className={`size-4 shrink-0 ${useTextColor ? "text-foreground" : ""}`} dangerouslySetInnerHTML={{ __html: body }} />;
}
