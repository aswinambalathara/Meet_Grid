import CropperComp from "@/components/ui/Utils/Cropper";
import IUser from "@/interfaces/IUser";
import { updateProfileImage } from "@/lib/api/user/AuthorisedRoutes";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import useCrop from "@/lib/hooks/useCrop";
import useImageUpload from "@/lib/hooks/useImageUpload";
import getCroppedImg from "@/lib/utility/cropImage";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

type uploadImageProps = {
  oldImage?: { url: string; public_id: string };
  setData: Dispatch<SetStateAction<IUser>>;
};

function UploadImage({ oldImage, setData }: uploadImageProps) {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
    setLoading(true);
    if (!file) return;
    try {
      const croppedImage = await getCroppedImg(image as string, croppedArea);
      const croppedFile = new File([croppedImage], file.name, {
        type: file.type,
      });
      const uploadResponse = await useImageUpload(croppedFile);
      //console.log(uploadResponse?.newImagePublicId,uploadResponse?.newImageURL)
      if (uploadResponse) {
        const updateImage = await updateProfileImage({
          imageURL: uploadResponse?.newImageURL,
          public_id: uploadResponse?.newImagePublicId,
        });
        setData((prev) => ({
          ...prev,
          image: updateImage.data.image,
        }));
        toast.success(updateImage.message);
      }
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]!;
    if (!file) return;

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Only JPEG and PNG is files are allowed");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File size should be less than 5Mb");
      return;
    }
    setError('') // resetting Errors
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setFile(file);
        setImage(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
    setAspectRatio(1 / 1);
    setOpen(true);
  };
  return (
    <>
      <div
        className="image-container bg-gray-600 h-24 w-24 rounded-full overflow-hidden"
        style={{
          position: "relative",
          width: "96px", // 24 * 4
          height: "96px", // 24 * 4
        }}
      >
        <img
          src={oldImage?.url}
          alt="Profile"
          style={{
            objectFit: "cover", // Ensures the image covers the circle
            objectPosition: "center", // Ensures the image is centered
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
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
      <small className="text-red-600">{error}</small>
      </div>
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
