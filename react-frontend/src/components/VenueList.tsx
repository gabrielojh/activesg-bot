import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Venue, VenueEntry } from "../types/Venue";
import { useEffect, useState } from "react";

export type VenueListProps = {
  venues: Venue[];
};

const columns: GridColDef[] = [
  {
    field: "venue",
    headerName: "Venue",
    flex: 2,
  },
  {
    field: "day",
    headerName: "Day",
    valueGetter: (_, row) => {
      const date = new Date(row.datetime);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    },
    flex: 1,
  },
  {
    field: "time",
    headerName: "Time",
    valueGetter: (_, row) => {
      const date = new Date(row.datetime);
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
      });
    },
    flex: 1,
  }
];

const VenueList = ({ venues }: VenueListProps) => {
  const [events, setEvents] = useState<VenueEntry[]>([]);

  console.log("Values: ", events);

  useEffect(() => {
    const newEvents: VenueEntry[] = [];
    for (let i = 0; i < venues.length; i++) {
      // Convert datetime to date and time
      console.log("Venues: ", venues[i]);
      console.log("Datetime: ", venues[i].DateTime);

      newEvents.push({
        id: i + 1,
        datetime: venues[i].DateTime,
        venue: venues[i].Venue,
      });
    }
    console.log("New Events: ", newEvents);
    setEvents(newEvents);
  }, [venues]);

  return (
    <div style={{ width: "100%" }}>
      <DataGrid rows={events} columns={columns} sx={{ height: "100vh" }} />
    </div>
  );
};

export default VenueList;
