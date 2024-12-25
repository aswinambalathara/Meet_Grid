import CropperComp from "@/components/ui/Utils/Cropper";
import { ALLOWED_FILE_TYPES } from "@/lib/constants";
import useCrop from "@/lib/hooks/useCrop";
import useImageUpload from "@/lib/hooks/useImageUpload";
import getCroppedImg from "@/lib/utility/cropImage";
import { url } from "inspector";
import React, { ChangeEvent, useState } from "react";

function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading,setLoading] = useState(false);
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

  const handleUpload = async () => {
    setLoading(true)
    console.log(file)
    if (!file) return;
    try {
      const croppedImage = await getCroppedImg(image as string, croppedArea);
      const croppedFile = new File([croppedImage], file.name, {
        type: file.type,
      });
      const uploadResponse = await useImageUpload(croppedFile)
      console.log(uploadResponse?.newImagePublicId,uploadResponse?.newImageURL)
      setOpen(false)
    } catch (error) {
        console.error(error)
    }finally{
      setLoading(false)
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setFile(file);
        setImage(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
    setAspectRatio(4 / 3);
    setOpen(true);

  };
  return (
    <>
<div
  className="image-container bg-gray-600 h-24 w-24 rounded-full"
  style={{
    backgroundImage: `url('https://res.cloudinary.com/dplrcgxwm/image/upload/v1735112527/images/profile/s2gz3wecswmuht1bniw6.jpg')`,
    backgroundSize: 'contain', // This makes the image cover the entire div
    backgroundPosition: 'center', // This centers the image
  }}
></div>

      <label
        className="text-sm cursor-pointer text-blue-800"
        htmlFor="profile-pic"
      >
        Upload Image
      </label>
      <input
        type="file"
        id="profile-pic"
        onChange={handleChange}
        hidden
        accept={ALLOWED_FILE_TYPES.join(", ")}
      />
      <CropperComp
        crop={crop}
        onCropComplete={onCropComplete}
        setCrop={setCrop}
        setZoom={setZoom}
        zoom={zoom}
        open={open}
        setOpen={setOpen}
        aspectRatio={aspectRatio!}
        image={image!}
        handleSubmit={handleUpload}
        loading={loading}
      />
    </>
  );
}

export default UploadImage;
