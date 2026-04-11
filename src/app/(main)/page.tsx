import CreativitySection from "@/src/components/landing/creativity";
import Footer from "@/src/components/landing/footer";
import GallerySection from "@/src/components/landing/gallery";
import HeroSection from "@/src/components/landing/hero-section";
import MarketplaceSection from "@/src/components/landing/marketplace";
import Navbar from "@/src/components/landing/navbar";
import ShowcaseSection from "@/src/components/landing/showcase-section";
import StorySection from "@/src/components/landing/story";
import VisionSection from "@/src/components/landing/vision";


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ShowcaseSection />
      <MarketplaceSection />
      <GallerySection />
      <StorySection />
      <VisionSection />
      <CreativitySection />
      <Footer />
    </div>
  );
};

export default LandingPage;
