import SearchBar from "@/components/SearchBar";

function HomePage() {
  return (
    <div className="w-full py-12 md:py-24 lg:py-32 bg-muted relative">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4 relative z-10">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          Find Your Perfect Stay
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl">
          Discover amazing hotels and accommodations worldwide at the best
          prices.
        </p>
        <SearchBar />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r z-0"></div>
    </div>
  );
}

export default HomePage;
