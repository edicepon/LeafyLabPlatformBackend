import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchOrganization } from "@/lib/data/fetch-organization";
import { ORG_SLICE_NAME, NULL_ORG } from "@/lib/constants";
import { User } from "@/lib/types/User";

interface OrgState {
    name: string | null
    members: User[]
}

const initialState: OrgState = {
    name: null,
    members: []
}

export const refreshOrg = createAsyncThunk(
    `${ORG_SLICE_NAME}/refreshOrg`,
    async (_, {rejectWithValue}) => {
        try {
            return fetchOrganization()
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Error fetching organization')
        }
    }
)

export const orgSlice = createSlice({
    name: ORG_SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(refreshOrg.fulfilled, (state, action) => {
            state.name = action.payload.name
            state.members = [...action.payload.members]
        })
        .addCase(refreshOrg.rejected, (state, action) => {
            state.name = NULL_ORG
            state.members = []
        })
    },
    selectors: {
        selectName: (state) => {
            return state.name
        },
        selectActiveMembers: createSelector(
            (state: OrgState) => state.members,
            (members) => members.filter(member => member.last_sign_in_at !== null)
        ),
        selectInactiveMembers: createSelector(
            (state: OrgState) => state.members,
            (members) => members.filter(member => member.last_sign_in_at === null)
        )
    }
})

export default orgSlice.reducer