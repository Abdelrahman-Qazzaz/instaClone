import { previewFile } from "@/panels/CreatePostPanel/panel.CreatePost";
import { useLoadingStore } from "@/store/useLoadingStore";
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
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  // set ReactCrop's width to exactly mactch the img/video element.
  useEffect(() => {
    if (imgRef) setReactCropWidth(imgRef.current?.clientWidth);
    if (vidRef) setReactCropWidth(vidRef.current?.clientWidth);
  }, [imgRef, vidRef]);

  async function handleClick() {
    setIsLoading(true);
    if (imgRef) await getCroppedImage(previewFile);
    if (vidRef) await getCroppedVideo(previewFile);
    setIsLoading(false);
  }

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
    if (!vidRef.current || !crop) return;

    // Create a canvas element to draw frames
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get the video metadata (duration, width, height, etc.)
    const video = vidRef.current;
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    // Calculate the crop's scale
    const scaleX = videoWidth / video.clientWidth;
    const scaleY = videoHeight / video.clientHeight;

    // Set canvas size to match the crop dimensions
    canvas.width = crop.width;
    canvas.height = crop.height;

    // Create a stream to capture the cropped video
    const stream = canvas.captureStream(video.playbackRate);

    // Create a MediaRecorder to encode the cropped video
    const mimeType = "video/webm";
    const options = { mimeType };
    const mediaRecorder = new MediaRecorder(stream, options);
    const chunks: Blob[] = [];

    mediaRecorder.ondataavailable = (event) => {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      // Once recording is stopped, we can process the video blob
      const blob = new Blob(chunks, { type: mimeType });

      // Create a URL for the blob
      const croppedVideoUrl = URL.createObjectURL(blob);

      // Update the preview file with the cropped video URL
      setPreviewFiles((prev) => {
        const filteredArray = prev.filter((elem) => elem.id !== previewFile.id);

        const oldPreviewFile = prev.find((elem) => elem.id === previewFile.id);
        if (!oldPreviewFile) return [...filteredArray];

        const updatedPreviewFile = { ...oldPreviewFile, src: croppedVideoUrl };
        console.log(updatedPreviewFile);
        return [...filteredArray, updatedPreviewFile];
      });
    };

    // Draw the frames to the canvas and record
    video.currentTime = 0; // Start from the beginning
    video.play();

    video.ontimeupdate = () => {
      if (video.paused || video.ended) return;

      // Clear canvas before drawing new frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the cropped part of the current video frame onto the canvas
      ctx.drawImage(
        video,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    };

    // Start recording the video frames
    mediaRecorder.start();

    // Stop recording after the video duration
    setTimeout(() => {
      mediaRecorder.stop();
    }, video.duration * 1000); // Stop recording after the video has finished
  };

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
        {previewFile.type === "image" ? (
          <img style={mediaStyle} ref={imgRef} src={previewFile.src} />
        ) : (
          <video style={mediaStyle} ref={vidRef} src={previewFile.src} />
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
