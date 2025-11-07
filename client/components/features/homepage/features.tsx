import React from "react";
import {
  BarChart3,
  Calculator,
  FileText,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const feats = [
    {
      icon: Calculator,
      title: "Hitung PPh 21 Otomatis",
      desc: "Perhitungan sesuai regulasi terbaru.",
    },
    {
      icon: Users,
      title: "Manajemen Karyawan",
      desc: "Data karyawan, NPWP, status PTKP.",
    },
    {
      icon: BarChart3,
      title: "Laporan Lengkap",
      desc: "Grafik tren gaji & PPh 21.",
    },
    {
      icon: Zap,
      title: "Proses Cepat",
      desc: "Hemat waktu dengan otomatisasi.",
    },
    { icon: Shield, title: "Keamanan Data", desc: "Standar enkripsi modern." },
    {
      icon: FileText,
      title: "Slip Gaji",
      desc: "Cetak & kirim slip gaji mudah.",
    },
  ];
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="mb-6 text-pretty text-2xl font-semibold md:text-3xl">
        Fitur Unggulan
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {feats.map((f, i) => (
          <Card key={i} className="h-full hover:shadow-md">
            <CardHeader className="flex-row items-center gap-3">
              <f.icon className="size-5 text-primary" />
              <CardTitle className="text-base">{f.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {f.desc}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;