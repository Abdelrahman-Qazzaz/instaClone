import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import { create } from "zustand";

export type AdditionalSettings = {
  getters: {
    hideLikesCount: boolean;
    disableCommenting: boolean;
  };
  setters: {
    setHideLikesCount: (arg0: boolean) => void;
    setDisableCommenting: (arg0: boolean) => void;
  };
};

export type CreatePostStore = {
  previewFiles: previewFile[];
  pushPreviewFiles: (arg0: previewFile[]) => void;
  deletePreviewFile: (previewFileId: number) => void;
  updatePreviewFile: (previewFileId: number, src: string) => void;

  caption: string;
  setCaption: (arg0: string) => void;

  additionalSettings: AdditionalSettings;
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
  updatePreviewFile: (previewFileId: number, src: string) => {
    set((state) => {
      const filteredArray = state.previewFiles.filter(
        (elem) => elem.id !== previewFileId
      );
      const oldPreviewFile = state.previewFiles.find(
        (elem) => elem.id === previewFileId
      );
      if (!oldPreviewFile) return { ...state, previewFiles: filteredArray };
      const updatedPreviewFile = { ...oldPreviewFile, src };
      return { ...state, previewFiles: [...filteredArray, updatedPreviewFile] };
    });
  },

  caption: "",
  setCaption: (caption: string) => {
    set((state) => ({ ...state, caption }));
  },

  additionalSettings: {
    getters: {
      hideLikesCount: false,
      disableCommenting: false,
    },
    setters: {
      setHideLikesCount: (hideLikesCount: boolean) => {
        set((state) => ({
          ...state,
          additionalSettings: {
            setters: { ...state.additionalSettings.setters },
            getters: { ...state.additionalSettings.getters, hideLikesCount },
          },
        }));
      },
      setDisableCommenting: (disableCommenting: boolean) => {
        set((state) => ({
          ...state,
          additionalSettings: {
            setters: { ...state.additionalSettings.setters },
            getters: { ...state.additionalSettings.getters, disableCommenting },
          },
        }));
      },
    },
  },
  setAdditionalSettings: (additionalSettings: AdditionalSettings) => {
    set((state) => {
      return { ...state, additionalSettings };
    });
  },
}));
