// Generates app/lib/icons.json containing ONLY the icons used on the site.
// Run after changing usedIcons:  pnpm icons
import { readFileSync, writeFileSync } from "node:fs"
import { getIconData } from "@iconify/utils"

// Only the icons actually used on the site. To add another:
//   1. Install its JSON package, e.g.  pnpm add -D @iconify-json/logos
//   2. Add the name here, e.g. "logos:apple"
//   3. Run  pnpm icons
const usedIcons = ["logos:apple", "logos:spotify-icon"]

const collections = {}
const result = {}

for (const name of usedIcons) {
    const [prefix, iconName] = name.split(":")
    if (!collections[prefix]) {
        collections[prefix] = JSON.parse(
            readFileSync(new URL(`../node_modules/@iconify-json/${prefix}/icons.json`, import.meta.url), "utf8"),
        )
    }
    const icon = getIconData(collections[prefix], iconName)
    if (!icon) {
        console.error(`Icon not found: ${name}`)
        process.exit(1)
    }
    result[prefix] ??= { prefix, icons: {} }
    result[prefix].icons[iconName] = icon
}

const out = new URL("../app/lib/icons.json", import.meta.url)
writeFileSync(out, JSON.stringify(result))
console.log(`Wrote ${out.pathname} with ${usedIcons.length} icons`)
