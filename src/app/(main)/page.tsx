import CreativitySection from "@/src/components/landing/creativity";
import GallerySection from "@/src/components/landing/gallery";
import HeroSection from "@/src/components/landing/hero-section";
import MarketplaceSection from "@/src/components/landing/marketplace";
import ShowcaseSection from "@/src/components/landing/showcase-section";
import StorySection from "@/src/components/landing/story";
import VisionSection from "@/src/components/landing/vision";
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ShowcaseSection />
      <MarketplaceSection />
      <GallerySection />
      <StorySection />
      <VisionSection />
      <CreativitySection />
    </div>
  );
};

export default LandingPage;
