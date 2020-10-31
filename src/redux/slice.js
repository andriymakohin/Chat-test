import { createSlice } from "@reduxjs/toolkit";

import contacts from "../db/database.json";

const initialStateSession = {
  token: null,
  user: {},
  modal: false,
};

const initialContact = {
  contacts: contacts,
};

const sessionSlice = createSlice({
  name: "session",
  initialState: initialStateSession,
  reducers: {
    setToken: (state, { payload }) => ({ ...state, token: payload }),
    setUserInfo: (state, { payload }) => ({ ...state, user: payload }),
    loginOut: (state) => ({ ...state, token: null, user: {} }),
    modalLogout: (state, { payload }) => ({ ...state, modal: payload }),
  },
});

const contactSlice = createSlice({
  name: "contact",
  initialState: initialContact,
  reducers: {
    contactsHistory: (state, { payload }) =>
      state.contacts.find((item) => item.id === payload.id)
        ? {
            ...state,
            contacts: state.contacts.map((item) =>
              item.id === payload.id
                ? { ...item, history: payload.history }
                : item
            ),
          }
        : state,
  },
});

export const session = sessionSlice.reducer;
export const contact = contactSlice.reducer;
export const {
  setToken,
  setUserInfo,
  loginOut,
  modalLogout,
} = sessionSlice.actions;
export const { contactsHistory } = contactSlice.actions;
