import ITicket from "@/interfaces/ITicket";
import { AttendeeFormData } from "@/lib/utility/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let initialState: ITicket = {
  eventId: "",
  bookedBy: "",
  quantity: 1,
  ticketPrice: 0,
  totalPrice: 0,
  attendees: [
    {
      fullName: "",
      phone: "",
      email: undefined,
      linkedinUrl: undefined,
      organisation: undefined,
      designation: undefined,
    },
  ],
  payment:{
    method:'',
    paymentId:'',
    paymentStatus:'Pending',
    transactionDate:undefined
  }
};

const CheckoutSlice = createSlice({
  name: "checkoutState",
  initialState,
  reducers: {
    updateQuantity: (state, action) => {
      if (action.payload > 0 && action.payload <= 5) {
        state.quantity = action.payload;
        state.totalPrice = state.quantity * state.ticketPrice;
        state.attendees = Array(action.payload).fill({
          fullName: "",
          phone: "",
          email: undefined,
          linkedinUrl: undefined,
          organisation: undefined,
          designation: undefined,
        });
      }
    },

    updateTicketPrice: (state, action) => {
      state.ticketPrice = action.payload;
      state.totalPrice = action.payload;
    },
    selectedEventId: (state, action) => {
      state.eventId = action.payload;
    },
    updateAttendees: (
      state,
      action: PayloadAction<{ index: number; data: AttendeeFormData }>
    ) => {
      if (state.attendees)
        state.attendees[action.payload.index] = action.payload.data;
    },
    updateBillingAddress: (state, action) => {
      state.billingAddress = action.payload;
    },
    updatePaymentMethod:(state,action)=>{
      state.payment.method = action.payload
    }
  },
});

export const {
  updateQuantity,
  selectedEventId,
  updateAttendees,
  updateBillingAddress,
  updateTicketPrice,
  updatePaymentMethod
} = CheckoutSlice.actions;
export default CheckoutSlice.reducer;
