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
import ColourButton from "../ColourButton";
import { useState } from "react";

const Navbar = () => {
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
    console.log("Selected file:", file);
  };

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
            <input
              accept=".csv" 
              id="file-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<CloudUpload />}
              >
                Upload CSV
              </Button>
            </label>
            <ColourButton />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
