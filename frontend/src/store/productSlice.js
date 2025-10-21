import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        allProducts: [],
        myProducts: [],
        myCart: [],
        wishlist: [],
        myOrders: [],
    },
    reducers: {

    }

})

export const {} = productSlice.actions;

export default productSlice.reducer