import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";
import Stack from "@mui/material/Stack";
import validate from "./validate";
import { fetchApi } from "api";
import { Button, Input, Textarea } from "@nextui-org/react";
import FileUploader from "components/fileuploader/uploader";

export default function EditIntroForm() {
  const addProUrl = "v1/api/admin/agent/add";
  const navigate = useNavigate();
  const [focus, setFocus] = useState({});
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    title: "",
    Description: "",
    img: "",
  });


  const deleteHandler = () => {
    navigate("/slider/intro", { replace: true });
  };

  useEffect(() => {
    setErrors(validate(data));
  }, [data, focus]);

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
        addProUrl,
        {
          username: data.username,
          link: data.link,
          Description: data.Description,
        },
        "post"
      ).then((res) => {
        //(res);
        if (res.status_code === 200) {
          toast.success("Intro edited successfully! ");
          navigate("/slider/intro");
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
        Description: true,
        img: true,
      });
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      <div className={style.addContainer}>
        <form className={`${style.contantAddForm} flex justify-center gap-4`}>
          <div className="flex flex-col p-5 w-full md:w-[50%]">
            <div className={style.formItem}>
              <Input
                color="light"
                type="text"
                name="username"
                onFocus={focusHandler}
                onChange={changeHandler}
                classNames={{
                  input: ["text-[14px]"],
                }}
                variant="bordered"
                labelPlacement="outside"
                label=" Title  "
                isInvalid={errors.username && focus.username}
              />
            </div>

            <div className="mt-4">
              <Textarea
                variant="bordered"
                color=""
                label="Description"
                labelPlacement="outside"
                placeholder="Enter your description"
                className="text-gray-700 !w-[90%] "
              />
            </div>
          </div>

          <div className={`w-1/3 relative`}>
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
            Edit
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