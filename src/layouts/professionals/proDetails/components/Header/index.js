import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";
import breakpoints from "assets/theme/base/breakpoints";
import burceMars from "assets/images/logo.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";
import style from "./style.module.css";
import { LiaUserEditSolid } from "react-icons/lia";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

function Header({ info, modal }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute />
      <SoftBox
        position="relative"
        minHeight="17.5rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -9,
          mx: 3,
          py: 1.2,
          px: 2,
        }}
      >
        <Grid container alignItems="center" flexWrap="nowrap" justifyContent="space-around">
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <SoftAvatar
                src={burceMars}
                alt="profile-image"
                variant="rounded"
                size="xl"
                shadow="sm"
              />
            </Grid>
            <Grid item>
              <SoftBox height="100%" mt={0.5} lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium">
                  {`
                  ${info?.name}
                  `}
                </SoftTypography>
                <SoftTypography variant="button" color="text" fontWeight="medium">
                  {info?.phone}
                </SoftTypography>
              </SoftBox>
            </Grid>
          </Grid>
          <SoftBox>
          <Button color="primary" className=" flexitems-center text-[13px] h-[36px] w-[130px] mb-1" variant="ghost">
              <Link to="/professionals/editprofessional/:id" 
                    className="flex items-center space-x-2"
>
              Edit  <LiaUserEditSolid size={20} />
              </Link>
            </Button>
          </SoftBox>
        </Grid>
      </Card>
    </SoftBox>
  );
}

export default Header;
