"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import ProfileFormInput from "@/components/ui/Inputs/ProfileFormInput";
import {sendEmailVerification, updateBasicDetails, verifyEmailOTP } from "@/lib/api/user/AuthorisedRoutes";
import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { basicDetailsSchema } from "@/lib/utility/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  GetCity,
  GetCountries,
  GetPhonecodes,
  GetState,
} from "react-country-state-city";
import {
  Phonecodes,
  City,
  Country,
  State,
} from "react-country-state-city/dist/esm/types";
import "react-country-state-city/dist/react-country-state-city.css";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { ProfileBasicFormData } from "@/lib/utility/types";
import IUser from "@/interfaces/IUser";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

type LocationList = {
  phoneCodeList: Phonecodes[];
  countriesList: Country[];
  stateList: State[];
  cityList: City[];
  countryId: number;
  stateId: number;
  cityId: number;
  phoneCodeId: number;
};

type FormData = z.infer<typeof basicDetailsSchema>;

function BasicDetails({ data }: { data: IUser}) {
  console.log(data)
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ProfileBasicFormData>({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: {
      fullName: data.fullName || "",
      email: data.email || "",
      bio: data.bio || "",
      location: {
        addressLine: data.location?.addressLine || "",
        city: data.location?.city || '',
        country: data.location?.country || "",
        postalCode:data.location?.postalCode || "",
        state: data.location?.state || "",
      },
      phone: data.phone || '',
      phoneCode: "",
    },
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const editBioRef = useRef<HTMLTextAreaElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen,setModalOpen] = useState(false);
  const [timer,setTimer] = useState(0);
  const [otp,setOtp] = useState('')
  const [otpError,setOTPError] = useState('')
  const [isBioEditing, setBioEditing] = useState(false);
  const [locationList, setLocationList] = useState<LocationList>({
    phoneCodeList: [],
    countriesList: [],
    stateList: [],
    cityList: [],
    countryId: 0,
    stateId: 0,
    cityId: 0,
    phoneCodeId: 0,
  });
  const [isEmailVerified, setVerification] = useState(true);
  const { ref, ...restBio } = register("bio");

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const [phonesCodes, countries] = await Promise.all([
          GetPhonecodes(),
          GetCountries(),
        ]);
        setLocationList((prev) => ({
          ...prev,
          phoneCodeList: phonesCodes,
          countriesList: countries,
        }));
        reset(data);
      } catch (error) {
        console.error("Error fetching phoncodes, countries: ", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCountrySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const countryId = Number(e.target.value);
    const country = locationList.countriesList.find((c) => c.id === countryId);
    if (country) {
      GetState(country.id).then((result) =>
        setLocationList((prev) => ({
          ...prev,
          stateList: result,
          countryId: country.id,
        }))
      );
    }
  };

  const handleStateSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!locationList.countryId) return;
    const stateId = Number(e.target.value);
    const state = locationList.stateList.find((s) => s.id === stateId);
    if (state) {
      GetCity(locationList.countryId, state.id).then((result) =>
        setLocationList((prev) => ({
          ...prev,
          cityList: result,
          stateId: state.id,
        }))
      );
    }
  };

  const handleCitySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!locationList.stateId) return;
    const cityId = Number(e.target.value);
    const city = locationList.cityList.find((cty) => cty.id === cityId);
    if (city) {
      setLocationList((prev) => ({
        ...prev,
        cityId: city.id,
      }));
    }
  };

  const handlePhoneCodeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const phoneCodeId = Number(e.target.value);
    const phoneCode = locationList.phoneCodeList.find(
      (p) => p.id === phoneCodeId
    );
    if (phoneCode) {
      setLocationList((prev) => ({
        ...prev,
        phoneCodeId: phoneCode.id,
      }));
    }
  };

  const handleBioEdit = () => {
    const elem = editBioRef.current;
    if (elem) {
      elem.disabled = !elem.disabled;
      elem.focus();
    }
    setBioEditing(!isBioEditing);
  };

  const handleSendEmailVerification = async() =>{
    if(timer !== 0){
      return 
    }
      setTimer(30);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      try {
        const result = await sendEmailVerification(data.email);
        setModalOpen(true);
        toast.success(result.message);
      } catch (error) {
        if(error instanceof Error){
          toast.error(error.message)
          setModalOpen(false)
          setTimer(0)
          clearInterval(interval)
        }
      }
  }

  const handleVerifyEmailOTP = async () =>{
    if(otp.length < 6){
      setOTPError('OTP must be 6 digits')
      return
    }
    if(isNaN(Number(otp))){
      setOTPError('Invalid OTP')
      return
    }
    try {
      const result = await verifyEmailOTP(otp)
      toast.success(result.message);
      setVerification(true)
      setModalOpen(false)
    } catch (error) {
      if(error instanceof Error){
        setOTPError(error.message)
      }
    }
  }

  const handleFormSubmit = async (formData: FormData) => {
    if(data.email !== formData.email){
      setVerification(false)
      handleSendEmailVerification()
      return
    }

    if(isEmailVerified){
      try {
        const result = await updateBasicDetails(formData);
        reset(result.data);
        toast.success('Basic Details updated');
      } catch (error) {
        if(error instanceof Error){
          toast.error(error.message)
        }
      }
    }
  };

  if (loading) return null;
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="container overflow-y-auto h-full p-10 text-black flex flex-col"
    >
      <div className="top-part flex items-start">
        <div className="left basis-1/6">
          <div className="image-container bg-gray-600 h-24 w-24 rounded-full"></div>
          <label
            className="text-sm cursor-pointer text-blue-800"
            htmlFor="profile-pic"
          >
            Upload Image
          </label>
          <input type="file" id="profile-pic" hidden />
        </div>

        <div className="right basis-5/6">
          <h3 className="font-semibold text-black text-lg">{"Aswin Nair"}</h3>
          <div className="bio w-full mt-2">
            <label htmlFor="bio" className="text-sm">
              Bio
            </label>
            <div className="relative">
              <textarea
                {...restBio}
                disabled={!isBioEditing}
                ref={(e) => {
                  ref(e);
                  editBioRef.current = e;
                }}
                id="bio"
                placeholder="enter something about you"
                rows={5}
                className="text-black rounded-lg w-full p-1 px-2 text-sm bg-white/50"
              />
              <i
                className={`fa-regular ${
                  !isBioEditing && "fa-pen-to-square text-blue-900"
                } absolute right-3 top-3 cursor-pointer`}
                onClick={handleBioEdit}
              ></i>
            </div>
            <small className="text-red-600">
              {errors.bio ? errors.bio.message : ""}
            </small>
          </div>
        </div>
      </div>

      <div className="form-section flex flex-col gap-3">
        <ProfileFormInput
          {...register("fullName")}
          label="Full Name"
          id="fullName"
          type="text"
          placeholder="Full Name"
          mandatory
          error={errors.fullName ? errors.fullName.message : ""}
        />
        <ProfileFormInput
          {...register("email")}
          type="email"
          label="Email Address"
          id="email"
          placeholder="Email"
          mandatory
          error={errors.email ? errors.email.message : ""}
        />
        <div className="phone-input-wrapper">
          <Label>
            Phone <span className="text-red-600">*</span>
          </Label>
          <div className="flex items-center justify-between gap-2">
            <select
              {...register("phoneCode")}
              value={
                locationList.phoneCodeId || locationList.phoneCodeList[0].id
              }
              onChange={handlePhoneCodeSelect}
              className="w-1/12 max-w-[100px] overflow-x-hidden bg-white/50 rounded p-2 cursor-pointer"
            >
              {locationList.phoneCodeList.map((item) => (
                <option key={item.id} value={item.id}>
                  + {item.phone_code} {item.name}
                </option>
              ))}
            </select>
            <ProfileFormInput
              id="phone"
              type="text"
              {...register("phone")}
              placeholder="Phone Number"
            />
          </div>
          <small className="ms-2 text-red-600">
            {errors.phoneCode
              ? errors.phoneCode.message
              : errors.phone
              ? errors.phone.message
              : ""}
          </small>
        </div>

        <Accordion
          type="single"
          className="bg-white/50  rounded-md mt-2"
          collapsible
          defaultValue="item-1"
        >
          <AccordionItem value="item-1" className="px-2">
            <AccordionTrigger>Location</AccordionTrigger>
            <AccordionContent className="bg-slate-300/75 rounded mb-2 p-4 flex flex-col gap-4">
              <ProfileFormInput
                {...register("location.addressLine")}
                id="location.addressLine"
                label="Address Line"
                type="text"
                disabled={false}
                placeholder="Address Line"
                mandatory
                error={
                  errors.location?.addressLine
                    ? errors.location.addressLine.message
                    : ""
                }
              />
              <div className="address-row-2 flex items-center justify-between gap-2">
                <div className="w-full">
                  <div>
                    <Label className="text-sm">
                      Country<span className="text-red-600">*</span>
                    </Label>
                    <select
                      {...register("location.country")}
                      value={locationList.countryId || locationList.countriesList[0].id}
                      id="country-select"
                      onChange={handleCountrySelect}
                      className=" w-full bg-white/50 rounded p-2"
                    >
                      {locationList.countriesList.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <small className="ms-2 text-red-600">
                    {errors.location?.country
                      ? errors.location.country.message
                      : ""}
                  </small>
                </div>

                <div className="w-full">
                  <div>
                    <Label className="text-sm">
                      State<span className="text-red-600">*</span>
                    </Label>
                    <select
                      {...register("location.state")}
                      id="state-select"
                      onChange={handleStateSelect}
                      className="w-full bg-white/50 rounded p-2"
                      value={locationList.stateId || ""}
                    >
                      {locationList.stateList.map((item, idx) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <small className="ms-2 text-red-600">
                    {errors.location?.state
                      ? errors.location.state.message
                      : ""}
                  </small>
                </div>
              </div>

              <div className="address-row-3 flex items-start justify-between gap-2">
                <div className="w-full">
                  <div>
                    <Label className="text-sm">
                      City<span className="text-red-600">*</span>
                    </Label>
                    <select
                      {...register("location.city")}
                      id="city-select"
                      onChange={handleCitySelect}
                      className="w-full bg-white/50 rounded h-10 px-2"
                      value={locationList.cityId || ""}
                    >
                      {locationList.cityList.map((item, idx) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <small className="ms-2 text-red-600">
                    {errors.location?.city ? errors.location.city.message : ""}
                  </small>
                </div>

                <ProfileFormInput
                  {...register("location.postalCode")}
                  id="location.postalCode"
                  label="Postal Code"
                  mandatory
                  type="text"
                  disabled={false}
                  placeholder="Postal Code"
                  error={
                    errors.location?.postalCode
                      ? errors.location.postalCode.message
                      : ""
                  }
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <AlertDialog open={isModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between">
              Email OTP Verification!
              <Button
                variant={"outline"}
                onClick={() => setModalOpen(false)}
                className="hover:bg-slate-600 hover:text-white"
                size={"sm"}
              >
                <i className="fa-solid fa-xmark"></i>
              </Button>
            </AlertDialogTitle>
            <AlertDialogDescription>
              We have sent an <b>OTP</b> to {getValues('email')}.
            </AlertDialogDescription>
            <Input
              placeholder="Enter OTP to continue"
              maxLength={6}
              onChange={(e)=>setOtp(e.target.value)}
            />
            <small className="text-red-600">{otpError}</small>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
            onClick={handleSendEmailVerification}
              className="bg-white text-black border border-black hover:bg-black hover:text-white"
            >
              {timer !==0 ? `Resend OTP in ${timer}`:'Resend OTP'}
            </AlertDialogAction>
            <AlertDialogAction onClick={handleVerifyEmailOTP}>
              Submit OTP
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

        <div className="flex items-center justify-center mt-3">
          <Button
            size={"lg"}
            type="submit"
            className="bg-violet-700 text-white "
          >
            Update Basic Details
          </Button>
        </div>
      </div>
    </form>
  );
}

export default BasicDetails;
