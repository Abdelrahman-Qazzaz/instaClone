import { create } from "zustand";

type PromptProperties = {
  display: boolean;
  show: () => void;
};

export type PromptsStore = {
  [key: string]: any;
  closeAll: () => void;
  viewStoryOrVisitProfilePrompt: PromptProperties;
};

export const usePromptsStore = create<PromptsStore>((set) => ({
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
  viewStoryOrVisitProfilePrompt: {
    display: false,
    show: () => {
      set((state) => ({
        ...state,
        viewStoryOrVisitProfilePrompt: {
          ...state.viewStoryOrVisitProfilePrompt,
          display: true,
        },
      }));
    },
  },
}));
