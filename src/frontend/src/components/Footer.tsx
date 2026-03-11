import { Music2 } from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="bg-card border-t border-border py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Music2 className="w-5 h-5 text-gold" />
              <span className="font-display font-bold text-lg">
                <span className="gold-gradient">Magic Prithvi</span>
                <span className="text-foreground/60 text-sm ml-1 font-body">
                  Studio
                </span>
              </span>
            </div>
            <p className="text-muted-foreground text-xs font-body max-w-xs">
              Professional music production studio in Jadavpur, Kolkata. Where
              your sound becomes legendary.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <SiInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <SiFacebook className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-gold transition-colors"
            >
              <SiYoutube className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs font-body">
            © {year} Magic Prithvi Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs font-body">
            <a
              href="/admin"
              data-ocid="footer.admin.link"
              className="text-muted-foreground/40 hover:text-muted-foreground transition-colors"
            >
              Admin
            </a>
            <span className="text-muted-foreground/30">·</span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${utm}`}
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground/40 hover:text-muted-foreground transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
