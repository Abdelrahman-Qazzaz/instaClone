import { create } from "zustand";

type offsetStore = {
  marginLeft: string | number;
  marginTop: string | number;
  marginBottom: string | number;

  updateOffset: Function;
};

export const useOffsetStore = create<offsetStore>((set) => ({
  marginLeft: 0,
  marginTop: 0,
  marginBottom: 0,

  updateOffset: (payload: {
    marginLeft?: string | number;
    marginTop?: string | number;
    marginBottom?: string | number;
  }) => {
    set((state) => ({ ...state, ...payload }));
  },
}));
