import React from "react";
import {BadgeCheck, Receipt, Shield, Sparkles} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
          <h3 className="text-pretty text-2xl font-semibold">Siap Memulai?</h3>
          <p className="mt-2 text-muted-foreground">
            Coba gratis 14 hari. Tanpa kartu kredit.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Button size="lg">Mulai Sekarang</Button>
            <Button size="lg" variant="outline">
              Hubungi Sales
            </Button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Shield className="size-3" />
              Data Aman
            </span>
            <span className="inline-flex items-center gap-1">
              <BadgeCheck className="size-3" />
              Sesuai Aturan DJP
            </span>
            <span className="inline-flex items-center gap-1">
              <Sparkles className="size-3" />
              Mudah Digunakan
            </span>
          </div>
        </div>
      </section>
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid gap-6 md:grid-cols-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Receipt />
                <span className="font-semibold">PayGaji</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Platform payroll modern untuk Indonesia.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Produk</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#features">Fitur</a>
                </li>
                <li>
                  <a href="#pricing">Harga</a>
                </li>
                <li>
                  <a href="#testimonials">Testimoni</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Sumber</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#">Dokumentasi</a>
                </li>
                <li>
                  <a href="#">Panduan</a>
                </li>
                <li>
                  <a href="#">Kebijakan</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Kontak</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#">Email</a>
                </li>
                <li>
                  <a href="#">LinkedIn</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} PayGaji
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;