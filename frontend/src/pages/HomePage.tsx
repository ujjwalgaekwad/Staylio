import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import SpecialOffers from "@/components/SpecialOffers";
import Rewards from "@/components/Rewards";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 brightness-[0.85]"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1000&q=80)",
          height: "600px",
        }}
      ></div>
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 z-10"
        style={{ height: "600px" }}
      ></div>

      <div className="relative z-20 pt-8 pb-20" style={{ minHeight: "600px" }}>
        <div className="container px-4 md:px-6 mx-auto flex flex-col items-center justify-start text-center h-full">
          <Header />
          <div className="max-w-3xl mx-auto mt-10 md:mt-20 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Discover amazing hotels and accommodations in Ahmedabad at the
              best prices. Your journey begins with the perfect place to stay.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Button
                size="lg"
                variant="secondary"
                className="text-base"
                onClick={() => navigate("/search")}
              >
                Explore Destinations
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="w-full">
            <SearchBar />
            <FeaturedDestinations />
            <SpecialOffers />
            <Rewards />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
