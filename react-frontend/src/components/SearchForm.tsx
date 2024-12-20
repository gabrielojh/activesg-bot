import { Autocomplete, Box, Chip, debounce, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { getVenues } from "../api/searchApi";
import { SearchCriteria } from "../types/SearchCriteria";
import { Venue } from "../types/Venue";

export type SearchFormProps = {
  setVenues: React.Dispatch<React.SetStateAction<Venue[]>>;
};

const SearchForm = ({ setVenues }: SearchFormProps) => {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    venue: [],
    date: undefined,
  });

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSearchCriteria({ ...searchCriteria, date: date?.format("YYYY-MM-DD") });
  };

  const handleVenuesChange = (_: React.SyntheticEvent, value: string[]) => {
    setSearchCriteria({ ...searchCriteria, venue: value });
  };

  const debouncedFetchData = useCallback(
    debounce(async (searchCriteria: SearchCriteria) => {
      try {
        const results = await getVenues(searchCriteria);
        setVenues(results);
      } catch (error) {
        console.error("Error fetching venues:", error);
      }
    }, 500),
    [setVenues]
  );

  useEffect(() => {
    debouncedFetchData(searchCriteria);
  }, [searchCriteria, debouncedFetchData]);

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Enter Desired Dates (Optional)"
          onChange={handleDateChange}
          sx={{ flex: 1 }}
        />
      </LocalizationProvider>
      <Autocomplete
        multiple
        options={venue_list.map((option) => option.venue)}
        freeSolo
        onChange={handleVenuesChange}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip variant="filled" label={option} key={key} {...tagProps} />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Enter Venues"
            placeholder="Badminton Venues"
          />
        )}
        sx={{ flex: 2 }}
      />
    </Box>
  );
};

const venue_list = [
  { venue: "Ahmad Ibrahim Secondary School Hall" },
  { venue: "Beacon Primary School Hall" },
  { venue: "Beatty Secondary School Hall" },
  { venue: "Bedok Green Primary School Hall" },
  { venue: "Bedok South Secondary School Hall" },
  { venue: "Bendemeer Primary School Hall" },
  { venue: "Bendemeer Secondary School Hall" },
  { venue: "Bishan Clubhouse" },
  { venue: "Bishan Sport Hall" },
  { venue: "Boon Lay Secondary School Hall" },
  { venue: "Bukit Canberra Sport Hall" },
  { venue: "Bukit Gombak Sport Hall" },
  { venue: "Bukit Panjang Government High School Hall" },
  { venue: "Bukit Panjang Primary School Hall" },
  { venue: "Canberra Primary School Hall" },
  { venue: "Canberra Secondary School Hall" },
  { venue: "Cantonment Primary School Hall" },
  { venue: "Casuarina Primary School Hall" },
  { venue: "Choa Chu Kang Sport Hall" },
  { venue: "Clementi Primary School Hall" },
  { venue: "Clementi Sport Hall" },
  { venue: "Clementi Town Secondary School Hall" },
  { venue: "Concord Primary School Hall" },
  { venue: "Dazhong Primary School Hall" },
  { venue: "Delta Sport Hall" },
  { venue: "Deyi Secondary School Hall" },
  { venue: "Dunman High School Hall" },
  { venue: "East Spring Primary School Hall" },
  { venue: "Endeavour Primary School Hall" },
  { venue: "Fengshan Primary School Hall" },
  { venue: "Fern Green Primary School Hall" },
  { venue: "First Toa Payoh Primary School Hall" },
  { venue: "Frontier Primary School Hall" },
  { venue: "Fuhua Secondary School Hall" },
  { venue: "Gan Eng Seng Primary School Hall" },
  { venue: "Greendale Primary School Hall" },
  { venue: "Greenridge Secondary School Hall" },
  { venue: "Greenwood Primary School Hall" },
  { venue: "Heartbeat @ Bedok ActiveSG Sport Hall" },
  { venue: "Henry Park Primary School Hall" },
  { venue: "Hua Yi Secondary School Hall" },
  { venue: "Jiemin Primary School Hall" },
  { venue: "Junyuan Secondary School Hall" },
  { venue: "Jurong East Sport Hall" },
  { venue: "Jurong Secondary School Hall" },
  { venue: "Jurongville Secondary School Hall" },
  { venue: "Kuo Chuan Presbyterian Primary School Hall" },
  { venue: "Lakeside Primary School Hall" },
  { venue: "Lianhua Primary School Hall" },
  { venue: "Loyang View Secondary School Hall" },
  { venue: "Marsiling Primary School Hall" },
  { venue: "Marsiling Secondary School Hall" },
  { venue: "Mayflower Secondary School Hall" },
  { venue: "Meridian Primary School Hall" },
  { venue: "Naval Base Secondary School Hall" },
  { venue: "New Town Secondary School Hall" },
  { venue: "North Vista Primary School Hall" },
  { venue: "Northland Primary School Hall" },
  { venue: "Northland Secondary School Hall" },
  { venue: "Northoaks Primary School Hall" },
  { venue: "Oasis Primary School Hall" },
  { venue: "Our Tampines Hub - Community Auditorium" },
  { venue: "Park View Primary School Hall" },
  { venue: "Pasir Ris Crest Secondary School Hall" },
  { venue: "Pasir Ris Secondary School Hall" },
  { venue: "Pasir Ris Sport Hall" },
  { venue: "Peirce Secondary School Hall" },
  { venue: "Peiying Primary School Hall" },
  { venue: "Pioneer Primary School Hall" },
  { venue: "Poi Ching School Hall" },
  { venue: "Punggol View Primary School Hall" },
  { venue: "Qihua Primary School Hall" },
  { venue: "Queensway Secondary School Hall" },
  { venue: "Radin Mas Primary School Hall" },
  { venue: "Red Swastika School Hall" },
  { venue: "Rivervale Primary School Hall" },
  { venue: "Sembawang Primary School Hall" },
  { venue: "Sengkang Green Primary School Hall" },
  { venue: "Sengkang Sport Hall" },
  { venue: "Senja-Cashew Sport Hall" },
  { venue: "Serangoon Garden Secondary School Hall" },
  { venue: "Serangoon Secondary School Hall" },
  { venue: "South View Primary School Hall" },
  { venue: "St Anthony's Primary School Hall" },
  { venue: "Teck Ghee Primary School Hall" },
  { venue: "Unity Primary School Hall" },
  { venue: "Unity Secondary School Hall" },
  { venue: "Waterway Primary School Hall" },
  { venue: "Wellington Primary School Hall" },
  { venue: "Westwood Secondary School Hall" },
  { venue: "Woodlands Sport Hall" },
  { venue: "Yio Chu Kang Sport Hall" },
  { venue: "Yishun Primary School Hall" },
  { venue: "Yishun Secondary School Hall" },
  { venue: "Yishun Sport Hall" },
  { venue: "Yishun Town Secondary School Hall" },
  { venue: "Yuan Ching Secondary School Hall" },
  { venue: "Zhonghua Primary School Hall" },
];

export default SearchForm;
