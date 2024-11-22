import { create } from "zustand";

export type ToastStore = {
  display: boolean;
  setDisplay: (arg0: boolean) => void;
  message: string;
};

export const useToastStore = create<ToastStore>((set) => ({
  display: false,
  setDisplay: (display) => {
    set((state) => ({
      ...state,
      display,
    }));
  },
  message: "",
}));
