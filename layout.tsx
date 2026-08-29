import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://makascarelifestyle.com"),
  title: { default: "Makascare Lifestyle | Wellness. Quality. You.", template: "%s | Makascare Lifestyle" },
  description: "Curated wellness, beauty and self-care supplements with personal support and nationwide delivery across Nigeria.",
  keywords: ["Makascare Lifestyle","supplements Nigeria","wellness Nigeria","collagen","vitamins","beauty supplements"],
  openGraph: { title:"Makascare Lifestyle", description:"Wellness. Quality. You.", type:"website", locale:"en_NG" },
  robots: { index:true, follow:true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-NG"><body>{children}</body></html>;
}
