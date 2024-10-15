import { create } from "zustand";

type PanelProperties = {
  display: boolean;
  toggle: () => void;
};

export type PanelsStore = {
  viewStoryOrVisitProfilePanel: PanelProperties;
};

export const usePanelsStore = create<PanelsStore>((set) => ({
  viewStoryOrVisitProfilePanel: {
    display: false,
    toggle: () => {
      set((state) => ({
        ...state,
        viewStoryOrVisitProfilePanel: {
          ...state.viewStoryOrVisitProfilePanel,
          display: true,
        },
      }));
    },
  },
}));
