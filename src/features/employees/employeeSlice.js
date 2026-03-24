import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../api/http";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await http.get("/employee");
      return res.data;
    } catch (e) {
      return rejectWithValue(e?.message || "Failed to load employees");
    }
  }
);

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await http.get(`/employee/${id}`);
      return res.data;
    } catch (e) {
      return rejectWithValue("Employee not found");
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employees/create",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await http.post("/employee", payload);
      return res.data;
    } catch (e) {
      return rejectWithValue(e?.message || "Failed to create employee");
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await http.put(`/employee/${id}`, payload);
      return res.data;
    } catch (e) {
      return rejectWithValue(e?.message || "Failed to update employee");
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id, { rejectWithValue }) => {
    try {
      await http.delete(`/employee/${id}`);
      return id;
    } catch (e) {
      return rejectWithValue(e?.message || "Failed to delete employee");
    }
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    items: [],
    loading: false,
    error: null,

    byIdLoading: false,
    byIdError: null,
    searchedEmployee: null,

    saving: false,
    saveError: null,

    deletingId: null,
    deleteError: null,
  },
  reducers: {
    clearSearchResult: (s) => {
      s.searchedEmployee = null;
      s.byIdError = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchEmployees.pending, (s) => {
      s.loading = true; s.error = null;
    });
    b.addCase(fetchEmployees.fulfilled, (s, a) => {
      s.loading = false; s.items = a.payload;
    });
    b.addCase(fetchEmployees.rejected, (s, a) => {
      s.loading = false; s.error = a.payload || "Failed to load employees";
    });

    b.addCase(fetchEmployeeById.pending, (s) => {
      s.byIdLoading = true; s.byIdError = null; s.searchedEmployee = null;
    });
    b.addCase(fetchEmployeeById.fulfilled, (s, a) => {
      s.byIdLoading = false; s.searchedEmployee = a.payload;
    });
    b.addCase(fetchEmployeeById.rejected, (s, a) => {
      s.byIdLoading = false; s.byIdError = a.payload || "Employee not found";
    });

    b.addCase(createEmployee.pending, (s) => {
      s.saving = true; s.saveError = null;
    });
    b.addCase(createEmployee.fulfilled, (s, a) => {
      s.saving = false;
      s.items = [a.payload, ...s.items];
    });
    b.addCase(createEmployee.rejected, (s, a) => {
      s.saving = false; s.saveError = a.payload || "Failed to create";
    });

    b.addCase(updateEmployee.pending, (s) => {
      s.saving = true; s.saveError = null;
    });
    b.addCase(updateEmployee.fulfilled, (s, a) => {
      s.saving = false;
      const idx = s.items.findIndex((x) => String(x.id) === String(a.payload.id));
      if (idx >= 0) s.items[idx] = a.payload;
    });
    b.addCase(updateEmployee.rejected, (s, a) => {
      s.saving = false; s.saveError = a.payload || "Failed to update";
    });

    b.addCase(deleteEmployee.pending, (s, a) => {
      s.deletingId = a.meta.arg; s.deleteError = null;
    });
    b.addCase(deleteEmployee.fulfilled, (s, a) => {
      s.deletingId = null;
      s.items = s.items.filter((x) => String(x.id) !== String(a.payload));
    });
    b.addCase(deleteEmployee.rejected, (s, a) => {
      s.deletingId = null;
      s.deleteError = a.payload || "Failed to delete";
    });
  },
});

export const { clearSearchResult } = employeesSlice.actions;
export default employeesSlice.reducer;