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

function loadServerRows(commodityFilterValue) {
  const serverRows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      if (!commodityFilterValue) {
        resolve(serverRows);
        return;
      }
      resolve(
        serverRows.filter(
          (row) => row.lastName.toLowerCase().indexOf(commodityFilterValue) > -1
        )
      );
    }, Math.random() * 500 + 100); // simulate network latency
  });
}

const columns = [
  { field: "id", headerName: "ID", width: 70, sortable: false },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "age", headerName: "Age", type: "number", width: 90 },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`,
  },
];

export default function Users() {
  const [rows, setRows] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const onFilterChange = React.useCallback((filterModel) => {
    setFilterValue(filterModel.items[0].value);
  }, []);

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await loadServerRows(filterValue);

      if (!active) {
        return;
      }

      setRows(newRows);
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
                  columnField: "lastName",
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
