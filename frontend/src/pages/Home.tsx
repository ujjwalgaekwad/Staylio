import FeaturedDestinations from "@/components/FeaturedDestinations";
import HeroCard from "@/components/Hero";
import Rewards from "@/components/Rewards";
import SpecialOffers from "@/components/SpecialOffers";

function Hero() {
  return (
    <div>
      <HeroCard />
      <FeaturedDestinations />
      <SpecialOffers />
      <Rewards />
    </div>
  );
}

export default Hero;
