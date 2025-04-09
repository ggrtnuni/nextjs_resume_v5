"use client";

import type { ResumeStore } from './_stores/resumeStore';
import { makeStore } from './_stores/resumeStore';
import type { ReactNode } from "react";
import { useRef } from "react";
import { Provider } from "react-redux";

interface Props {
    readonly children: ReactNode;
}

export const ResumeStoreProvider = ({ children }: Props) => {
    const storeRef = useRef<ResumeStore | null>(null);

    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
};
