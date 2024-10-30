import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import React, { useState } from "react";
import ReactCrop, { type Crop } from "react-image-crop";

export const CreatePostPanelCropMediaSection = ({
  previewFiles,
  setPreviewFiles,
}: {
  previewFiles: previewFile[];
  setPreviewFiles: React.Dispatch<React.SetStateAction<previewFile[]>>;
}) => {
  const [crop, setCrop] = useState<Crop>();

  return (
    <>
      {previewFiles.map((previewFile) => (
        <>
          <ReactCrop
            crop={crop}
            onChange={(c, percentageCrop) => {
              setCrop(c);
              setPreviewFiles((prev) => {
                const filteredArray = prev.filter(
                  (elem) => elem.id !== previewFile.id
                );
                const oldPreviewFile = prev.find(
                  (elem) => elem.id === previewFile.id
                );
                if (!oldPreviewFile) return filteredArray;

                const updatedPreviewFile = {
                  ...oldPreviewFile,
                  dimensions: percentageCrop,
                };

                console.log([...filteredArray, updatedPreviewFile]);

                return [...filteredArray, updatedPreviewFile];
              });
            }}
          >
            {previewFile.type === "image" && <img src={previewFile.src} />}
            {previewFile.type === "video" && <video src={previewFile.src} />}
          </ReactCrop>
        </>
      ))}
    </>
  );
};
