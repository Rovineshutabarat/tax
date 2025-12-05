"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeCheck } from "lucide-react";

export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

const Hero = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-12 pt-10 md:pb-20 md:pt-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <Reveal>
            <h1 className="text-pretty text-3xl font-bold leading-tight md:text-5xl">
              Kelola Gaji & PPh 21 Karyawan dengan Mudah
            </h1>
          </Reveal>
          <Reveal>
            <p className="text-pretty text-muted-foreground md:text-lg">
              Platform payroll modern untuk perusahaan Indonesia. Otomatis,
              akurat, dan hemat waktu.
            </p>
          </Reveal>
          <Reveal className="flex items-center gap-3">
            <Button size="lg" className="group">
              Coba Gratis 14 Hari
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button size="lg" variant="outline">
              Lihat Demo
            </Button>
          </Reveal>
          <Reveal className="flex items-center gap-x-2 text-sm text-muted-foreground">
            <BadgeCheck className="size-4 text-muted-foreground" />
            <span>Sesuai peraturan DJP & data aman</span>
          </Reveal>
        </div>
        <Reveal>
          <div className="relative">
            <img
              src="https://www.figma.com/community/resource/438801d2-4c49-4db4-bb1c-06df68d9cff4/thumbnail"
              alt="Ilustrasi dashboard payroll PayGaji"
              className="rounded-xl border shadow-md h-full w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
