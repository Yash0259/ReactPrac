import {configStore} from '@reduxjs/toolkit';
import dataSlice from './Slice/dataSlice';

export const store = configStore({
    reducer :{
        data : dataSlice,
    },
})