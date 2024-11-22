import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import { api } from "./api";
import { AdditionalSettings } from "@/store/useCreatePostStore";

export async function sharePost(
  previewFiles: previewFile[],
  caption: string,
  additional_settings: AdditionalSettings["getters"]
): Promise<[null, any] | [unknown, null]> {
  const formData = new FormData();
  await appendPreviewFiles(previewFiles, formData);
  formData.append("caption", caption);
  formData.append("additional_settings", JSON.stringify(additional_settings));

  try {
    const { data } = await api.request.post("/posts", formData);

    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

async function appendPreviewFiles(
  previewFiles: previewFile[],
  formData: FormData
) {
  for (const previewFile of previewFiles) {
    const response = await fetch(previewFile.src);
    const blob = await response.blob();
    formData.append("files", blob);
  }
}
