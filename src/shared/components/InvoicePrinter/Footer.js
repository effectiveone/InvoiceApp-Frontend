import React from "react";
import { Box, List, ListItem, ListItemText } from "@material-ui/core";

export default function Footer({
  name,
  email,
  website,
  phone,
  bankAccount,
  bankName,
}) {
  return (
    <Box component="footer" sx={{ border: "2px solid gray", pt: 5 }}>
      <List
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <ListItem>
          <ListItemText primary="Your name:" secondary={name} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Your email:" secondary={email} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Phone number:" secondary={phone} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Bank:" secondary={bankName} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Account holder:" secondary={name} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Account number:" secondary={bankAccount} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Website:"
            secondary={
              <a href={website} target="_blank" rel="noopener noreferrer">
                {website}
              </a>
            }
          />
        </ListItem>
      </List>
    </Box>
  );
}
