import { Card, CardContent, Typography, Grid2 } from "@mui/material";

const data = [
  {
    DateTime: "2024-12-22T20:00:00",
    Venue: "Ahmad Ibrahim Secondary School Hall",
  },
  {
    DateTime: "2024-12-22T09:00:00",
    Venue: "Bedok South Secondary School Hall",
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  { 
    DateTime: "2024-12-22T07:00:00",
    Venue: "Bukit Canberra Sport Hall"
  },
  // Add more items here...
];

const VenueCard = () => {
  return (
    <Grid2 container spacing={2}>
      {data.map((item, index) => (
        <Grid2 size={{ xs: 1, sm: 6, md: 4 }} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {new Date(item.DateTime).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.Venue}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default VenueCard;
