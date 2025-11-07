import React from "react";
import { Calculator, FileText, Users } from "lucide-react";

const PayrollSteps = () => {
    const steps = [
        {
            n: 1,
            title: "Input Data Karyawan",
            desc: "Tambahkan detail karyawan, komponen gaji, dan tunjangan dalam satu dashboard.",
            icon: Users,
        },
        {
            n: 2,
            title: "Hitung Otomatis & Cepat",
            desc: "Sistem menghitung PPh 21, BPJS, dan Gaji Bersih secara instan dan akurat.",
            icon: Calculator,
        },
        {
            n: 3,
            title: "Bayar, Lapor, & Arsip",
            desc: "Slip gaji digital siap dibagikan. Laporan SPT Masa dan rekap data siap diunduh.",
            icon: FileText,
        },
    ];

    return (
        <section className="mx-auto max-w-6xl px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-pretty text-3xl font-bold md:text-4xl">
                    Proses <span className="text-indigo-600">3 Langkah</span> yang Mudah
                </h2>
            </div>

            <div className="relative">
                <div className="hidden md:block absolute top-[2rem] left-0 right-0 h-0.5 bg-gray-800 mx-auto max-w-5xl"></div>

                <div className="grid gap-10 md:grid-cols-3 md:gap-6">
                    {steps.map((s, index) => {
                        const Icon = s.icon;
                        return (
                            <div
                                key={s.n}
                                className="relative z-10 flex flex-col items-start md:items-center"
                            >
                                <div className="flex items-center gap-3 md:flex-col md:gap-2">
                                    <div className="flex size-14 items-center justify-center rounded-full border-4 border-indigo-950 bg-indigo-800 font-extrabold text-xl shadow-lg">
                                        {s.n}
                                    </div>
                                    <div className="md:hidden">
                                        <p className="font-semibold text-lg">{s.title}</p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-2 md:mt-8 md:pt-0 md:text-center md:px-2">
                                    <h3 className="hidden md:flex items-center justify-center gap-2 text-xl font-bold mb-2">
                                        <Icon className="size-5" />
                                        {s.title}
                                    </h3>
                                    <p className="text-base text-muted-foreground leading-relaxed md:text-center">
                                        {s.desc}
                                    </p>
                                </div>

                                {index < steps.length - 1 && (
                                    <div className="absolute top-14 left-7 md:hidden w-0.5 h-[calc(100%)]"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PayrollSteps;