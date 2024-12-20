import { DarkModeOutlined, WbSunnyOutlined } from "@mui/icons-material";
import { IconButton, useColorScheme } from "@mui/material";

const ColourButton = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  const toggleMode = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  console.log("Mode = " + mode);

  return (
    <IconButton onClick={toggleMode}>
      {mode === "dark" && <DarkModeOutlined />}
      {mode === "light" && <WbSunnyOutlined sx={{ color: "white" }}/>}
    </IconButton>
  );
};

export default ColourButton;
