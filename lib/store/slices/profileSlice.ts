import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProfile } from "@/lib/data/fetch-profile";
import { PROFILE_SLICE_NAME } from "@/lib/constants";

interface ProfileState {
    id: string | null
    org_id: string | null
    role: number | null
    name: string | null
    email: string | null
}

const initialState: ProfileState = {
    id: null,
    org_id: null,
    role: null,
    name: null,
    email: null
}

export const refreshProfile = createAsyncThunk(
    `${PROFILE_SLICE_NAME}/refreshProfile`, 
    async (_,  {rejectWithValue }) => {
    
    try {
        return fetchProfile()
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : 'Error fetching profile')
    }
})

export const profileSlice = createSlice({
    name: PROFILE_SLICE_NAME,
    initialState,
    reducers: {
        clearProfile: (state) => {
            state.org_id = null
            state.role = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(refreshProfile.fulfilled, (state, action) => {
            state.id = action.payload.id;
            state.org_id = action.payload.org_id;
            state.role = action.payload.role;
            state.name = action.payload.name;
            state.email = action.payload.email || null;
        })
        .addCase(refreshProfile.rejected, (state, action) => {
            state.id = null;
            state.org_id = null;
            state.role = null;
            state.name = null;
            state.email = null;
        })
    },
    selectors: {
        selectId: (state) => {
            return state.id;
        },
        selectOrgId: (state) => {
            return state.org_id;
        },
        selectRole: (state) => {
            return state.role;
        },
        selectName: (state) => {
            return state.name;
        },
        selectEmail: (state) => {
            return state.email;
        }
    }
})

export default profileSlice.reducer;