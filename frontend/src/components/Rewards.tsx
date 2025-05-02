import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

function Rewards() {
  return (
    <div>
      <section className="container px-4 md:px-6 py-12">
        <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter mb-4">
                Join Our Rewards Program
              </h2>
              <p className="mb-6">
                Sign up for our loyalty program and earn points on every
                booking. Redeem for free nights, upgrades, and exclusive perks.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4" /> Earn 10 points per $1
                  spent
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4" /> Free room upgrades
                  when available
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4" /> Early check-in and
                  late check-out
                </li>
                <li className="flex items-center">
                  <ArrowRight className="mr-2 h-4 w-4" /> Exclusive member-only
                  deals
                </li>
              </ul>
              <Button variant="secondary">Join Now - It's Free</Button>
            </div>
            <div className="hidden md:block">
              {/* <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Rewards Program"
                  width={400}
                  height={300}
                  className="rounded-lg"
                /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Rewards;
