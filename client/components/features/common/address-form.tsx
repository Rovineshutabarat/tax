"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCompanyFormStore } from "@/store/use-company-form-store";

type AddressFormRequest = {
  fieldName: string;
  register: any;
  setValue: any;
  errors?: any;
};

export default function AddressForm({
  fieldName,
  register,
  setValue,
  errors,
}: AddressFormRequest) {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [isProvinceInitialized, setIsProvinceInitialized] = useState(false);

  const { formData } = useCompanyFormStore();

  useEffect(() => {
    fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`,
      )
        .then((res) => res.json())
        .then((data) => setCities(data));
    } else {
      setCities([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (provinces.length > 0 && !isProvinceInitialized) {
      const savedProvinceName = (formData as any)[fieldName]?.province;

      if (savedProvinceName) {
        const prov = provinces.find((p) => p.name === savedProvinceName);
        if (prov) {
          setSelectedProvince(prov.id.toString());
          setValue(`${fieldName}.province`, prov.name);
        }
      }

      setIsProvinceInitialized(true);
    }
  }, [provinces, formData, fieldName, setValue, isProvinceInitialized]);

  useEffect(() => {
    if (cities.length > 0) {
      const savedCity = (formData as any)[fieldName]?.city;

      if (savedCity) {
        const cityExists = cities.find((c) => c.name === savedCity);
        if (cityExists) {
          setSelectedCity(savedCity);
          setValue(`${fieldName}.city`, savedCity);
        }
      }
    }
  }, [cities, formData, fieldName, setValue]);

  return (
    <div className="space-y-6">
      <div className="space-y-2 w-full">
        <div className="space-y-1">
          <Label>Street Address</Label>
          <Label className="text-xs text-muted-foreground">
            Enter your street address including building number or apartment
            unit.
          </Label>
        </div>
        <Input
          type="text"
          placeholder="Enter your street address"
          {...register(`${fieldName}.street`)}
        />
        {errors?.street && (
          <p className="text-xs text-destructive">*{errors.street.message}</p>
        )}
      </div>

      <div className="space-y-2 w-full">
        <div className="space-y-1">
          <Label>Province</Label>
          <Label className="text-xs text-muted-foreground">
            Select the province where you currently reside.
          </Label>
        </div>
        <Select
          value={selectedProvince}
          onValueChange={(value) => {
            const selected = provinces.find((p) => p.id.toString() === value);
            if (!selected) return;

            setSelectedProvince(value);
            setValue(`${fieldName}.province`, selected.name);
            setValue(`${fieldName}.city`, "");
            setSelectedCity("");
            setCities([]);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select province" />
          </SelectTrigger>

          <SelectContent>
            {provinces.map((prov) => (
              <SelectItem key={prov.id} value={prov.id.toString()}>
                {prov.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.province && (
          <p className="text-xs text-destructive">*{errors.province.message}</p>
        )}
      </div>

      <div className="space-y-2 w-full">
        <div className="space-y-1">
          <Label>City / Regency</Label>
          <Label className="text-xs text-muted-foreground">
            Select the city or regency corresponding to the selected province.
          </Label>
        </div>
        <Select
          value={selectedCity}
          disabled={!selectedProvince || cities.length === 0}
          onValueChange={(value) => {
            setSelectedCity(value);
            setValue(`${fieldName}.city`, value);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select city or regency" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.id} value={city.name}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.city && (
          <p className="text-xs text-destructive">*{errors.city.message}</p>
        )}
      </div>

      <div className="space-y-2 w-full">
        <div className="space-y-1">
          <Label>Postal Code</Label>
          <Label className="text-xs text-muted-foreground">
            Enter the postal code for the selected street address.
          </Label>
        </div>
        <Input
          type="number"
          placeholder="Enter your postal code"
          {...register(`${fieldName}.postalCode`)}
        />
        {errors?.postalCode && (
          <p className="text-xs text-destructive">
            *{errors.postalCode.message}
          </p>
        )}
      </div>
    </div>
  );
}
