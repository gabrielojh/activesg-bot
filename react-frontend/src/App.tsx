import { useColorScheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { Box, Container, CssBaseline, Divider } from "@mui/material";
import SearchForm from "./components/SearchForm";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { setMode } = useColorScheme();

  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container sx={{ marginTop: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <SearchForm />
          <Divider variant="middle" flexItem sx={{ marginTop: 5 }}>
            Input your search criteria above
          </Divider>
        </Box>
      </Container>
    </>
  );
}

export default App;
