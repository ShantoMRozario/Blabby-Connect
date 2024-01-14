
import { createSlice } from "@reduxjs/toolkit";

export const selectedFriendSlice = createSlice({
    name: 'selectedFriendChat',
    initialState:{
        selectedFriend:localStorage.getItem('selectedFriend')?JSON.parse(localStorage.getItem('selectedFriend')):null
    },
    reducers: {
        selectedFriendChat: (state,action) => {
            state.selectedFriend = action.payload
        }
    },
});

export const { selectedFriendChat } = selectedFriendSlice.actions
export default selectedFriendSlice.reducer