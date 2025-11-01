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
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface GenericCrudTableProps<T extends { id: string }> {
  title: string;
  apiUrl: string;
  columns: GridColDef[];
  initialFormData: T;
  renderForm: (
    data: T,
    setData: React.Dispatch<React.SetStateAction<T>>,
    readOnly?: boolean
  ) => React.ReactNode;
}

export default function GenericCrudTable<T extends { id: string }>({
  title,
  apiUrl,
  columns,
  initialFormData,
  renderForm,
}: GenericCrudTableProps<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<T | null>(null);
  const [viewData, setViewData] = useState<T | null>(null);
  const [formData, setFormData] = useState<T>(initialFormData);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      const json = await res.json();
      setRows(json.data ?? json);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditData(null);
    setFormData(initialFormData);
    setOpen(true);
  };

  const handleEdit = (row: T) => {
    setEditData(row);
    setFormData(row);
    setOpen(true);
  };

  const handleView = (row: T) => {
    setViewData(row);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this record?")) return;
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleSubmit = async () => {
    if (!editData) {
      // Create
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchData();
        setOpen(false);
      } else {
        alert("Failed to create record");
      }
    } else {
      // Update
      const res = await fetch(`${apiUrl}/${editData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchData();
        setOpen(false);
      } else {
        alert("Failed to update record");
      }
    }
  };

  const actionColumn: GridColDef = {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    flex: 0.8,
    renderCell: (params: GridRenderCellParams<T>) => (
      <Box>
        <IconButton color="primary" onClick={() => handleView(params.row)}>
          <VisibilityIcon />
        </IconButton>
        <IconButton color="primary" onClick={() => handleEdit(params.row)}>
          <EditIcon />
        </IconButton>
        <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  };

  const isReadOnly = !!viewData;

  return (
    <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2 }}>
      {/* --- HEADER BAR --- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: isMobile ? 1 : 0 }}>
          {title}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{ borderRadius: "8px", fontWeight: 600 }}
        >
          Add
        </Button>
      </Box>

      {/* --- DATA GRID --- */}
      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={[...columns, actionColumn]}
          getRowId={(r) => r.id}
          loading={loading}
          autoHeight
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 20]}
        />
      </Box>

      {/* --- DIALOG --- */}
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setViewData(null);
        }}
        fullWidth
      >
        <DialogTitle>
          {isReadOnly
            ? `View ${title}`
            : editData
            ? `Edit ${title}`
            : `Add ${title}`}
        </DialogTitle>
        <DialogContent>
          {renderForm(
            isReadOnly ? (viewData as T) : formData,
            setFormData,
            isReadOnly
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setViewData(null);
            }}
          >
            Close
          </Button>
          {!isReadOnly && (
            <Button variant="contained" onClick={handleSubmit}>
              {editData ? "Update" : "Create"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
