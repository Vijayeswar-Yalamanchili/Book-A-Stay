import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name : '',
    type : '',
    title : '',
    address : '',
    city : '',
    distance : 0,
    description : '',
    lowestPrice : 0,
    aminities : [],
    rating : '',
    experience : '',
    featured : '',
    overview : '',
    hotelImage : null,
    roomImages : []
}

const addStaySlice = createSlice({
    name : 'addStayForm',
    initialState,
    reducers : {
        saveDatas : (state,action) => {
            const {field,value} = action.payload
            state[field] = value
        },
        addCheckbox : (state,action) => {
            state.aminities.push(action.payload)
        },
        removeCheckbox : (state,action) => {
            state.aminities = state.aminities.filter(ele => ele !== action.payload)
        },
        setImage: (state, action) => {
            state.hotelImage = action.payload;
        },
        addMultipleImage: (state, action) => {
            state.roomImages.push(action.payload);
        },
        removeMultipleImage: (state, action) => {
            state.roomImages = state.roomImages.filter(ele => ele !== action.payload);
        },
        resetDatas : () => initialState,
    }
})

export const { saveDatas, addCheckbox, removeCheckbox, setImage, addMultipleImage, removeMultipleImage, resetDatas } = addStaySlice.actions

export default addStaySlice.reducer