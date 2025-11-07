import React from "react";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Receipt />
          <span className="text-balance text-lg font-semibold">PayGaji</span>
        </div>
        <nav className="hidden items-center gap-6 md:flex">
          <a
            className="text-sm text-muted-foreground hover:text-foreground"
            href="#features"
            aria-label="Lihat fitur"
          >
            Fitur
          </a>
          <a
            className="text-sm text-muted-foreground hover:text-foreground"
            href="#pricing"
            aria-label="Lihat harga"
          >
            Harga
          </a>
          <a
            className="text-sm text-muted-foreground hover:text-foreground"
            href="#testimonials"
            aria-label="Lihat testimoni"
          >
            Testimoni
          </a>
          <Button size="sm">Masuk</Button>
        </nav>
        <Button
          className="md:hidden bg-transparent"
          variant="outline"
          size="icon"
          aria-label="Menu"
        >
          <span className="i-[lucide--menu]" />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
