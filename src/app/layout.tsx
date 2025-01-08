import Header from "@/components/Header";
import {Toaster} from "@/components/ui/toaster";
import {ClerkProvider} from "@clerk/nextjs";
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {ConvexClientProvider} from "./ConvexClientProvider";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		template: "%s | File drive",
		default: "File drive",
	},
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
					<ConvexClientProvider>
						<Header />
						{children}
						<Toaster />
					</ConvexClientProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
