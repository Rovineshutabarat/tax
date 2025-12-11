"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideArrowRight } from "lucide-react";
import { DepartmentRequest } from "@/types/payload/request/department.request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DepartmentService } from "@/services/department.service";
import { toast } from "sonner";

const CreateDepartmentPage = () => {
  const queryClient = useQueryClient();

  const form = useForm<DepartmentRequest>({
    resolver: zodResolver(DepartmentRequest),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const createDepartmentMutation = useMutation({
    mutationKey: ["create_department"],
    mutationFn: (data: DepartmentRequest) =>
      DepartmentService.createDepartment(data),
    onSuccess: () => toast.success("Success creating department"),
    onError: () => toast.error("Failed to create department"),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  const onSubmit: SubmitHandler<DepartmentRequest> = (
    data: DepartmentRequest,
  ) => {
    createDepartmentMutation.mutate(data);
  };

  return (
    <div className="space-y-6 mt-5">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Department Information</CardTitle>
              <CardDescription>
                Enter the basic information of the department.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Human Resources" {...field} />
                    </FormControl>
                    <FormDescription>
                      The official name of the department.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the department..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A brief explanation of the department’s function.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex items-center justify-end">
              <Button type="submit" className="cursor-pointer">
                Create Department
                <LucideArrowRight />
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default CreateDepartmentPage;
