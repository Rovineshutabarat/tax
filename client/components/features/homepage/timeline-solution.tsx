import React from "react";
import { Clock, FileText, Shield, Users } from "lucide-react";

const issues = [
  {
    icon: Clock,
    title: "Proses Manual Lama",
    desc: "Spreadsheet berantakan dan rawan kesalahan.",
  },
  {
    icon: FileText,
    title: "Peraturan Kompleks",
    desc: "PPh 21 & BPJS sering membingungkan.",
  },
  {
    icon: Users,
    title: "Data Tersebar",
    desc: "Karyawan, NPWP, PTKP di banyak tempat.",
  },
  {
    icon: Shield,
    title: "Risiko Kepatuhan",
    desc: "Kesalahan bisa berujung denda.",
  },
];

const TimelineSolution = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-extrabold text-center mb-16">
          Mengapa Perlu Solusi Kami?
        </h2>

        <div className="relative">
          {/* Garis timeline */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-indigo-900 md:left-1/2 md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {issues.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={i}
                  className="relative flex items-start md:items-center"
                >
                  <div className="z-10 w-12 h-12 rounded-full flex items-center justify-center text-white bg-indigo-700 border-4 border-indigo-900 shadow-md md:absolute md:left-1/2 md:-translate-x-1/2">
                    <Icon size={25} />
                  </div>

                  <div
                    className={`flex-1 p-3 transition duration-300 ${
                      isLeft
                        ? "md:mr-[55%] md:text-right md:order-1"
                        : "md:ml-[55%] md:text-left md:order-3"
                    }`}
                  >
                    <p
                      className={`text-2xl font-semibold ${isLeft ? "md:text-right" : "md:text-left"}`}
                    >
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-normal mt-1">
                      {item.desc}
                    </p>

                    <div className="md:hidden absolute -left-12 top-0 text-3xl font-extrabold text-indigo-400 opacity-50">
                      {i + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSolution;