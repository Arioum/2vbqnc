import { useMutation, useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import { useState } from "react";
import axios from "axios";

const EditHotel = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useAppContext();
  const { hotelId } = useParams();
  const navigate = useNavigate(); // To redirect after delete

  // Fetch hotel data by ID
  const { data: hotel, isLoading: isFetching } = useQuery(
    ["fetchMyHotelById", hotelId],
    () => apiClient.fetchMyHotelById(hotelId || ""),
    { enabled: !!hotelId } // Ensure hotelId is defined
  );

  // Mutation to update hotel details
  const updateHotelMutation = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel saved successfully!", type: "SUCCESS" });
      navigate("/all-listings");
    },
    onError: () => {
      showToast({ message: "Error saving hotel.", type: "ERROR" });
    },
  });

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this hotel?")) {
      setIsDeleting(true);
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/admin/delete-hotel/${hotelId}`, {
          withCredentials: true,
        });
        showToast({ message: "Hotel deleted successfully!", type: "SUCCESS" });
        navigate("/all-listings"); // Redirect after deletion
      } catch (error) {
        showToast({ message: "Error deleting hotel.", type: "ERROR" });
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleSave = (hotelFormData: FormData) => {
    updateHotelMutation.mutate(hotelFormData);
  };

  if (isFetching) {
    return <div>Loading hotel details...</div>;
  }

  return <ManageHotelForm hotel={hotel} onSave={handleSave} onDelete={handleDelete} isLoading={isDeleting} />;
};

export default EditHotel;
