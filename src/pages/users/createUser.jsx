import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";

import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function createUsers() {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Paper
      sx={{
        maxWidth: 1024,
        margin: "auto",
        overflow: "hidden",
        padding: 5,
      }}
    >
      <Toolbar>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs="8">
              <TextField
                fullWidth
                placeholder="Name of the Company"
                variant="standard"
                label="Company Name"
              />
            </Grid>

            <Grid item xs="6">
              <TextField
                fullWidth
                placeholder="Name of the Company"
                variant="standard"
                label="Contact Person"
              />
            </Grid>

            <Grid item xs="6">
              <TextField
                fullWidth
                placeholder="Web Address"
                variant="standard"
                label="website"
              />
            </Grid>
            <Grid item xs="6">
              <TextField
                fullWidth
                placeholder="Contact Phone"
                variant="standard"
                label="Contact Phone"
              />
            </Grid>
            <Grid item xs="6">
              <TextField
                fullWidth
                placeholder="Contact Email"
                variant="standard"
                label="Contact Email"
              />
            </Grid>
            <Grid item xs="6">
              <FormControl fullWidth>
                <InputLabel id="city-label">City</InputLabel>
                <Select
                  labelId="city-label"
                  id="city"
                  label="City"
                  variant="standard"
                >
                  <MenuItem value={10}>Kathmandu</MenuItem>
                  <MenuItem value={20}>Pokhara</MenuItem>
                  <MenuItem value={30}>Biratnagar</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs="12">
              <Button type="submit" variant="contained" sx={{ mr: 1 }}>
                Add user
              </Button>
            </Grid>
          </Grid>
        </form>
      </Toolbar>
    </Paper>
  );
}
