import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import React, { useState, useRef, CSSProperties, useEffect } from "react";
import { Button } from "react-bootstrap";
import ReactCrop, { type Crop } from "react-image-crop";

export const CropMedia = ({
  mediaStyle,
  previewFile,
  setPreviewFiles,
}: {
  mediaStyle: CSSProperties;
  previewFile: previewFile;
  setPreviewFiles: React.Dispatch<React.SetStateAction<previewFile[]>>;
}) => {
  const [crop, setCrop] = useState<Crop>();
  const [ReactCropWidth, setReactCropWidth] = useState<number>();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const vidRef = useRef<HTMLVideoElement | null>(null);

  // set ReactCrop's width to exactly mactch the img/video element.
  useEffect(() => {
    if (imgRef) setReactCropWidth(imgRef.current?.clientWidth);
    if (vidRef) setReactCropWidth(vidRef.current?.clientWidth);
  }, [imgRef, vidRef]);

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

      return [...filteredArray, updatedPreviewFile];
    });
  };

  const getCroppedVideo = async (previewFile: previewFile) => {
    console.log("dnipsa");
    if (!vidRef.current || !crop) return;

    const video = vidRef.current;

    if (video.readyState < 2) {
      console.warn("Video is not ready to be processed");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      video,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
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
        previewFile.type === "video" ? "video/mp4" : "image/jpeg"
      );
    });

    const croppedVideoUrl = URL.createObjectURL(blob);

    setPreviewFiles((prev) => {
      const filteredArray = prev.filter((elem) => elem.id !== previewFile.id);

      const oldPreviewFile = prev.find((elem) => elem.id === previewFile.id);
      if (!oldPreviewFile) return [...filteredArray];

      const updatedPreviewFile = { ...oldPreviewFile, src: croppedVideoUrl };

      console.log(updatedPreviewFile);
      return [...filteredArray, updatedPreviewFile];
    });
  };

  async function handleClick() {
    if (imgRef) await getCroppedImage(previewFile);
    if (vidRef) await getCroppedVideo(previewFile);
  }

  return (
    <>
      <ReactCrop
        style={{
          border: "2px solid red",
          width: ReactCropWidth,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        crop={crop}
        onChange={(c) => {
          setCrop(c);
        }}
      >
        {previewFile.type === "image" && (
          <img style={mediaStyle} ref={imgRef} src={previewFile.src} />
        )}
        {previewFile.type === "video" && (
          <video
            src={previewFile.src}
            ref={vidRef}
            style={mediaStyle}
            autoPlay={true}
          />
        )}
      </ReactCrop>

      <Button
        style={{
          marginTop: "0.5rem",
          border: "2px solid red",
          position: "relative",
        }}
        onClick={async () => await handleClick()}
      >
        Done
      </Button>
    </>
  );
};
