import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface FooterProps {
  isPrimary: boolean;
}

const Footer = ({ isPrimary }: FooterProps) => {
  const socials = [
    {
      id: "instagram",
      media: "instagram"
    },
    {
      id: "facebook",
      media: "facebook",
    },
    {
      id: "linkedln",
      media: ""
    }
  ]
  return (
    <div
      className={cn(
        "container mx-auto px-10 border-t",
        isPrimary ? "bg-blue-950" : "bg-gray-50"
      )}
    >
      <footer className="">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
            <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center font-bold text-xl">
            <div className="h-14 w-14 rounded-full">
              <img src="./Staylio.png" alt="" />
            </div>
            <span>Staylion</span>
          </Link>
          </div>
              <p className="text-muted-foreground mb-4">
                Find your perfect stay anywhere in the world with our
                easy-to-use hotel booking platform.
              </p>
              <div className="flex gap-4">
                {["facebook", "twitter", "instagram", "linkedin"].map(
                  (social) => (
                    <Link
                      key={social}
                      to="#"
                      className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      <div className="h-4 w-4"></div>
                    </Link>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                {["About Us", "Careers", "Blog", "Press"].map((item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-3">
                {[
                  "Help Center",
                  "Contact Us",
                  "Privacy Policy",
                  "Terms of Service",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Subscribe</h3>
              <p className="text-muted-foreground mb-4">
                Subscribe to our newsletter for the latest updates and offers.
              </p>
              <div className="flex gap-2">
                <Input type="email" placeholder="Your email" />
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                  Send
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} StayEase. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
