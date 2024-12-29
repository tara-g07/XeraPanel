import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
// import { AiFillStop } from "react-icons/ai";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { green } from "@mui/material/colors";
// import validate from "./validate";
// import { fetchApi } from "api";
import { Button, Input, SelectItem } from "@nextui-org/react";
import { Select } from "@nextui-org/react";
import countriesData from "../countries/countries.json";
import animationData from "assets/animation/Animation.json";
import Lottie from "react-lottie-player";

export default function AddCityForm() {
  // const addCityUrl = "v1/api/admin/agent/add";
  const [selectedCountry, setSelectedCountry] = useState("");
  const [newCity, setNewCity] = useState("");
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    country: "",
    city: "",
  });
  const navigate = useNavigate();

  const ButtonStyle = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[800]),
    backgroundColor: red[800],
    width: 150,
    "&:hover": {
      backgroundColor: red[700],
    },
  }));
  const ButtonStyle2 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[800]),
    width: 150,
    backgroundColor: green[800],
    "&:hover": {
      backgroundColor: green[700],
    },
  }));

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setData({ ...data, country: value });
  };

  const handleCityInput = (e) => {
    setNewCity(e.target.value);
    setData({ ...data, city: e.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (data.country && data.city) {
      const countryExists = countriesData.some(
        (country) => country.country === data.country
      );

      if (countryExists) {
        toast.success("City added successfully!");
        navigate("/city");
      } else {
        // Add new country if it doesn't exist
        countriesData.push({
          country: data.country,
        });
        toast.success("City added successfully!");
        navigate("/city");
      }
    } else {
      toast.error("Please fill in both the country and city fields.");
    }
  };

  const deleteHandler = () => {
    navigate("/city", { replace: true });
  };

  useEffect(() => {
    console.log("Data State: ", data); // Debugging
  }, [data]);

  //   useEffect(() => {
  //     setErrors(validate(data));
  //   }, [data, focus]);

  const focusHandler = (event) => {
    setFocus({ ...focus, [event.target.name]: true });
  };

  return (
    <>
      <div className={style.addContainer}>
        <form className={`${style.contantAddForm} justify-center gap-4`}>
          <div className="w-[45%] flex flex-col !gap-y-4 md:flex md:justify-center">
            <div className={style.formItem}>
            <Select
              color="light"
              name="country"
              onChange={(value) => handleCountryChange(value)}
              value={selectedCountry}
              className="text-[14px]"
              variant="bordered"
              labelPlacement="outside"
              label="Country"
            >
              {countriesData.map((country) => (
                <SelectItem key={country.name} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </Select>
            </div>

            <div className={style.formItem}>
              <Input
                color="light"
                type="text"
                name="city"
                value={newCity}
                onFocus={focusHandler}
                onChange={handleCityInput}
                classNames={{
                  input: ["text-[14px] mt-2"],
                }}
                // isInvalid={errors.city && focus.city}
                variant="bordered"
                labelPlacement="outside"
                label="City"
              />
            </div>
          </div>

        <Lottie loop animationData={animationData} play className="w-[45%] max-sm:hidden" />
        </form>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          mb={10}
          mt={10}
        >
          <Button
            variant="solid"
            className="w-[130px] h-[40px] bg-[#15a380] text-green-50 ml-3"
            onClick={submitHandler}
          >
            ADD
          </Button>
          <Button
            variant="flat"
            className="w-[130px] bg-red-500 text-white "
            onClick={deleteHandler}
          >
            {" "}
            Cancel{" "}
          </Button>
        </Stack>
      </div>
    </>
  );
}
