import type { Metadata } from "next";
import "./../styles/globals.scss";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "@/components/molecules/AppSidebar";

export const metadata: Metadata = {
  title: "PitFriend",
  description: "A driving simulator analysis platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body>
        <SidebarProvider>
          <AppSidebar />
          <main className={"flex flex-col bg-stone-100 p-2 w-full"}>
            <SidebarTrigger />
            <section className="flex-1 grid grid-cols-1 w-full">
              {children}
            </section>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
