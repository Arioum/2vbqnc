import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";
import Button from "../../components/ui/Button";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

type Props = {
  hotel?: HotelType;
  onSave: (HotelFormData: FormData) => void;
  onDelete: (hotelId: string) => void; // New onDelete handler
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, onDelete, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]); // Reset form when hotel changes

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append("hotelId", hotel._id);
    }

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  const handleDelete = () => {
    if (hotel) {
      onDelete(hotel._id); // Call onDelete with hotel ID
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
        <div className="flex justify-end items-center gap-4">
          {/* Conditionally show Delete button if hotel exists */}
          {hotel && (
            <Button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="flex items-center text-[#F9F9F8] p-3 px-8 h-full font-bold rounded-[4px] bg-red-600 hover:bg-red-700 disabled:bg-gray-300"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          )}
          <Button
            disabled={isLoading}
            type="submit"
            className="flex items-center text-[#F9F9F8] p-3 px-8 h-full font-bold rounded-[4px] bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
