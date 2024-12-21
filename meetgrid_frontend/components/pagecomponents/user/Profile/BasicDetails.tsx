"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import ProfileFormInput from "@/components/ui/Inputs/ProfileFormInput";
import { getUserProfile } from "@/lib/api/user/AuthorisedRoutes";
import React, {
  ChangeEvent,
  useCallback,
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

type LocationList = {
  phoneCodeList: Phonecodes[];
  countriesList: Country[];
  stateList: State[];
  cityList: City[];
  countryId: number;
  stateId: number;
  cityId: number;
};

type FormData = z.infer<typeof basicDetailsSchema>;

function BasicDetails() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<ProfileBasicFormData>({
    resolver: zodResolver(basicDetailsSchema),
    defaultValues: {
      fullName: "",
      email: "",
      bio: "",
      location: {
        addressLine: "",
        city: "",
        country: "",
        postalCode: "",
        state: "",
      },
      phone: "",
      phoneCode: "",
    },
    mode: "onChange",
  });

  const editBioRef = useRef<HTMLTextAreaElement | null>(null);
  const [isBioEditing, setBioEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [locationList, setLocationList] = useState<LocationList>({
    phoneCodeList: [],
    countriesList: [],
    stateList: [],
    cityList: [],
    countryId: 0,
    stateId: 0,
    cityId: 0,
  });
  const [location, setLocation] = useState({
    addressLine: "",
    city: "",
    state: "",
    country: "",
    postalCode: 0,
  });
  const [isEmailVerified, setVerification] = useState(true);

  const { ref, ...restBio } = register("bio");

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const data = await getUserProfile();
        reset(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserProfile();
  }, [reset]);

  useEffect(() => {
    GetPhonecodes().then((result) => {
      setLocationList((prev) => ({
        ...prev,
        phoneCodeList: result,
      }));
    });

    GetCountries().then((result) => {
      setLocationList((prev) => ({
        ...prev,
        countriesList: result,
      }));
    });
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
      setLocation((prev) => ({ ...prev, country: country?.name }));
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
      setLocation((prev) => ({ ...prev, state: state?.name }));
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
      setLocation((prev) => ({ ...prev, city: city?.name }));
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

  const handleBio = () => {
    //validte bio value and set it to the bio state as well as set it bio error
  };

  const handleFormSubmit = (data: FormData) => {
    console.log(data);
  };

  if (loading) return null;
  console.log(errors);
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="container overflow-y-auto h-full p-10 text-black flex flex-col">
      <div className="top-part flex items-start">
        <div className="left basis-1/6">
          <div className="image-container bg-gray-600 h-24 w-24 rounded-full"></div>
          <small>Upload Image</small>
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
                onBlur={handleBio}
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
          label="Full Name"
          id="fullName"
          type="text"
          placeholder="Full Name"
          mandatory
          {...register("fullName")}
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
              className="w-1/12 max-w-[100px] overflow-x-auto bg-white/50 rounded p-2 cursor-pointer"
            >
              {locationList.phoneCodeList.map((item, index) => (
                <option key={index} value={item.phone_code || ""}>
                  + {item.phone_code}
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
        >
          <AccordionItem value="item-1" className="px-2">
            <AccordionTrigger>Location</AccordionTrigger>
            <AccordionContent className="bg-slate-300/75 rounded mb-2 p-4 flex flex-col gap-4">
              <ProfileFormInput
                id="location.addressLine"
                label="Address Line"
                type="text"
                disabled={true}
                placeholder="Address Line"
                mandatory
              />
              <div className="address-row-2 flex items-center justify-between gap-2">
                <div className="w-full">
                  <Label className="text-sm">
                    Country<span className="text-red-600">*</span>
                  </Label>
                  <select
                    value={locationList.countryId || ""}
                    id="country-select"
                    onChange={handleCountrySelect}
                    className=" w-full bg-white/50 rounded p-2"
                  >
                    {locationList.countriesList.map((item, idx) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full">
                  <Label className="text-sm">
                    State<span className="text-red-600">*</span>
                  </Label>
                  <select
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
              </div>

              <div className="address-row-3 flex items-center justify-between gap-2">
                <div className="w-full">
                  <Label className="text-sm">
                    City<span className="text-red-600">*</span>
                  </Label>
                  <select
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

                <ProfileFormInput
                  id="location.postalCode"
                  label="Postal Code"
                  mandatory
                  type="text"
                  disabled={true}
                  placeholder="Postal Code"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

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
