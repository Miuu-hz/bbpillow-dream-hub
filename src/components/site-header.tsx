import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.jpg";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="BB Pillow logo" className="h-10 w-auto rounded-md" />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#products" className="text-foreground/80 transition hover:text-primary">สินค้า / Products</a>
          <a href="#story" className="text-foreground/80 transition hover:text-primary">เรื่องราว / Story</a>
          <a href="#wholesale" className="text-foreground/80 transition hover:text-primary">ขายส่ง / B2B</a>
          <a href="#contact" className="text-foreground/80 transition hover:text-primary">ติดต่อ / Contact</a>
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-foreground shadow-sm transition hover:opacity-90"
        >
          สั่งซื้อ
        </a>
      </div>
    </header>
  );
}
