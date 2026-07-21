import "@/app/globals.css";
import RegionModal from "@/components/RegionModal";
import { RegionProvider } from "./context/RegionContext";
import Navbar from "@/components/Navbar";
import ContactButton from "@/components/WhtasappAppButton";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Your Premium Taxi Service",
  description: "Reliable local and outstation rides catered to your region.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50/50 text-gray-900">
        <RegionProvider>
          {/* The initial screen location interceptor */}
          <RegionModal />
          
          {/* Main application tree */}
          <main className="relative min-h-screen">
            <Navbar/>
            <ContactButton/>
            {children}
            <Footer/>
          </main>
        </RegionProvider>
      </body>
    </html>
  );
}