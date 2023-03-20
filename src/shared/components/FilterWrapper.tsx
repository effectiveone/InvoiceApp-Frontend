import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import Container from "@mui/material/Container";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import { useStyles } from "./StyleFilterWrapper";

interface FilterWrapperProps {
  handleFilterChange: (value: string) => void;
}

const FilterWrapper: React.FC<FilterWrapperProps> = ({
  handleFilterChange,
}) => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <div className={classes.root}>
        <Grid container className={classes.wrapper}>
          <Grid className={classes.flexbox}>
            <Grid className={classes.filter}>
              <Button
                className={classes.button}
                variant="contained"
                startIcon={
                  <FilterListIcon sx={{ p: 0 }} className={classes.icon} />
                }
              >
                Filter
              </Button>
            </Grid>
          </Grid>
          <Grid className={classes.searchContainer}>
            <SearchIcon />
            <InputBase
              className={classes.input}
              placeholder="Search by kontrahent's company name"
              onChange={({ target: { value } }) => handleFilterChange(value)}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default FilterWrapper;
