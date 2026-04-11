import { MessageSquare, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="pt-24 pb-12 px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left Side */}
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <h2 className="text-5xl md:text-6xl font-display text-foreground leading-tight">
                Our platform, your art.
              </h2>
              <div className="mt-2 bg-white p-3 rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-center gap-1">
                <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
                <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full" />
              </div>
            </div>
            
            <p className="text-muted-foreground font-body max-w-md text-lg leading-relaxed">
              In the realm of Artnesia, creativity knows no bounds. This eternal marketplace celebrates the timeless nature of art.
            </p>

            <div className="flex items-center gap-4 mt-4">
              <Link href="#" className="w-12 h-12 rounded-full bg-white border border-zinc-100 flex items-center justify-center text-foreground hover:scale-110 transition-transform shadow-sm">
                {/* <Twitter className="w-5 h-5" fill="currentColor" /> */}Twitter
              </Link>
              <Link href="#" className="w-12 h-12 rounded-full bg-white border border-zinc-100 flex items-center justify-center text-foreground hover:scale-110 transition-transform shadow-sm">
                {/* <Instagram className="w-5 h-5" /> */} Github
              </Link>
            </div>
          </div>

          {/* Right Side - Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
            {/* Get Started */}
            <div className="flex flex-col gap-4">
              <h4 className="font-body font-bold text-foreground mb-2">Get Started</h4>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
                      <Zap className="w-3 h-3 text-background py-1" fill="currentColor" />
                    </div>
                    <span>Create strategy</span>
                    <span className="ml-1 px-2 py-0.5 bg-red-400 text-white text-[10px] rounded-full font-bold uppercase tracking-wider">New</span>
                  </Link>
                </li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Solution</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">E-Commerce</Link></li>
              </ul>
            </div>

            {/* Your Story */}
            <div className="flex flex-col gap-4">
              <h4 className="font-body font-bold text-foreground mb-2">Your Story</h4>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
                      <Zap className="w-3 h-3 text-background py-1" fill="currentColor" />
                    </div>
                    <span>Create Story</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <span>Sell fast</span>
                    <span className="ml-1 px-2 py-0.5 border border-zinc-200 text-zinc-400 text-[10px] rounded-full font-bold uppercase tracking-wider">Soon</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Privacy & Policy */}
            <div className="flex flex-col gap-4">
              <h4 className="font-body font-bold text-foreground mb-2">Privacy & Policy</h4>
              <ul className="flex flex-col gap-4">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
                <li>
                  <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                    <span>Api</span>
                    <span className="ml-1 px-2 py-0.5 bg-red-100 text-red-400 text-[10px] rounded-full font-bold uppercase tracking-wider border border-red-200">New</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-end">
          <p className="text-sm font-body text-foreground opacity-80">
            © 2024 . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
