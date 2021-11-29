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

import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 70, sortable: false },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "merchantName", headerName: "Merchant", width: 130 },
  { field: "mcc", headerName: "MCC", type: "number", width: 90 },
  {
    field: "merchantName",
    headerName: "Merchant",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
];

export default function Merchant() {
  const [rows, setRows] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const URL = `http://localhost:3006/api/v1/merchants/`;

  const onFilterChange = React.useCallback((filterModel) => {
    setFilterValue(filterModel.items[0].value);
  }, []);

  React.useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);

      const newRows = await axios.get(URL, {
        responseType: "json",
      });
      if (!active) {
        return;
      }
      setRows(newRows.data.data);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [filterValue]);

  return (
    <Paper
      sx={{
        maxWidth: 1024,
        margin: "auto",
        overflow: "hidden",
        paddingBottom: 5,
      }}
    >
      <Toolbar>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <SearchIcon color="inherit" sx={{ display: "block" }} />
          </Grid>
          <Grid item xs>
            <TextField
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              fullWidth
              placeholder="Search by email address, phone number, or user UID"
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: "default" },
              }}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to="/merchants/create"
              variant="contained"
              sx={{ mr: 1 }}
            >
              Add user
            </Button>

            <Tooltip title="Reload">
              <IconButton>
                <RefreshIcon color="inherit" sx={{ display: "block" }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
      <Toolbar>
        <div style={{ height: 375, width: "100%" }}>
          <DataGrid
            filterModel={{
              items: [
                {
                  columnField: "merchantName",
                  operatorValue: "contains",
                  value: filterValue,
                },
              ],
            }}
            filterMode="server"
            onFilterModelChange={onFilterChange}
            loading={loading}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </Toolbar>
    </Paper>
  );
}
