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
  Snackbar,
  Alert,
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

  // ✅ Snackbar state
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({ open: false, message: "", severity: "info" });

  // ✅ Delete confirmation dialog
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id?: string;
  }>({ open: false });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "info" | "warning" = "info"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  /** ✅ Fetch Data */
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl);
      const json = await res.json();
      setRows(json.data ?? json);
    } catch (err) {
      console.error("Fetch error:", err);
      showSnackbar("Failed to fetch data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /** ✅ Add Record */
  const handleAdd = () => {
    setEditData(null);
    setFormData(initialFormData);
    setOpen(true);
  };

  /** ✅ Edit Record */
  const handleEdit = (row: T) => {
    setEditData(row);
    setFormData(row);
    setOpen(true);
  };

  /** ✅ View (Read Only) */
  const handleView = (row: T) => {
    setViewData(row);
    setOpen(true);
  };

  /** ✅ Delete Record */
  const confirmDelete = (id: string) => {
    setDeleteDialog({ open: true, id });
  };

  const handleDelete = async () => {
    if (!deleteDialog.id) return;

    try {
      const res = await fetch(`${apiUrl}/${deleteDialog.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.text();
        showSnackbar(`Delete failed: ${errorData}`, "error");
        return;
      }

      setRows((prev) => prev.filter((r) => r.id !== deleteDialog.id));
      showSnackbar("Deleted successfully", "success");
    } catch (e) {
      showSnackbar("Delete error", "error");
    } finally {
      setDeleteDialog({ open: false });
    }
  };

  /** ✅ Create or Update API */
  const handleSubmit = async () => {
    try {
      const method = editData ? "PATCH" : "POST";
      const url = editData ? `${apiUrl}/${editData.id}` : apiUrl;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        showSnackbar(`Failed: ${errorText}`, "error");
        return;
      }

      await fetchData();
      setOpen(false);
      setViewData(null);
      showSnackbar(
        editData ? "Updated successfully" : "Created successfully",
        "success"
      );
    } catch (err) {
      showSnackbar("Error submitting form", "error");
      console.error(err);
    }
  };

  const actionColumn: GridColDef = {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    flex: 0.5,
    minWidth: 150,
    renderCell: (params: GridRenderCellParams<T>) => (
      <Box>
        <IconButton color="primary" onClick={() => handleView(params.row)}>
          <VisibilityIcon />
        </IconButton>

        <IconButton color="primary" onClick={() => handleEdit(params.row)}>
          <EditIcon />
        </IconButton>

        <IconButton color="error" onClick={() => confirmDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
  };

  const isReadOnly = !!viewData;

  return (
    <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: 2 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">{title}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Add
        </Button>
      </Box>

      {/* Data Grid */}
      <DataGrid
        rows={rows}
        columns={[...columns, actionColumn]}
        getRowId={(r) => r.id}
        loading={loading}
        autoHeight
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 20]}
      />

      {/* Modal (Add/Edit/View) */}
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

      {/* ✅ Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false })}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this record?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false })}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Snackbar for clean alerts */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
