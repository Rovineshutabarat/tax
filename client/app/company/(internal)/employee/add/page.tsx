"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmployeeRequest } from "@/types/payload/request/employee.request";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MarriageStatus } from "@/types/enums/marriage.status";
import { DatePicker } from "@/components/features/common/date-picker";
import { EmployeeStatus } from "@/types/enums/employee.status";
import { Gender } from "@/types/enums/gender";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DepartmentService } from "@/services/department.service";
import { Department } from "@/types/entity/department";
import { Combobox } from "@/components/shared/combobox";
import { RoleService } from "@/services/role.service";
import { Role } from "@/types/entity/role";
import { EmployeeService } from "@/services/employee.service";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const AddEmployeePage = () => {
  const {
    register,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeRequest>({
    resolver: zodResolver(EmployeeRequest),
    defaultValues: {
      baseSalary: 0,
      roleIds: [],
      numberOfDependents: 0,
    },
  });

  const addEmployeeMutation = useMutation({
    mutationKey: ["add_employee"],
    mutationFn: (data: EmployeeRequest) => EmployeeService.addEmployee(data),
    onSuccess: () => {
      toast.success("Success add employee");
      reset();
    },
    onError: () => toast.error("Failed to add employee"),
  });

  const onSubmit: SubmitHandler<EmployeeRequest> = (data: EmployeeRequest) => {
    addEmployeeMutation.mutate(data);
  };

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => DepartmentService.findAllDepartments(),
  });

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: () => RoleService.findAllRoles(),
  });

  return (
    <React.Fragment>
      <div className="mb-5">
        <h1 className="text-foreground text-2xl leading-tight font-semibold lg:text-3xl">
          Add New Employee
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Enter employee details to create a new employee record in the system.
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <h1 className="text-foreground text-lg leading-tight font-semibold lg:text-xl">
              Personal Information
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Provide basic personal details of the employee.
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <div className="space-y-1">
                <Label>Full Name</Label>
                <Label className="text-xs text-muted-foreground">
                  Enter the employee’s full legal name.
                </Label>
              </div>
              <div className="space-y-1">
                <Input
                  type="text"
                  placeholder="Enter full name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-destructive text-xs">
                    *{errors.name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 w-full">
              <Label>Gender</Label>
              <Label className="text-xs text-muted-foreground">
                Select the employee’s gender.
              </Label>
              <Select
                onValueChange={(value) => setValue("gender", value as Gender)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your company business sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="MAN">Man</SelectItem>
                    <SelectItem value="WOMAN">Woman</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-destructive text-xs">
                  *{errors.gender.message}
                </p>
              )}
            </div>

            <div className="space-y-2 w-full">
              <div className="space-y-1">
                <Label>Date of Birth</Label>
                <Label className="text-xs text-muted-foreground">
                  Select the employee’s date of birth.
                </Label>
              </div>
              <div className="space-y-1">
                <DatePicker
                  onChange={(value) =>
                    setValue("birthDate", value || "", {
                      shouldValidate: true,
                    })
                  }
                />
                {errors.birthDate && (
                  <p className="text-destructive text-xs">
                    *{errors.birthDate.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h1 className="text-foreground text-lg leading-tight font-semibold lg:text-xl">
              Contact Information
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Provide contact details for the employee.
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2 w-full">
              <div className="space-y-1">
                <Label>Email Address</Label>
                <Label className="text-xs text-muted-foreground">
                  Enter the employee’s active email address.
                </Label>
              </div>
              <div className="space-y-1">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-destructive text-xs">
                    *{errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 w-full">
              <div className="space-y-1">
                <Label>Phone Number</Label>
                <Label className="text-xs text-muted-foreground">
                  Enter the employee’s contact phone number.
                </Label>
              </div>
              <div className="space-y-1">
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <p className="text-destructive text-xs">
                    *{errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h1 className="text-foreground text-lg leading-tight font-semibold lg:text-xl">
              Payroll information
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Provide your company details so we can configure your workspace
              and ensure everything works smoothly.
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-4 w-full">
              <div className="space-y-1">
                <Label>Tax Identification Number</Label>
                <Label className="text-xs text-muted-foreground">
                  Enter the employee’s tax identification number.
                </Label>
              </div>
              <div className="space-y-1">
                <Input
                  type="text"
                  placeholder="Enter tax identification number"
                  {...register("taxId")}
                />
                {errors.taxId && (
                  <p className="text-destructive text-xs">
                    *{errors.taxId.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4 w-full">
              <div className="space-y-1">
                <Label>Base Salary</Label>
                <Label className="text-xs text-muted-foreground">
                  Enter the employee’s base salary.
                </Label>
              </div>
              <div className="space-y-1">
                <Input
                  type="number"
                  placeholder="Enter base salary"
                  {...register("baseSalary", { valueAsNumber: true })}
                />
                {errors.baseSalary && (
                  <p className="text-destructive text-xs">
                    *{errors.baseSalary.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center w-full space-x-4">
              <div className="space-y-2 w-full">
                <Label>Marriage Status</Label>
                <Label className="text-xs text-muted-foreground">
                  Select the employee’s marriage status.
                </Label>
                <Select
                  onValueChange={(value) =>
                    setValue("marriageStatus", value as MarriageStatus)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select marriage status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="SINGLE">Single</SelectItem>
                      <SelectItem value="MARRIED">Married</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.marriageStatus && (
                  <p className="text-destructive text-xs">
                    *{errors.marriageStatus.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 w-full">
                <div className="space-y-1">
                  <Label>Number of Dependents</Label>
                  <Label className="text-xs text-muted-foreground">
                    Enter the number of dependents supported by the employee.
                  </Label>
                </div>
                <div className="space-y-1">
                  <Select
                    value={String(watch("numberOfDependents"))}
                    onValueChange={(value) =>
                      setValue("numberOfDependents", Number(value))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select number of dependents" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.numberOfDependents && (
                    <p className="text-destructive text-xs">
                      *{errors.numberOfDependents.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h1 className="text-foreground text-lg leading-tight font-semibold lg:text-xl">
              Employment Information
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Define the employee’s position and work status.
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2 w-full">
              <Label>Department</Label>
              <Label className="text-xs text-muted-foreground">
                Select the department where the employee will be assigned.
              </Label>
              <Select
                onValueChange={(value) =>
                  setValue("departmentId", Number(value))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {departments?.data.map((department: Department) => (
                      <SelectItem
                        key={department.id}
                        value={department.id.toString()}
                      >
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.departmentId && (
                <p className="text-destructive text-xs">
                  *{errors.departmentId.message}
                </p>
              )}
            </div>
            <div className="flex justify-between items-center w-full space-x-4">
              <div className="space-y-2 w-full">
                <Label>Employee Status</Label>
                <Label className="text-xs text-muted-foreground">
                  Select the current employment status.
                </Label>
                <Select
                  onValueChange={(value) =>
                    setValue("employeeStatus", value as EmployeeStatus)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select employee status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="RESIGNED">Resigned</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.employeeStatus && (
                  <p className="text-destructive text-xs">
                    *{errors.employeeStatus.message}
                  </p>
                )}
              </div>
              <div className="space-y-2 w-full">
                <Label>Roles</Label>
                <Label className="text-xs text-muted-foreground">
                  Assign one or more roles to the employee.
                </Label>

                <Combobox
                  placeholder="Select roles"
                  contents={(roles?.data ?? []).map((role: Role) => ({
                    label: role.name,
                    value: role.id,
                  }))}
                  value={watch("roleIds")}
                  onValueChange={(values) =>
                    setValue("roleIds", values, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                />

                {errors.roleIds && (
                  <p className="text-destructive text-xs">
                    *{errors.roleIds.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end items-center mt-8">
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={addEmployeeMutation.isPending}
            >
              Add Employee
              <ArrowRight />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </React.Fragment>
  );
};

export default AddEmployeePage;
