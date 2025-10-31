import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        addresses: "[]",
        allProducts: [],
        myproducts: "[]",
        cart: "[]",
        wishlist: "[]",
        orders: "[]",
    },
    reducers: {
        initiateState: (state, action) => {
            state.addresses = action.payload.addresses;
            state.myproducts = action.payload.myproducts;
            state.cart = action.payload.cart;
            state.wishlist = action.payload.wishlist;
            state.orders = action.payload.orders;
        },

        newToStore: (state, action)=>{
            state[`${action.payload.list}`] = action.payload.data;
        },

        addToStore: (state, action)=>{
            state[`${action.payload.list}`].push(action.payload.product);
        }
    }

})

export const {addToStore, initiateState, newToStore} = productSlice.actions;

export default productSlice.reducer