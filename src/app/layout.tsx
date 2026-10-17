import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, EB_Garamond } from "next/font/google";
import localFont from "next/font/local";
import { invitation } from "@/config/invitation";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = EB_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const zaken = localFont({
  src: "../../assets/fonts/ZakenManus.otf",
  variable: "--font-zaken",
  display: "swap",
});

const petitFleur = localFont({
  src: "../../assets/fonts/PetitFleur.ttf",
  variable: "--font-petit-fleur",
  display: "swap",
});

const bella = localFont({
  src: "../../assets/fonts/Bellanork-Demo.otf",
  variable: "--font-bella",
  display: "swap",
})

const metadataBase = new URL(
  process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000",
);

export const metadata: Metadata = {
  metadataBase,
  title: invitation.sharing.title,
  description: invitation.sharing.description,
  applicationName: invitation.sharing.title,
  robots: { index: false, follow: false },
  openGraph: {
    title: invitation.sharing.title,
    description: invitation.sharing.description,
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: invitation.sharing.title,
    description: invitation.sharing.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#1a100c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${display.variable} ${body.variable} ${zaken.variable} ${petitFleur.variable} ${bella.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
