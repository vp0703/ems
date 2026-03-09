import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { http } from "../../api/http";

export const fetchCountries = createAsyncThunk(
  "countries/fetchAll", //Action
  async (_, { rejectWithValue }) => {
    try {
      const res = await http.get("/country");
      return res.data;
    } catch (e) {
      return rejectWithValue(e?.message || "Failed to load countries");
    }
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {}, 
  extraReducers: (b) => {
    b.addCase(fetchCountries.pending, (s) => {
      s.loading = true;
      s.error = null;
    });
    b.addCase(fetchCountries.fulfilled, (s, a) => {
      s.loading = false;
      s.items = a.payload;
    });
    b.addCase(fetchCountries.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload || "Failed to load countries";
    });
  },
});

export default countriesSlice.reducer;

// helper selector
export const selectCountryNameById = (state, countryId) => {
  const found = state.countries.items.find((c) => String(c.id) === String(countryId));
  return found?.name || found?.country || found?.title || "Unknown";
};