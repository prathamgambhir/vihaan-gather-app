import Footer from "@/src/components/landing/footer";
import Navbar from "@/src/components/landing/navbar";

export default function CollegesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
