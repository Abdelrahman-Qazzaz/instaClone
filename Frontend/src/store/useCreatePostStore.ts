import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import { create } from "zustand";

type AdditionalSettings = {
  hideLikesCount: boolean;
  disableCommenting: boolean;
};

export type CreatePostStore = {
  previewFiles: previewFile[];
  pushPreviewFiles: (arg0: previewFile[]) => void;
  deletePreviewFile: (previewFileId: number) => void;

  caption: string;
  setCaption: (arg0: string) => void;

  additionalSettings: AdditionalSettings;
  setAdditionalSettings: (arg0: AdditionalSettings) => void;
};

export const useCreatePostStore = create<CreatePostStore>((set) => ({
  previewFiles: [],
  pushPreviewFiles: (previewFiles: previewFile[]) => {
    set((state) => {
      const updatedPreviewFiles = [...state.previewFiles, ...previewFiles];
      return {
        ...state,
        previewFiles: updatedPreviewFiles,
      };
    });
  },
  deletePreviewFile: (previewFileId: number) => {
    set((state) => {
      const previewFiles = state.previewFiles.filter(
        (previewFile) => previewFile.id !== previewFileId
      );
      return { ...state, previewFiles };
    });
  },

  caption: "",
  setCaption: (caption: string) => {
    set((state) => ({ ...state, caption }));
  },

  additionalSettings: {
    hideLikesCount: false,
    disableCommenting: false,
  },
  setAdditionalSettings: (additionalSettings: AdditionalSettings) => {
    set((state) => {
      return { ...state, additionalSettings };
    });
  },
}));
