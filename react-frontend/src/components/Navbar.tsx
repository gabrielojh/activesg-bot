import {
  AppBar,
  Box,
  Button,
  Input,
  SvgIcon,
  Toolbar,
  Typography,
} from "@mui/material";
import CloudUpload from "@mui/icons-material/CloudUpload";
import SportsTennisOutlinedIcon from "@mui/icons-material/SportsTennisOutlined";
import ColourButton from "./ColourButton";
import FileUploadButton from "./FileUploadButton";

const Navbar = () => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <SvgIcon component={SportsTennisOutlinedIcon} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Badminton Venues
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <FileUploadButton />
            <ColourButton />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
