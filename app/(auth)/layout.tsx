import FloatingIcons from "@/components/shared/floating-icons";
import { Footer } from "@/components/shared/footer";
import Header from "@/components/shared/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-slate-100">
      <Header />
      <FloatingIcons />
      <div className="z-40">{children}</div>
      <Footer />
    </main>
  );
}
