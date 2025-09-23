import location_pin from "../assets/images/homepage/location-pin.svg";
import React, { useEffect, useState } from "react";
import { Select, notification } from "antd";
import { _get_cities_by_state_code } from "../common/axios_services";
import { useNavigate } from "react-router-dom";

const SearchRestaurant = () => {
  const [allLgas, setAllLgas] = useState([]);
  const [selectedLGA, setSelectedLGA] = useState("");
  const navigate = useNavigate();

  // Notification handler
  const openNotificationWithIcon = (type, title, message) => {
    notification[type]({
      message: title,
      description: message,
      placement: "bottomRight",
    });
  };

  // Fetch LGAs for Lagos using API
  const fetchCities = async (state_code = "LA", keyword = "") => {
    try {
      const uploadedCities = await _get_cities_by_state_code(
        state_code,
        keyword
      );
      setAllLgas(uploadedCities.data.data);
    } catch (err) {
      setAllLgas([]);
      if (err.response) {
        openNotificationWithIcon(
          err?.response?.data?.status || "error",
          err?.response?.data?.title || "Error",
          err?.response?.data?.message || "Something went wrong"
        );
      } else {
        openNotificationWithIcon("error", "Error", err.message);
      }
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // Handle Search Button Click
  const handleSearch = () => {
    if (selectedLGA) {
      navigate(`/restaurant?lga=${encodeURIComponent(selectedLGA)}`);
    } else {
      openNotificationWithIcon(
        "warning",
        "Select Local Area",
        "Please select a Local Area before searching."
      );
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center gap-5 lg:py-5">
      <div className="relative w-full search">
        <span className="absolute left-4 lg:left-6 top-1/2 transform -translate-y-1/2">
          <img src={location_pin} alt="location" />
        </span>
        <Select
          placeholder="Search Restaurant in your Local Area"
          className="w-full rounded-full bg-[#9B9B9B] h-[4rem] text-white placeholder:text-white text-base"
          onChange={(value) => setSelectedLGA(value)}
        >
          {allLgas.map((lga) => (
            <Select.Option key={lga.id} value={lga.city_name}>
              {lga.city_name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <button
        onClick={handleSearch}
        className="py-3 px-8 h-[4rem] rounded-full bg-[#44843F] text-white font-bold text-sm lg:text-sm max-sm:w-full"
      >
        Search
      </button>
    </div>
  );
};

export default SearchRestaurant;
