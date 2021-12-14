import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  message: '',
  type: 'info',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, { payload }) => {
      state.isOpen = payload.isOpen;
      state.message = payload.message;
      state.type = payload.type;
    },
    hideAlert: state => {
      state.isOpen = false;
    },
  },
});

export const selectAlertOptions = state => state.alert;
export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
