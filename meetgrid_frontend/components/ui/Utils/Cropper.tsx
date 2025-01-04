"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import Cropper from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "../slider";
import { Label } from "../label";
import { Button } from "../button";

type CropImageProps = {
  image: string;
  crop: { x: number; y: number };
  zoom: number;
  aspectRatio: number;
  rotation?: number;
  setCrop: Dispatch<SetStateAction<{ x: number; y: number }>>;
  setZoom: Dispatch<SetStateAction<number>>;
  setAspectRatio?: Dispatch<SetStateAction<number | undefined>>;
  setRotation?: Dispatch<SetStateAction<number>>;
  onCropComplete: (croppedAreaPercentage: any, croppedAreaPixels: any) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleSubmit:()=>Promise<void>
  loading:boolean
};

function CropperComp({
  aspectRatio,
  image,
  open,
  setOpen,
  crop,
  onCropComplete,
  zoom,
  setZoom,
  setCrop,
  handleSubmit,
  loading
}: CropImageProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle>Crop Image</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="relative w-full h-96">
          <Cropper
            image={image}
            crop={crop}
            aspect={aspectRatio}
            zoom={zoom}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onCropChange={setCrop}
          />
        </div>
        <div className="controls flex flex-col gap-5 items">
          <div className="control flex flex-col gap-5">
            <Label>Zoom</Label>
            <Slider
              min={1}
              max={3}
              step={0.1}
              className="cursor-pointer"
              value={[zoom]}
              onValueChange={(value) => setZoom(value[0])}
            />
          </div>
          <Button onClick={handleSubmit}>{loading ? 'Uploading...' : 'Upload Image'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CropperComp;
