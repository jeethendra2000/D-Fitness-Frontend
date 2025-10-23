"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Customer } from "@/configs/dataType";

const phoneRegex = /^[0-9]{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const API_URL = "https://dfitnessgym.runasp.net/api/Users";
const TOKEN = "YOUR_API_TOKEN_HERE";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        headers: { Accept: "*/*", Authorization: `Bearer ${TOKEN}` },
      });
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const response = await res.json();
      setCustomers(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const [openForm, setOpenForm] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: 1,
    height: 0,
    weight: 0,
    trainerRequired: false,
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
  });

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const handleAdd = () => {
    setEditCustomer(null);
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: 1,
      height: 0,
      weight: 0,
      trainerRequired: false,
    });
    setOpenForm(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditCustomer(customer);
    setFormData({
      firstname: customer.firstname,
      lastname: customer.lastname,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      dateOfBirth: customer.dateOfBirth,
      gender: customer.gender,
      height: customer.height,
      weight: customer.weight,
      trainerRequired: customer.trainerRequired,
    });
    setOpenForm(true);
  };

  const handleClose = () => setOpenForm(false);

  const handleSubmit = async () => {
    let newErrors = { firstname: "", lastname: "", email: "", phoneNumber: "" };
    let hasError = false;

    if (!formData.firstname.trim()) {
      newErrors.firstname = "First name is required";
      hasError = true;
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = "Last name is required";
      hasError = true;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      hasError = true;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email is invalid";
      hasError = true;
    }
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    if (editCustomer) {
      setCustomers((prev) =>
        prev.map((c) => (c.id === editCustomer.id ? { ...c, ...formData } : c))
      );
    } else {
      const newCustomer: Customer = {
        ...formData,
        id: (Math.random() * 1000000000).toFixed(0),
        trainer: {} as any,
        joinedDate: new Date().toISOString(),
        createdOn: new Date().toISOString(),
        role: {} as any,
      };
      setCustomers((prev) => [...prev, newCustomer]);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
  };

  const columns: GridColDef[] = [
    { field: "firstname", headerName: "First Name", flex: 1 },
    { field: "lastname", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phoneNumber", headerName: "Phone", flex: 1 },
    { field: "height", headerName: "Height (cm)", flex: 0.6, type: "number" },
    { field: "weight", headerName: "Weight (kg)", flex: 0.6, type: "number" },
    {
      field: "trainerRequired",
      headerName: "Trainer Required",
      flex: 0.6,
      type: "boolean",
      valueFormatter: (params: { value: boolean }) =>
        params.value ? "Yes" : "No",
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 0.7,
      renderCell: (params: GridRenderCellParams<Customer>) => (
        <Box>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ position: "relative", p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
        Customers
      </Typography>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">Error: {error}</Typography>}

      {!loading && !error && (
        <Box
          sx={{ width: "100%", backgroundColor: "#fff", p: 1, borderRadius: 2 }}
        >
          {/* Top bar with Add button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="subtitle1">Customer List</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAdd}
              sx={{ mt: isMobile ? 1 : 0 }}
            >
              Add
            </Button>
          </Box>

          <Box sx={{ width: "100%" }}>
            <DataGrid
              rows={customers}
              columns={columns}
              getRowId={(row) => row.id}
              pagination
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
              autoHeight
              columnVisibilityModel={
                isMobile
                  ? { height: false, weight: false, trainerRequired: false }
                  : {}
              }
            />
          </Box>
        </Box>
      )}

      <Dialog
        open={openForm}
        onClose={handleClose}
        fullWidth
        maxWidth={isMobile ? "xs" : "sm"}
      >
        <DialogTitle>
          {editCustomer ? "Edit Customer" : "Add Customer"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="First Name"
              value={formData.firstname}
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
              fullWidth
              required
              error={!!errors.firstname}
              helperText={errors.firstname}
            />
            <TextField
              label="Last Name"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              fullWidth
              required
              error={!!errors.lastname}
              helperText={errors.lastname}
            />
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              fullWidth
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
            <TextField
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <Typography variant="subtitle1">Gender</Typography>
            <RadioGroup
              row
              value={formData.gender.toString()}
              onChange={(e) =>
                setFormData({ ...formData, gender: Number(e.target.value) })
              }
            >
              <FormControlLabel value="0" control={<Radio />} label="Male" />
              <FormControlLabel value="1" control={<Radio />} label="Female" />
              <FormControlLabel value="2" control={<Radio />} label="Others" />
            </RadioGroup>
            <TextField
              label="Height (cm)"
              type="number"
              value={formData.height}
              onChange={(e) =>
                setFormData({ ...formData, height: Number(e.target.value) })
              }
              fullWidth
            />
            <TextField
              label="Weight (kg)"
              type="number"
              value={formData.weight}
              onChange={(e) =>
                setFormData({ ...formData, weight: Number(e.target.value) })
              }
              fullWidth
            />
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.trainerRequired}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        trainerRequired: e.target.checked,
                      })
                    }
                  />
                }
                label="Trainer Required"
                labelPlacement="start"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editCustomer ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
