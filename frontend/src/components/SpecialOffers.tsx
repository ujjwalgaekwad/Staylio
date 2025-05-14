import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

function SpecialOffers() {
  return (
    <section className="bg-muted py-12">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter">
            Special Offers
          </h2>
          <p className="text-muted-foreground mt-2">
            Exclusive deals and discounts for your next adventure
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5">
                <img
                  src=""
                  alt="Summer Escape"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="md:w-3/5 p-6">
                <Badge className="mb-2 bg-yellow-500">Limited Time</Badge>
                <h3 className="text-xl font-bold mb-2">
                  Summer Escape Package
                </h3>
                <p className="text-muted-foreground mb-4">
                  Enjoy 30% off on beach resorts worldwide. Includes free
                  breakfast and spa access.
                </p>
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold">$599</span>
                  <span className="text-muted-foreground line-through ml-2">
                    $899
                  </span>
                  <span className="ml-2 text-green-600 text-sm">Save $300</span>
                </div>
                <Button>Book Now</Button>
              </div>
            </div>
          </Card>
          <Card className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5">
                <img
                  src=""
                  alt="City Break"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="md:w-3/5 p-6">
                <Badge className="mb-2 bg-blue-500">Weekend Special</Badge>
                <h3 className="text-xl font-bold mb-2">City Break Deal</h3>
                <p className="text-muted-foreground mb-4">
                  Book 2 nights in any city hotel and get the 3rd night free.
                  Includes city tour.
                </p>
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold">$349</span>
                  <span className="text-muted-foreground line-through ml-2">
                    $499
                  </span>
                  <span className="ml-2 text-green-600 text-sm">Save $150</span>
                </div>
                <Button>Book Now</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default SpecialOffers;
