"use client";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import CropperComp from "@/components/ui/Utils/Cropper";
import { ALLOWED_FILE_TYPES } from "@/lib/constants";
import useCrop from "@/lib/hooks/useCrop";
import getCroppedImg from "@/lib/utility/cropImage";
import { EventMediaFormData } from "@/lib/utility/types";
import { Label } from "@radix-ui/react-label";
import React, { ChangeEvent, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

function EventMedia() {
  const {
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<EventMediaFormData>();
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [bannerSrc, setBannerSrc] = useState<string | null>(null);
  const [imagetoCrop, setImageToCrop] = useState<{
    flag: "logoImageFile" | "bannerImageFile" | "";
    image: string | null;
  }>({
    flag: "",
    image: "",
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    aspectRatio,
    crop,
    croppedArea,
    onCropComplete,
    setAspectRatio,
    setCrop,
    setZoom,
    zoom,
  } = useCrop();

  const handleChange =
    (fieldName: keyof EventMediaFormData) =>
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      setValue(fieldName, file as any);
      const isValid = await trigger(fieldName);
      if (!isValid) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          if (fieldName === "bannerImageFile") {
            setBannerFile(file);
            setBannerSrc(reader.result as string);
            setImageToCrop({
              flag: "bannerImageFile",
              image: reader.result as string,
            });
            setAspectRatio(16 / 9);
          } else if (fieldName === "logoImageFile") {
            setLogoFile(file);
            setLogoSrc(reader.result as string);
            setImageToCrop({
              flag: "logoImageFile",
              image: reader.result as string,
            });
            setAspectRatio(1 / 1);
          }
          setOpen(true);
        }
      };
      reader.readAsDataURL(file);
    };

  const handleCrop = async () => {
    if (imagetoCrop.flag === "bannerImageFile") {
      if (!bannerFile) return;
      setLoading(true);
      try {
        const croppedImage = await getCroppedImg(
          bannerSrc as string,
          croppedArea
        );
        const croppedImageURL = URL.createObjectURL(croppedImage);
        const croppedFile = new File([croppedImage], bannerFile.name, {
          type: bannerFile.type,
        });
        setBannerFile(croppedFile);
        setBannerSrc(croppedImageURL);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setOpen(false);
      }
    } else if (imagetoCrop.flag === "logoImageFile") {
      if (!logoFile) return;
      try {
        const croppedImage = await getCroppedImg(
          logoSrc as string,
          croppedArea
        );
        const croppedImageURL = URL.createObjectURL(croppedImage);
        const croppedFile = new File([croppedImage], logoFile.name, {
          type: logoFile.type,
        });
        setLogoFile(croppedFile);
        setLogoSrc(croppedImageURL);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setOpen(false);
      }
    }
  };

  return (
    <div className="h-full p-16">
      <CropperComp
        crop={crop}
        onCropComplete={onCropComplete}
        setCrop={setCrop}
        setZoom={setZoom}
        zoom={zoom}
        open={open}
        setOpen={setOpen}
        aspectRatio={aspectRatio!}
        image={imagetoCrop.image!}
        handleSubmit={handleCrop}
        loading={loading}
      />
      <h1 className="mb-5">Event Media & Additional Options</h1>
      <div className="row flex gap-2 mb-5 ">
        {logoFile && logoSrc ? (
          <div className="logo-preview w-2/4 h-60 relative border border-black">
            <img
              src={logoSrc}
              alt="Profile"
              style={{
                objectFit: "contain", // Ensures the image covers the circle
                objectPosition: "center", // Ensures the image is centered
                width: "100%",
                height: "100%",
              }}
            />
            <div className="flex gap-2 absolute right-2 bottom-3">
              <i className="fa-solid fa-crop"></i>
              <i className="fa-solid fa-upload"></i>
            </div>
          </div>
        ) : (
          <div className="form-control flex flex-col gap-2 w-2/4">
            <Label
              htmlFor="logo"
              className="text-sm border border-blue-400 rounded-sm border-dashed py-24 text-center cursor-pointer"
            >
              Upload Logo <span className="text-red-600">*</span>
            </Label>
            <input
              hidden
              type="file"
              onChange={handleChange("logoImageFile")}
              id="logo"
              accept={ALLOWED_FILE_TYPES.join(", ")}
              className="bg-slate-100 h-10 px-3 rounded text-sm"
            />
            <small className="text-red-600">
              {errors.logoImageFile ? errors.logoImageFile.message : ""}
            </small>
          </div>
        )}
        {bannerFile && bannerSrc ? (
          <div className="banner-preview w-2/4 h-60 relative border border-black">
            <img
              src={bannerSrc}
              alt="Profile"
              style={{
                objectFit: "contain", // Ensures the image covers the circle
                objectPosition: "center", // Ensures the image is centered
                width: "100%",
                height: "100%",
              }}
            />
            <div className="flex gap-2 absolute right-2 bottom-3">
              <i className="fa-solid fa-crop"></i>
              <i className="fa-solid fa-upload"></i>
            </div>
          </div>
        ) : (
          <div className="form-control flex flex-col gap-2 w-2/4">
            <Label
              htmlFor="event-banner"
              className="text-sm border border-blue-400 rounded-sm border-dashed py-24 text-center cursor-pointer"
            >
              Upload Banner <span className="text-red-600">*</span>
            </Label>
            <input
              hidden
              type="file"
              onChange={handleChange("bannerImageFile")}
              id="event-banner"
              placeholder="Upload Banner"
              accept={ALLOWED_FILE_TYPES.join(", ")}
              className="bg-slate-100 h-10 px-3 rounded text-sm"
            />
            <small className="text-red-600">
              {errors.bannerImageFile ? errors.bannerImageFile.message : ""}
            </small>
          </div>
        )}
      </div>
      <div className="additionalSettings ">
        <h2 className="mb-5">Additional Settings</h2>

        <div className="flex flex-col pe-5 justify-between">
          <div className="form-control flex flex-col mb-5 gap-2 ">
            <Label htmlFor="allow-networking" className="text-sm">
              Rules & Instructions
            </Label>
            <Controller
              name="rulesAndInstructions"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Textarea
                  rows={10}
                  id="rulesAndInstructions"
                  {...field}
                  placeholder="Enter rules and instruction regarding the event"
                />
              )}
            />
            <small className="text-red-600">
              {errors.rulesAndInstructions
                ? errors.rulesAndInstructions.message
                : ""}
            </small>
          </div>
          <div className="form-control flex items-center mb-5 gap-5 ">
            <Label htmlFor="allow-networking" className="text-sm">
              Allow Networking{"(Connecting attendees Each other)"}:
            </Label>
            <Controller
              name="allowConnections"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Switch
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                  id="allow-networking"
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventMedia;
