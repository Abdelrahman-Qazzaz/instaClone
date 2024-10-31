import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ReactCrop, { type Crop } from "react-image-crop";

export const CreatePostPanelCropMediaSection = ({
  previewFileIndex,
  previewFiles,
  setPreviewFiles,
}: {
  previewFileIndex: number;
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
      <Button onClick={() => {}}>Next</Button>
    </>
  );
};

/*
const handleUpload = async () => {
  if (!croppedImage || !file || !croppedAreaPixels) return;

  // Create a FormData object
  const formData = new FormData();

  // Append the original file
  formData.append("file", file);

  // Create a Blob from the cropped image URL
  const response = await fetch(croppedImage);
  const blob = await response.blob();

  // Append the cropped image as a Blob
  formData.append("croppedImage", blob, "croppedImage.jpeg");

  // Create dimensions object
  const dimensions = {
    unit: "%",
    x: croppedAreaPixels.x,
    y: croppedAreaPixels.y,
    width: croppedAreaPixels.width,
    height: croppedAreaPixels.height,
  };

  // Append dimensions as JSON string
  formData.append("dimensions", JSON.stringify(dimensions));

  // Replace with your API endpoint
  await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
};

*/
