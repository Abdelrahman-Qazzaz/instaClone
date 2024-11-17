import { create } from "zustand";

type LoadingStore = {
  isLoading: boolean;
  setIsLoading: (arg0: boolean) => void;
};

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  setIsLoading: (value) => {
    set((state) => ({ ...state, isLoading: value }));
  },
}));
