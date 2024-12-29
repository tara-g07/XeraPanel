import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import style from "./style.module.scss";
import { fetchApi, getxlxs } from "api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { handler } from "../../redux/loaderSlice";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Pagination,
  Modal,
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import accessPage from "helper/functios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MessageIcon from "@mui/icons-material/Message";
import Lotties from "layouts/noData/Lotties";
import LengthNumber from "components/lengthNumber";
import Options from "./options";
import image1 from "assets/images/profile.jpg";
import image2 from "assets/images/ivana-squares.jpg";
// import Description from "./modal/description";
import TextEditor from "./components/TextEditore";
import SoftButton from "components/SoftButton";

function Comments() {
  const dispatch1 = useDispatch();
  const userurl = "v1/api/admin/user/fetch";
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [number, setnumber] = useState();
  const [exelloading, setExelLoading] = useState(false);
  const [data, setData] = useState([]);
  const [haveFilter, setHaveFilter] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    if (data.length) {
      setStatusData(data.map((item) => ({ ...item, status: item.status || false })));
    }
  }, [data]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [enDatetime, setEnDatetime] = useState({
    start: "",
    end: "",
  });
  const [time, setTime] = useState({
    from: "",
    to: "",
  });

  const [birthTime, setBirthTime] = useState({
    from: "",
    to: "",
  });

  const inputFields = [
    { label: "Firstname", name: "fName", type: "text" },
    { label: "Lastname", name: "lName", type: "text" },
    { label: "Email", name: "email", type: "text" },
    { label: "Phone number", name: "phoneNumber", type: "number" },

    {
      label: "Gender",
      name: "gender",
      type: "select",
      options: ["male", "female"],
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleChangeNumber = (e) => {
    const { name, value } = e.target;
    if (/^\d{0,11}$/.test(value)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  const timeHandler = (e, type) => {
    const rightMonth = e.month.toString().padStart(2, "0");
    const rightDay = e.day.toString().padStart(2, "0");

    if (type === "birthFrom") {
      setBirthTime((prev) => ({
        ...prev,
        from: `${e.year}-${rightMonth}-${rightDay}`,
      }));
      setBirthDatetime((prev) => ({
        ...prev,
        start: `${e.year}-${rightMonth}-${rightDay}`,
      }));
    } else if (type === "birthTo") {
      setBirthTime((prev) => ({
        ...prev,
        to: `${e.year}-${rightMonth}-${rightDay}`,
      }));
      setBirthDatetime((prev) => ({
        ...prev,
        end: `${e.year}-${rightMonth}-${rightDay}`,
      }));
    } else {
      if (type === "from") {
        setTime((prev) => ({
          ...prev,
          from: `${e.year}-${rightMonth}-${rightDay}`,
        }));
        setEnDatetime((prev) => ({
          ...prev,
          start: `${e.year}-${rightMonth}-${rightDay}`,
        }));
      } else {
        setTime((prev) => ({
          ...prev,
          to: `${e.year}-${rightMonth}-${rightDay}`,
        }));
        setEnDatetime((prev) => ({
          ...prev,
          end: `${e.year}-${rightMonth}-${rightDay}`,
        }));
      }
    }
  };

  const fetchUsers = () => {
    dispatch1(handler(true));
    fetchApi(userurl, { page: currentPage }, "post").then((res) => {
      if (res?.status_code === 200) {
        dispatch1(handler(false));
        setData(res?.data);
        setnumber(res?.count);
        setTotalPages(res?.max_page);
      } else {
        dispatch1(handler(false));
        toast.error("  Something went wrong!");
      }
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    if (accessPage("Users")) {
      navigate("/inaccessibility");
    }
  }, []);

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const toggleStatus = (idx) => {
    const updatedStatus = statusData.map((item, index) =>
      idx === index ? { ...item, status: !item.status } : item
    );
    setStatusData(updatedStatus);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className=" mt-4">
        <SoftBox>
          <SoftBox mb={3}>
            <Card style={{ position: "relative" }}>
              <SoftBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={4}
                style={{ left: "200px", top: "10px" }}
              >
                <LengthNumber title=" Comments:" number={number?.toLocaleString()} />
              </SoftBox>
              <SoftBox
              overflow="auto"
                sx={{
                  "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                      borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                    },
                  },
                }}
              >
                {data ? (
                  <table className={style.ManagersTable}>
                    <thead>
                      <tr>
                        <th>Row</th>
                        <th>Professionals</th>
                        <th>User</th>
                        <th>Created at</th>
                        <th>Description</th>
                        <th>Rating</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {statusData?.map((item, index) => (
                        <tr key={index}>
                          <td>{(currentPage - 1) * 12 + index + 1}</td>
                          <td>{item.lName}</td>
                          <td>{item.lName}</td>
                          <td>{item.dateTime.slice(0, 10)}</td>
                          <td>
                            <Button onPress={onOpen}> View detail </Button>
                          </td>
                          <td>★★★★★</td>
                          <td>
                            <button
                              onClick={() => toggleStatus(index)}
                              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ease-in-out
      ${
        item.status
          ? "bg-green-500 text-white hover:bg-green-600 hover:shadow-lg focus:ring-green-500"
          : "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg focus:ring-red-500"
      }
      focus:outline-none focus:ring-2 focus:ring-offset-2`}
                            >
                              {item.status ? "Active" : "Inactive"}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <Lotties />
                )}
              </SoftBox>
              <SoftBox
                display="flex"
                flexDirection=""
                justifyContent="center"
                alignItems="center"
                p={3}
              >
                {data && totalPages !== 1 && (
                  <Pagination
                    showControls
                    page={currentPage}
                    total={totalPages}
                    initialPage={1}
                    onChange={handlePageChange}
                  />
                )}
           <Modal classNames={{ backdrop: "z-[9999]", wrapper: "z-[9999]" }} isOpen={isOpen} onOpenChange={onOpenChange} >
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Description</ModalHeader>
              <ModalBody style={{overflowY:"auto" ,maxHeight:"500px",fontSize:16}}>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
          
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
              </SoftBox>
            </Card>
          </SoftBox>
          <Card className="mt-[15px] p-[15px]">
            <div className="sm:text-[14px] gap-5 text-[12px] text-gray-400 flex justify-between">
              <span>
                © All rights of this site belong to XeraKar company. Any copying is prosecuted.
              </span>
            </div>
          </Card>
        </SoftBox>
      </div>
    </DashboardLayout>
  );
}

export default Comments;
