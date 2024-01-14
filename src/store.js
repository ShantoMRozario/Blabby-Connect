

import { configureStore } from '@reduxjs/toolkit'
import selectedFriendSlice from './Slices/selectedFriendSlice'
import userSlice from './Slices/userSlice'

export default configureStore({
  reducer: {
    userLoginInfo: userSlice,
    selectedFriendInfo :  selectedFriendSlice
  },
})