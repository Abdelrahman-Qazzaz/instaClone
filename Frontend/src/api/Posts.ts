import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import { api } from "./api";
import { AdditionalSettings } from "@/store/useCreatePostStore";

export async function sharePost(
  previewFiles: previewFile[],
  caption: string,
  additionalSettings: AdditionalSettings["getters"]
): Promise<[null, any] | [unknown, null]> {
  try {
    const { data } = await api.request.post("/posts", {
      params: {
        previewFiles,
        caption,
        additionalSettings,
      },
    });

    return [null, data];
  } catch (error) {
    return [error, null];
  }
}
