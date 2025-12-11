"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import AddressForm from "@/components/features/common/address-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { CompanyAddressRequest } from "@/types/payload/request/company.address.request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCompanyFormStore } from "@/store/use-company-form-store";

const CompanyAddressForm = () => {
  const { formData, setFormData, saveStoredStep, setCurrentStep } =
    useCompanyFormStore();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyAddressRequest>({
    resolver: zodResolver(CompanyAddressRequest),
    defaultValues: {
      address: {
        street: formData?.address?.street,
        postalCode: formData?.address?.postalCode,
      },
    },
  });

  const onSubmit: SubmitHandler<CompanyAddressRequest> = (
    data: CompanyAddressRequest,
  ) => {
    setFormData(data);
    saveStoredStep(4);
  };

  return (
    <React.Fragment>
      <div className="mb-8">
        <h1 className="text-foreground mb-2 text-3xl leading-tight font-semibold lg:text-4xl">
          Set Your Company and Tax Office Address
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Provide the complete address details for your company and the
          corresponding tax office. This information ensures accurate regional
          registration and document management.
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Label className="text-[20px]">Company Address</Label>
          <AddressForm
            fieldName="address"
            register={register}
            setValue={setValue}
            errors={errors.address}
          />
        </div>

        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            type="button"
            onClick={() => setCurrentStep(2)}
            className="cursor-pointer"
          >
            <ArrowLeft />
            Back
          </Button>

          <Button type="submit" className="cursor-pointer">
            Next Step
            <ArrowRight />
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CompanyAddressForm;
