import { create } from "zustand";

type PanelProperties = {
  display: boolean;
  show: () => void;
};

export type PanelsStore = {
  [key: string]: any;
  closeAll: () => void;
  viewStoryOrVisitProfilePanel: PanelProperties;
  createPostPanel: PanelProperties;
};

export const usePanelsStore = create<PanelsStore>((set) => ({
  closeAll: () => {
    set((state) => {
      const newState = { ...state };
      for (const key in newState) {
        if (newState[key].display !== undefined) {
          newState[key].display = false;
        }
      }
      return newState;
    });
  },
  viewStoryOrVisitProfilePanel: {
    display: false,
    show: () => {
      set((state) => ({
        ...state,
        viewStoryOrVisitProfilePanel: {
          ...state.viewStoryOrVisitProfilePanel,
          display: true,
        },
      }));
    },
  },
  createPostPanel: {
    display: false,
    show: () => {
      set((state) => ({
        ...state,
        createPostPanel: {
          ...state.createPostPanel,
          display: true,
        },
      }));
    },
  },
}));
