import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/organisms/AppSidebar";
import Navbar from "@/components/organisms/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // Todo fix hydratation issue
    // <ThemeProvider
    //   attribute="class"
    //   defaultTheme="system"
    //   enableSystem
    //   disableTransitionOnChange
    // >
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full ">
          <Navbar />
          {children}
        </main>
      </SidebarProvider>
    // </ThemeProvider>
  );
}
