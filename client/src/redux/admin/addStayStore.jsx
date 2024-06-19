import { configureStore } from "@reduxjs/toolkit"
import addStayReducer from "../admin/addStaySlice"

export const store = configureStore({
    reducer : {
        form : addStayReducer,
    }
})