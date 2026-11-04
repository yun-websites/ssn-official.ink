import "./globals.css";
import type { Metadata } from "next";
import siteData from "@/content/site/site.json";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: {
        default: siteData.shortName,
        template: `%s | ${siteData.shortName}`,
    },
    description: siteData.description,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="zh-CN"
            suppressHydrationWarning
            className={cn(
                "antialiased",
                "font-serif"
            )}>
            <body>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
}
