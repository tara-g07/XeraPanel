import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Card from "@mui/material/Card";
import accessPage from "helper/functios";
import EditAdvisementForm from "./editAdvismentForm";

function EditAdvisement() {
  const navigate = useNavigate();

  useEffect(() => {
    if (accessPage("advisement", "add")) {
      navigate("/inaccessibility");
    }
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card style={{ overflow: "auto" }}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">
                Edit Advisement 
              </SoftTypography>
            </SoftBox>
              <EditAdvisementForm/>
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
    </DashboardLayout>
  );
}

export default EditAdvisement;