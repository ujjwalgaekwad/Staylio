import FeaturedDestinations from "@/components/FeaturedDestinations";
import HeroCard from "@/components/Hero";
import Rewards from "@/components/Rewards";
import SpecialOffers from "@/components/SpecialOffers";

function Hero() {
  return (
    <div>
      <HeroCard />
      <div className="flex flex-col justify-center items-center">
       <FeaturedDestinations />
       <SpecialOffers />
       <Rewards />
     </div>
    </div>
  );
}

export default Hero;
