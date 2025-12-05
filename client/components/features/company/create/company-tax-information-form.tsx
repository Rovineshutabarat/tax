"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { CompanyTaxInfoRequest } from "@/types/payload/request/company.tax.info.request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCompanyFormStore } from "@/store/use-company-form-store";
import { GrossNetOption } from "@/types/enums/gross.net.option";
import { useMutation } from "@tanstack/react-query";
import { CompanyRequest } from "@/types/payload/request/company.request";
import { CompanyService } from "@/services/company.service";
import { toast } from "sonner";
import { ErrorResponse } from "@/types/payload/response/common/error.response";

const CompanyTaxInformationForm = () => {
  const [isVatRegistered, setIsVatRegistered] = React.useState<boolean>(false);
  const [selectedGrossOption, setSelectedGrossOption] =
    React.useState<string>("GROSS");

  const grossNetOptions = [
    { name: "Gross", value: "GROSS" },
    { name: "Gross Up", value: "GROSS_UP" },
    { name: "Net", value: "NET" },
  ];

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CompanyTaxInfoRequest>({
    resolver: zodResolver(CompanyTaxInfoRequest),
  });

  const { formData, setFormData, setCurrentStep } = useCompanyFormStore();

  const createCompanyMutation = useMutation({
    mutationKey: ["create-company"],
    mutationFn: (data: CompanyRequest) => CompanyService.createCompany(data),
    onSuccess: () => {
      toast.success("Success creating company");
    },
    onError: (error: any) => {
      const parsed = error.parsedBody as ErrorResponse;
      toast.error(parsed?.message || "Failed to create company.");
    },
  });

  const onSubmit: SubmitHandler<CompanyTaxInfoRequest> = (
    data: CompanyTaxInfoRequest,
  ) => {
    setFormData(data);
    console.log(formData);
    createCompanyMutation.mutate(formData as CompanyRequest);
  };

  React.useEffect(() => {
    if (formData) {
      setIsVatRegistered(formData.isVatRegistered ?? false);
      setValue("isVatRegistered", formData.isVatRegistered ?? false);

      const gross = formData.grossNetOption ?? "GROSS";
      setSelectedGrossOption(gross);
      setValue("grossNetOption", gross as GrossNetOption);
    }
  }, [formData, setValue]);

  return (
    <React.Fragment>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl mb-3">
          Company Tax Information
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Provide your company’s tax registration details, VAT status, and
          reporting preferences. This information helps ensure compliance with
          tax regulations and smooth financial operations.
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>VAT Registration</Label>
            <Label className="text-xs text-muted-foreground">
              Select whether your company is registered for VAT to comply with
              tax regulations.
            </Label>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-2 w-full">
            <button
              type="button"
              onClick={() => {
                setIsVatRegistered(true);
                setValue("isVatRegistered", true);
              }}
              className={cn(
                "font-inter rounded-lg border p-4 text-left text-sm font-medium transition-all duration-200 hover:shadow-sm cursor-pointer",
                isVatRegistered
                  ? "border-gray-700"
                  : "border-onboarding-option-border text-muted-foreground hover:border-onboarding-option-border/60",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    isVatRegistered
                      ? "bg-green-400"
                      : "bg-onboarding-option-border",
                  )}
                ></div>
                Yes
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsVatRegistered(false);
                setValue("isVatRegistered", false);
              }}
              className={cn(
                "font-inter rounded-lg border p-4 text-left text-sm font-medium transition-all duration-200 hover:shadow-sm cursor-pointer",
                !isVatRegistered
                  ? "border-gray-700"
                  : "border-onboarding-option-border text-muted-foreground hover:border-onboarding-option-border/60",
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "h-2 w-2 rounded-full",
                    !isVatRegistered
                      ? "bg-green-400"
                      : "bg-onboarding-option-border",
                  )}
                ></div>
                No
              </div>
            </button>
          </div>
          {errors?.isVatRegistered && (
            <p className="text-xs text-destructive">
              *{errors.isVatRegistered.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Company Gross Net Option</Label>
            <Label className="text-xs text-muted-foreground">
              Choose how your company reports revenue for tax purposes.
            </Label>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 w-full">
            {grossNetOptions.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setSelectedGrossOption(option.value);
                  setValue("grossNetOption", option.value as GrossNetOption);
                }}
                className={cn(
                  "font-inter rounded-lg border p-4 text-left text-sm font-medium transition-all duration-200 hover:shadow-sm cursor-pointer",
                  selectedGrossOption === option.value
                    ? "border-gray-700 "
                    : "border-onboarding-option-border text-muted-foreground hover:border-onboarding-option-border/60",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      selectedGrossOption === option.value
                        ? "bg-green-400"
                        : "bg-onboarding-option-border",
                    )}
                  ></div>
                  {option.name}
                </div>
              </button>
            ))}
          </div>
          {errors?.grossNetOption && (
            <p className="text-xs text-destructive">
              *{errors.grossNetOption.message}
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            type="button"
            onClick={() => setCurrentStep(3)}
            className="cursor-pointer"
          >
            <ArrowLeft />
            Back
          </Button>
          <Button
            className="cursor-pointer"
            disabled={createCompanyMutation.isPending}
          >
            <Save />
            Save Changes
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CompanyTaxInformationForm;
