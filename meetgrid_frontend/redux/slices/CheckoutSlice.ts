import ITicket from "@/interfaces/ITicket";
import { createSlice } from "@reduxjs/toolkit";

let initialState: ITicket = {
  eventId: "",
  bookedBy: "",
  quantity: 1,
  ticketPrice: 0,
  totalPrice: 0,
};

const CheckoutSlice = createSlice({
  name: "checkoutState",
  initialState,
  reducers: {
    increaseQuantity: (state) => {
      if (state.quantity < 5) {
        state.quantity++;
      }
    },
    decreaseQuantity: (state) => {
      if (state.quantity > 0) {
        state.quantity--;
      }
    },
    updateEventDetails:(state,action)=>{
        state = {...state,...action.payload}
    },
    selectedEventId: (state, action) => {
      state.eventId = action.payload;
    },
    updateAttendees: (state, action) => {
      state.attendees?.push(action.payload);
    },
    updateBillingAddress: (state, action) => {
      state.billingAddress = action.payload
    },
  },
});

export const { increaseQuantity, decreaseQuantity, selectedEventId, updateAttendees ,updateBillingAddress,updateEventDetails} = CheckoutSlice.actions;
export default CheckoutSlice.reducer;