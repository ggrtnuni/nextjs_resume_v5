"use client";

import { ResumePersistStoreProvider } from './ResumePersistStoreProvider';
import Resume from './_components/Resume';
import ResumeControl from './_components/ResumeControl';

export default function Home() {
    return (
        <ResumePersistStoreProvider>
            <div className="flex justify-start">
                <Resume />
                <ResumeControl />
            </div >
        </ResumePersistStoreProvider>
    );
}
