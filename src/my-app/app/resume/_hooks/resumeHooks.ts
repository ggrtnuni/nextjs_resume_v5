// This file serves as a central hub for re-exporting pre-typed Redux hooks.
import { useDispatch, useSelector, useStore } from "react-redux";
import type { ResumeDispatch, ResumeStore, RootState } from "../_stores/resumeStore";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useResumeDispatch = useDispatch.withTypes<ResumeDispatch>();
export const useResumeSelector = useSelector.withTypes<RootState>();
export const useResumeStore = useStore.withTypes<ResumeStore>();
