// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function Footer() {
  return (
    <SoftBox mt={8} sx={{ overflow: "hidden" }}>
      <Grid container justifyContent="center">
        {/* <Grid item xs={10} lg={8}>
          <SoftBox display="flex" justifyContent="center" flexWrap="wrap" mb={3}>
            <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                Company
              </SoftTypography>
            </SoftBox>
            <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                About Us
              </SoftTypography>
            </SoftBox>
            <SoftBox mr={{ xs: 0, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                Team
              </SoftTypography>
            </SoftBox>
            <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                Product
              </SoftTypography>
            </SoftBox>
            <SoftBox mr={{ xs: 2, lg: 3, xl: 6 }}>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                Blog
              </SoftTypography>
            </SoftBox>
            <SoftBox>
              <SoftTypography component="a" href="#" variant="body2" color="secondary">
                Pricing
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </Grid> */}
        <Grid item xs={12} lg={8}>
          <SoftBox display="flex" justifyContent="center" mt={1} mb={3}>
            <SoftBox mr={3} color="secondary">
              <FacebookIcon fontSize="large" />
            </SoftBox>
            <SoftBox mr={3} color="secondary">
              <TwitterIcon fontSize="large" />
            </SoftBox>
            <SoftBox mr={3} color="secondary">
              <InstagramIcon fontSize="large" />
            </SoftBox>
            <SoftBox mr={3} color="secondary">
              <PinterestIcon fontSize="large" />
            </SoftBox>
            <SoftBox color="secondary">
              <LinkedInIcon fontSize="large" />
            </SoftBox>
          </SoftBox>
        </Grid>
        <Grid item xs={12} my={4} lg={8} sx={{ textAlign: "center", overflow: "hidden" }}>
          <SoftTypography variant="body2" color="secondary" style={{fontSize:14}}>
            &copy; 
            All rights of this site belong to XeraKar company. Any copying is prosecuted.
          </SoftTypography>
        </Grid>
      </Grid>
    </SoftBox>
  );
}

export default Footer;
