import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { resumeSlice } from "../_slices/resumeSlice";

const rootReducer = combineSlices(resumeSlice);
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type ResumeStore = ReturnType<typeof makeStore>;
export type ResumeDispatch = ResumeStore["dispatch"];
export type ResumeThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>;
