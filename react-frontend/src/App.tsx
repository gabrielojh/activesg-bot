import { useColorScheme } from "@mui/material/styles";
import Navbar from "./components/Navbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { Box, Container, CssBaseline, Divider } from "@mui/material";
import SearchForm from "./components/SearchForm";
import VenueList from "./components/VenueList";
import VenueCard from "./components/VenueCard";
import { Venue } from "./types/Venue";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { setMode } = useColorScheme();

  useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const [venues, setVenues] = useState<Venue[]>([]);

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container sx={{ marginTop: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <SearchForm setVenues={setVenues} />
          <Divider variant="middle" flexItem sx={{ marginY: 5 }}>
            Input your search criteria above
          </Divider>
          <VenueList venues={venues} />
          {/* <VenueCard /> */}
        </Box>
      </Container>
    </>
  );
}

export default App;
