"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trash2 } from "lucide-react";
import { DatePicker } from "@/components/features/common/date-picker";
import { SubmitHandler, useForm } from "react-hook-form";
import { CompanyInfoRequest } from "@/types/payload/request/company.info.request";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCompanyFormStore } from "@/store/use-company-form-store";

const CompanyInformationForm = () => {
  const { formData, saveStoredStep, setFormData, discardChanges } =
    useCompanyFormStore();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyInfoRequest>({
    resolver: zodResolver(CompanyInfoRequest),
    defaultValues: {
      name: formData?.name,
      email: formData?.email,
      phoneNumber: formData?.phoneNumber,
      establishedAt: formData?.establishedAt,
    },
  });

  const onSubmit: SubmitHandler<CompanyInfoRequest> = (
    data: CompanyInfoRequest,
  ) => {
    setFormData(data);
    saveStoredStep(2);
  };

  function handleDiscard() {
    discardChanges();
    // reset();
  }

  return (
    <React.Fragment>
      <div className="mb-8">
        <h1 className="text-foreground mb-2 text-3xl leading-tight font-semibold lg:text-4xl">
          Let’s set up your company profile
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Provide your company details so we can configure your workspace and
          ensure everything works smoothly.
        </p>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Company Name</Label>
            <Label className="text-xs text-muted-foreground">
              Enter the official name of your company as registered in legal
              documents.
            </Label>
          </div>
          <div className="space-y-1">
            <Input
              type="text"
              placeholder="Enter your company name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-destructive text-xs">*{errors.name.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4 w-full">
          <div className="space-y-1">
            <Label>Company Email</Label>
            <Label className="text-xs text-muted-foreground">
              Enter an official email address where we can contact your company.
            </Label>
          </div>
          <div className="space-y-1">
            <Input
              type="email"
              placeholder="Enter your company email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-destructive text-xs">
                *{errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center w-full space-x-4">
          <div className="space-y-4 w-full">
            <div className="space-y-1">
              <Label>Company Phone Number</Label>
              <Label className="text-xs text-muted-foreground">
                Enter an official phone number where we can contact your
                company.
              </Label>
            </div>
            <div className="space-y-1">
              <Input
                type="tel"
                placeholder="Enter your company phone number"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <p className="text-destructive text-xs">
                  *{errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4 w-full">
            <div className="space-y-1">
              <Label>Company Established At</Label>
              <Label className="text-xs text-muted-foreground">
                Select the date your company was officially established.
              </Label>
            </div>
            <div className="space-y-1">
              <DatePicker
                onChange={(value) =>
                  setValue("establishedAt", value || "", {
                    shouldValidate: true,
                  })
                }
              />
              {errors.establishedAt && (
                <p className="text-destructive text-xs">
                  *{errors.establishedAt.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <Button
            className="text-destructive cursor-pointer"
            variant="outline"
            type="button"
            onClick={handleDiscard}
          >
            <Trash2 />
            Discard Changes
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

export default CompanyInformationForm;
