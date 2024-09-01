import type { Metadata } from "next";
import "./globals.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import QueryProvider from "@/lib/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata: Metadata = {
  title: "Platypus",
  description: "Platypus platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications />
          <QueryProvider>
            <ReactQueryDevtools initialIsOpen={false} />

            {children}
          </QueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
