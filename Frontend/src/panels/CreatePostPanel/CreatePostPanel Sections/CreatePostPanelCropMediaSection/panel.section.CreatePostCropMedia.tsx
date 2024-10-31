import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import ReactCrop, { type Crop } from "react-image-crop";

export const CreatePostPanelCropMediaSection = ({
  previewFiles,
  setPreviewFiles,
}: {
  previewFiles: previewFile[];
  setPreviewFiles: React.Dispatch<React.SetStateAction<previewFile[]>>;
}) => {
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement | null>(null);

  const getCroppedImage = async (previewFile: previewFile) => {
    if (!imgRef.current || !crop) return;

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      imgRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (b) => {
          resolve(b!);
        },
        previewFile.type === "image" ? "image/jpeg" : "video/mp4"
      );
    });

    const croppedImageUrl = URL.createObjectURL(blob);

    setPreviewFiles((prev) => {
      const filteredArray = prev.filter((elem) => elem.id !== previewFile.id);

      const oldPreviewFile = prev.find((elem) => elem.id === previewFile.id);
      if (!oldPreviewFile) return [...filteredArray];

      const updatedPreviewFile = { ...oldPreviewFile, src: croppedImageUrl };

      console.log(updatedPreviewFile);
      return [...filteredArray, updatedPreviewFile];
    });
  };

  return (
    <>
      {previewFiles.map((previewFile) => (
        <div key={previewFile.id}>
          <ReactCrop
            crop={crop}
            onChange={(c) => {
              setCrop(c);
            }}
          >
            {previewFile.type === "image" && (
              <img ref={imgRef} src={previewFile.src} />
            )}
            {previewFile.type === "video" && <video src={previewFile.src} />}
          </ReactCrop>
        </div>
      ))}
      <Button
        onClick={() => {
          previewFiles.forEach(
            async (previewFile) => await getCroppedImage(previewFile)
          );
        }}
      >
        Next
      </Button>
    </>
  );
};
