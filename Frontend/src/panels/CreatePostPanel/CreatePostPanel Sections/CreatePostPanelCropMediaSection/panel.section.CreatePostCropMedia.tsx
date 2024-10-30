import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import { useState } from "react";
import { Button } from "react-bootstrap";
import ReactCrop, { type Crop } from "react-image-crop";

export const CreatePostPanelCropMediaSection = ({
  previewFiles,
}: {
  previewFiles: previewFile[];
}) => {
  const [crop, setCrop] = useState<Crop>();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels>(
    { x: 0, y: 0, width: 0, height: 0 }
  );
  //
  const handleCrop = async (
    image: string,
    croppedAreaPixels: CroppedAreaPixels
  ) => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    console.log(croppedImage);
  };
  //

  return (
    <>
      {previewFiles.map((previewFile) => (
        <>
          <ReactCrop
            crop={crop}
            onChange={(c) => {
              console.log(c);
              setCroppedAreaPixels(c);
              setCrop(c);
            }}
          >
            {previewFile.type === "image" && <img src={previewFile.src} />}
            {previewFile.type === "video" && <video src={previewFile.src} />}
          </ReactCrop>
          <Button
            onClick={() => handleCrop(previewFile.src, croppedAreaPixels)}
          >
            Crop
          </Button>
        </>
      ))}
    </>
  );
};

//
// canvasUtils.ts
export interface CroppedAreaPixels {
  x: number; // The x-coordinate in pixels
  y: number; // The y-coordinate in pixels
  width: number; // The width in pixels
  height: number; // The height in pixels
}

export default async function getCroppedImg(
  imageSrc: string,
  pixelCrop: CroppedAreaPixels
): Promise<string | null> {
  const image = new Image();
  image.src = imageSrc;

  return new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to the size of the cropped area
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;

      // Draw the cropped image onto the canvas
      if (ctx) {
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );

        // Convert the canvas to a Blob
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "croppedImage.jpeg", {
              type: "image/jpeg",
            });
            resolve(URL.createObjectURL(file)); // Resolve with the Object URL
          } else {
            reject(new Error("Canvas is empty"));
          }
        }, "image/jpeg");
      } else {
        reject(new Error("Failed to get canvas context"));
      }
    };

    image.onerror = () => {
      reject(new Error("Failed to load the image"));
    };
  });
}

//
