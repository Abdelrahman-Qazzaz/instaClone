import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import { useState } from "react";
import ReactCrop, { type Crop } from "react-image-crop";

export const CreatePostPanelCropMediaSection = ({
  previewFiles,
}: {
  previewFiles: previewFile[];
}) => {
  const [crop, setCrop] = useState<Crop>();
  return (
    <>
      {previewFiles.map((previewFile) => (
        <ReactCrop
          crop={crop}
          onChange={(c) => {
            console.log(c);
            /*
            {
  "x": 33.2421875,
  "y": 23.921875,
  "width": 365.92578125,
  "height": 224.40625,
  "unit": "px"
}
            */
            setCrop(c);
          }}
        >
          {previewFile.type === "image" && <img src={previewFile.src} />}
          {previewFile.type === "video" && <video src={previewFile.src} />}
        </ReactCrop>
      ))}
    </>
  );
};
