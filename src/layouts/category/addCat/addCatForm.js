import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import validate from "./validate";
import { fetchApi } from "api";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import FileUploader from "components/fileuploader/uploader";

export default function AddCatForm() {
  const addCatUrl = "v1/api/admin/agent/add";
  const navigate = useNavigate();
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [statusSelect, setStatusSelect] = useState(["active", "inactive"]);

  const [data, setData] = useState({
    title: "",
    description: "",
    status: "",
    img: "",
  });

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
  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to cancel?")) {
      navigate("/category", { replace: true });
    }
  };

  //   useEffect(() => {
  //     setErrors(validate(data));
  //   }, [data, focus]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const focusHandler = (event) => {
    setFocus({ ...focus, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      console.log(data);

      fetchApi(
        addCatUrl,
        {
          title: data.title,
          descriprion: data.description,
          status: data.status,
          img: data.img,
        },
        "post"
      ).then((res) => {
        //(res);
        if (res.status_code === 200) {
          toast.success(" Category added successfully! ");
          navigate("/category");
        } else if (res.status_code === 401) {
          if (res.description === "unauthorized") {
            navigate("/login", { replace: true });
          }
        } else if (res.status_code === 402) {
          toast.error(res.description_fa_user);
        }
      });
    } else {
      setFocus({
        title: true,
        description: true,
        status: true,
        img: true,
      });
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Generate preview URL
    }
  };
  const selectChange = (value) => {
    setData({
      ...data,
      status: value, // Assuming you want to update the 'status' field in `data`
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the API call or form submission logic here
    console.log("Category name:", categoryName);
    console.log("Selected image:", categoryImage);
  };

  return (
    <>
       <div className={style.addContainer}>
        <form className={`${style.contantAddForm} flex md:flex-row flex-col justify-center `}>
          <div className="flex flex-col p-5 w-full md:w-[50%]">
          <div className="grid sm:grid-cols-2  gap-4  ">
            <div className={style.formItem}>
              <Input
                color="light"
                type="text"
                name="title"
                onFocus={focusHandler}
                onChange={changeHandler}
                className="w-full"
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" Title "
                isInvalid={errors.username && focus.username}
              />
            </div>
            <div className={style.formItem}>
              <Select
                color="light"
                name="status"
                // onFocus={focusHandler}
                onChange={(e) => selectChange(e)}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label="Status"
                // isInvalid={errors.phone && focus.phone}
              >
                {statusSelect.map((item) => (
                  <SelectItem key={item}>{item}</SelectItem>
                ))}
              </Select>
            </div>
            </div>

            <div className="mt-4">
              <Textarea
                variant="bordered"
                label="Description"
                labelPlacement="outside"
                placeholder="Enter your description"
                className="text-gray-700 !h-[150px] !w-full"
              />
            </div>
            </div>
          <div className=" md:w-1/2 relative">
            <FileUploader />
          </div>
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
            Add
          </Button>
          <Button
            variant="flat"
            className="w-[130px] bg-red-500 text-white "
            onClick={deleteHandler}
          >
            Cancel
          </Button>
        </Stack>
      </div>
    </>
  );
}
