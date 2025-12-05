"use client";

import React, { useEffect } from "react";
import { Building2, IdCard, Landmark, MapPin, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import CompanyInformationForm from "@/components/features/company/create/company-information-form";
import CompanyLegalRegistrationForm from "@/components/features/company/create/company-legal-registration-form";
import CompanyAddressForm from "@/components/features/company/create/company-address-form";
import CompanyTaxInformationForm from "@/components/features/company/create/company-tax-information-form";

import { useCompanyFormStore } from "@/store/use-company-form-store";
import AuthGuard from "@/components/shared/auth-guard";

const CreateCompanyPage = () => {
  const {
    currentStep,
    storedStep,
    setCurrentStep,
    loadStoredStep,
    loadFormData,
  } = useCompanyFormStore();

  useEffect(() => {
    loadStoredStep();
    loadFormData();
  }, [loadStoredStep, loadFormData]);

  const steps = [
    {
      id: 1,
      name: "Company Information",
      icon: <IdCard />,
      content: <CompanyInformationForm />,
    },
    {
      id: 2,
      name: "Legal & Registration Info",
      icon: <ScrollText />,
      content: <CompanyLegalRegistrationForm />,
    },
    {
      id: 3,
      name: "Address Details",
      icon: <MapPin />,
      content: <CompanyAddressForm />,
    },
    {
      id: 4,
      name: "Tax Information",
      icon: <Landmark />,
      content: <CompanyTaxInformationForm />,
    },
  ];

  const currentContent = steps.find((s) => s.id === currentStep)?.content;

  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <div className="w-80 bg-gradient-to-b from-black to-indigo-700 text-white p-6 flex flex-col gap-6">
          <div className="flex items-center space-x-3 mb-5 mt-2 mx-3">
            <Building2 className="size-6" />
            <p className="text-xl font-semibold">Create Your Company</p>
          </div>

          <div className="space-y-6">
            {steps.map((step) => (
              <Button
                key={step.id}
                variant="ghost"
                size="lg"
                className={cn(
                  "w-full text-left p-3 rounded-lg flex justify-start cursor-pointer",
                  step.id === currentStep && "bg-white/10",
                )}
                disabled={step.id > storedStep}
                onClick={() => setCurrentStep(step.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-white">{step.icon}</span>
                  <p className="font-semibold text-white">{step.name}</p>
                </div>
              </Button>
            ))}
          </div>

          <div className="font-inter mt-auto flex justify-between pt-8 text-sm text-white/60">
            <span>Terms of Service</span>
            <span>Help Center</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto">
            <div className="max-w-4xl mx-auto p-8">{currentContent}</div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default CreateCompanyPage;
