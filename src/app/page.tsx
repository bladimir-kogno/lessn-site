import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FeatureCards from "@/components/FeatureCards";
import ValueStack from "@/components/ValueStack";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

import TestFlightModal from "@/components/TestFlightModal";
import Screenshots from "@/components/Screenshots";
import SocialProof from "@/components/SocialProof";



/**
 * Swap this URL to change the hero image.
 * You can also pull from an env var or a CMS later.
 */
const heroImageUrl =
    "https://images.unsplash.com/photo-1584697964381-4252d9f10c68?q=80&w=1400&auto=format&fit=crop";

export default function Page() {
  return (
      <>
        <Nav />
          <main>
              <Hero imageUrl={heroImageUrl} />
              <FeatureCards />
              <ValueStack />
              <Screenshots />
              <SocialProof />
              <FAQ />
              <CTA />
          </main>
        <Footer />
          <TestFlightModal />
      </>
  );
}
