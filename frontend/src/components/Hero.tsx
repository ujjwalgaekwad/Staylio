import { Button } from "@/components/ui/button";
import SearchHotels from "./SearchHotels";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-[0.85] h-[600px] z-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1000&q=80)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40 h-[600px] z-10" />
      <div className="relative z-20 pt-28 pb-20 min-h-[600px]">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto mt-10 md:mt-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Find Your Perfect Stay
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white/90">
              Discover amazing hotels and accommodations in Ahmedabad at the
              best prices. Your journey begins with the perfect place to stay.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="text-base px-6 py-3"
                onClick={() => navigate("/search")}
              >
                Explore Destinations
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 px-6 py-3"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="w-full mt-16">
            <SearchHotels />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
