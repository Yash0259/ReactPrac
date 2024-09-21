import { useSlice} from '@reduxjs/toolkit';

const dataSlice = useSlice({
    name: "data",
    initialState :[],
    reducers : {
        addData : (state,action) =>{
            state = [...state ,action.payload];
        },
    },
});

export default dataSlice.reducers;