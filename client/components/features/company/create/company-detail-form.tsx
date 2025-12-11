import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { BusinessSectorService } from "@/services/business.sector.service";
import { BusinessSector } from "@/types/entity/business.sector";
import { useCompanyFormStore } from "@/store/use-company-form-store";
import { SubmitHandler, useForm } from "react-hook-form";
import { CompanyDetailRequest } from "@/types/payload/request/company.detail.request";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanyType } from "@/types/enums/company.type";

const CompanyDetailForm = () => {
  const companyTypes: { id: number; value: CompanyType; label: string }[] = [
    { id: 1, value: CompanyType.Values.PT, label: "PT" },
    { id: 2, value: CompanyType.Values.CV, label: "CV" },
    { id: 3, value: CompanyType.Values.FIRMA, label: "FIRMA" },
    { id: 4, value: CompanyType.Values.OTHER, label: "OTHER" },
  ];

  const { formData, setFormData, setCurrentStep, saveStoredStep } =
    useCompanyFormStore();
  const [selectedCompanyType, setSelectedCompanyType] =
    React.useState<CompanyType>(formData?.companyType ?? CompanyType.Values.CV);

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyDetailRequest>({
    resolver: zodResolver(CompanyDetailRequest),
    defaultValues: {
      businessSectorId: formData?.businessSectorId,
      companyType: formData?.companyType ?? CompanyType.Values.PT,
    },
  });

  const { data: businessSectors } = useQuery({
    queryKey: ["business-sectors"],
    queryFn: () => BusinessSectorService.findAllBusinessSectors(),
  });

  const onSubmit: SubmitHandler<CompanyDetailRequest> = (
    data: CompanyDetailRequest,
  ) => {
    setFormData(data);
    saveStoredStep(3);
  };

  React.useEffect(() => {
    setSelectedCompanyType((formData?.companyType as CompanyType) ?? CompanyType.Values.PT)
  },[])

  return (
    <React.Fragment>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl mb-3">
          Legal & Registration Information
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Enter your company’s legal and registration details to help us verify
          your business identity and ensure compliance with official
          regulations.
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2 w-full">
          <Label>Business Sector</Label>
          <Label className="text-xs text-muted-foreground">
            Select the industry or sector your company primarily operates in.
          </Label>
          <Select
            onValueChange={(value) =>
              setValue("businessSectorId", Number(value))
            }
            defaultValue={formData?.businessSectorId?.toString()}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your company business sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {!businessSectors?.data ? (
                  <SelectLabel>No Data</SelectLabel>
                ) : (
                  <SelectLabel>Business Sector</SelectLabel>
                )}
                {businessSectors?.data.map((businessSector: BusinessSector) => {
                  return (
                    <SelectItem
                      key={businessSector.id}
                      value={businessSector.id.toString()}
                    >
                      {businessSector.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.businessSectorId && (
            <p className="text-destructive text-xs">
              *{errors.businessSectorId.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Company Type</Label>
          <Label className="text-xs text-muted-foreground">
            Choose the type that best describes your company’s legal structure.
          </Label>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 w-full">
            {companyTypes.map((companyType) => (
              <button
                key={companyType.id}
                type="button"
                onClick={() => {
                  setSelectedCompanyType(companyType.value);
                  setValue("companyType", companyType.value);
                }}
                className={cn(
                  "font-inter rounded-lg border p-4 text-left text-sm font-medium transition-all duration-200 hover:shadow-sm cursor-pointer",
                  selectedCompanyType === companyType.value
                    ? "border-gray-700"
                    : "border-onboarding-option-border text-muted-foreground hover:border-onboarding-option-border/60",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      selectedCompanyType === companyType.value
                        ? "bg-green-400"
                        : "bg-onboarding-option-border",
                    )}
                  ></div>
                  {companyType.label}
                </div>
              </button>
            ))}
          </div>
          {errors.companyType && (
            <p className="text-destructive text-xs">
              *{errors.companyType.message}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            type="button"
            onClick={() => setCurrentStep(1)}
            className="cursor-pointer"
          >
            <ArrowLeft />
            Back
          </Button>

          <Button type="submit">
            Next Step
            <ArrowRight />
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CompanyDetailForm;
