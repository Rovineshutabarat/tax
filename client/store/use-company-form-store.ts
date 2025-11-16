import { create } from "zustand";
import { CompanyRequest } from "@/types/payload/request/company.request";

const STORAGE_KEY = {
  FORM_DATA: "company_form_data",
  FORM_CURRENT_STEP: "company_form_current_step",
} as const;

type CompanyFormStore = {
  currentStep: number;
  storedStep: number;
  setCurrentStep: (n: number) => void;
  loadStoredStep: () => void;
  saveStoredStep: (n: number) => void;

  formData: Partial<CompanyRequest> | null;
  loadFormData: () => void;
  setFormData: (data: Partial<CompanyRequest> | null) => void;
  discardChanges: () => void;
};

function storeFormData(data: Partial<CompanyRequest> | null) {
  if (data === null) {
    localStorage.removeItem(STORAGE_KEY.FORM_DATA);
  } else {
    localStorage.setItem(STORAGE_KEY.FORM_DATA, JSON.stringify(data));
  }
}

export const useCompanyFormStore = create<CompanyFormStore>((set, get) => ({
  currentStep: 1,
  storedStep: 1,
  formData: null,

  setCurrentStep: (n) => set({ currentStep: n }),

  loadStoredStep: () => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY.FORM_CURRENT_STEP);
    const step = saved ? Number(JSON.parse(saved)) : 1;

    set({
      currentStep: step,
      storedStep: step,
    });
  },

  saveStoredStep: (n) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY.FORM_CURRENT_STEP, JSON.stringify(n));

    set({
      currentStep: n,
      storedStep: n,
    });
  },
  loadFormData: () => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY.FORM_DATA);
    const data = saved ? (JSON.parse(saved) as Partial<CompanyRequest>) : null;

    set({
      formData: data,
    });
  },
  setFormData: (data: Partial<CompanyRequest> | null) => {
    if (data === null) {
      storeFormData(null);
      get().saveStoredStep(1);
      set({ formData: null, currentStep: 1, storedStep: 1 });
      return;
    }
    const merged = { ...get().formData, ...data };
    storeFormData(merged);
    set({ formData: merged });
  },
  discardChanges: () => {
    storeFormData(null);
    get().saveStoredStep(1);
    set({ formData: null, currentStep: 1, storedStep: 1 });
  },
}));
