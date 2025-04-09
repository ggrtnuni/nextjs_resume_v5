"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { useResumeDispatch, useResumeSelector } from './_hooks/resumeHooks';
import {
    selectResumeDate,
    selectResumeNameKana,
    selectResumeName,
    selectResumeGender,
    selectResumeBirthday,
    selectResumeAddressKana,
    selectResumeAddress,
    selectResumeEmail,
    selectResumeTel,
    selectResumeMobile,
    selectResumeContactAddressKana,
    selectResumeContactAddress,
    selectResumeContactTel,
    selectResumeHistory,
    selectResumeLicense,
    selectResumeMotivation,
    selectResumeWish,
    selectResumeIdPhoto,
    selectResumeCalender,
    selectResumeContact,
    selectResumeVisibility,
    selectResumeSaveFilename,

    setResumeDate,
    setResumeNameKana,
    setResumeName,
    setResumeGender,
    setResumeBirthday,
    setResumeAddressKana,
    setResumeAddress,
    setResumeEmail,
    setResumeTel,
    setResumeMobile,
    setResumeContactAddressKana,
    setResumeContactAddress,
    setResumeContactTel,
    setResumeHistory,
    setResumeLicense,
    setResumeMotivation,
    setResumeWish,
    setResumeIdPhoto,
    setResumeCalender,
    setResumeContact,
    setResumeVisibility,
    setResumeSaveFilename,
} from './_slices/resumeSlice';
import storage from './_utils/storage';
import { type ResumeHistory } from "./_types/resume";

interface Props {
    readonly children: ReactNode;
}

export const ResumePersistStoreProvider = ({ children }: Props) => {
    const dispatch = useResumeDispatch();
    const resumeState = {
        resumeDate: useResumeSelector(selectResumeDate),
        resumeNameKana: useResumeSelector(selectResumeNameKana),
        resumeName: useResumeSelector(selectResumeName),
        resumeGender: useResumeSelector(selectResumeGender),
        resumeBirthday: useResumeSelector(selectResumeBirthday),
        resumeAddressKana: useResumeSelector(selectResumeAddressKana),
        resumeAddress: useResumeSelector(selectResumeAddress),
        resumeEmail: useResumeSelector(selectResumeEmail),
        resumeTel: useResumeSelector(selectResumeTel),
        resumeMobile: useResumeSelector(selectResumeMobile),
        resumeContactAddressKana: useResumeSelector(selectResumeContactAddressKana),
        resumeContactAddress: useResumeSelector(selectResumeContactAddress),
        resumeContactTel: useResumeSelector(selectResumeContactTel),
        resumeHistory: useResumeSelector(selectResumeHistory),
        resumeLicense: useResumeSelector(selectResumeLicense),
        resumeMotivation: useResumeSelector(selectResumeMotivation),
        resumeWish: useResumeSelector(selectResumeWish),
        resumeIdPhoto: useResumeSelector(selectResumeIdPhoto),
        resumeCalender: useResumeSelector(selectResumeCalender),
        resumeContact: useResumeSelector(selectResumeContact),
        resumeVisibility: useResumeSelector(selectResumeVisibility),
        resumeSaveFilename: useResumeSelector(selectResumeSaveFilename),
        // actions
        setResumeDate,
        setResumeNameKana,
        setResumeName,
        setResumeGender,
        setResumeBirthday,
        setResumeAddressKana,
        setResumeAddress,
        setResumeEmail,
        setResumeTel,
        setResumeMobile,
        setResumeContactAddressKana,
        setResumeContactAddress,
        setResumeContactTel,
        setResumeHistory,
        setResumeLicense,
        setResumeMotivation,
        setResumeWish,
        setResumeIdPhoto,
        setResumeCalender,
        setResumeContact,
        setResumeVisibility,
        setResumeSaveFilename,
    };

    const prefix = 'resume_v5_';
    const session = true;

    const [isFirst, setIsFirst] = useState(true);
    useEffect(() => {
        // Hydration エラーが出ないように、ローカルストレージの値は DOM 描画後に更新する。
        // useEffect の最初の呼び出しの時のみ、ローカルストレージの値を反映するようにする。
        if (isFirst) {
            dispatch(setResumeDate(storage.read('resumeDate', '', { prefix, session })));
            dispatch(setResumeNameKana(storage.read('resumeNameKana', '', { prefix, session })));
            dispatch(setResumeName(storage.read('resumeName', '', { prefix, session })));
            dispatch(setResumeGender(storage.read('resumeGender', '0', { prefix, session })));
            dispatch(setResumeBirthday(storage.read('resumeBirthday', '', { prefix, session })));
            dispatch(setResumeAddressKana(storage.read('resumeAddressKana', '', { prefix, session })));
            dispatch(setResumeAddress(storage.read('resumeAddress', '', { prefix, session })));
            dispatch(setResumeEmail(storage.read('resumeEmail', '', { prefix, session })));
            dispatch(setResumeTel(storage.read('resumeTel', '', { prefix, session })));
            dispatch(setResumeMobile(storage.read('resumeMobile', '', { prefix, session })));
            dispatch(setResumeContactAddressKana(storage.read('resumeContactAddressKana', '', { prefix, session })));
            dispatch(setResumeContactAddress(storage.read('resumeContactAddress', '', { prefix, session })));
            dispatch(setResumeContactTel(storage.read('resumeContactTel', '', { prefix, session })));
            dispatch(setResumeHistory(storage.read('resumeHistory', { rows: [] } as ResumeHistory, { prefix, session })));
            dispatch(setResumeLicense(storage.read('resumeLicense', { rows: [] } as ResumeHistory, { prefix, session })));
            dispatch(setResumeMotivation(storage.read('resumeMotivation', '', { prefix, session })));
            dispatch(setResumeWish(storage.read('resumeWish', '', { prefix, session })));
            dispatch(setResumeIdPhoto(storage.read('resumeIdPhoto', '', { prefix, session })));
            dispatch(setResumeCalender(storage.read('resumeCalender', 'en', { prefix, session })));
            dispatch(setResumeContact(storage.read('resumeContact', true, { prefix, session })));
            dispatch(setResumeVisibility(storage.read('resumeVisibility', true, { prefix, session })));
            dispatch(setResumeSaveFilename(storage.read('resumeSaveFilename', '', { prefix, session })));
            setIsFirst(false);
        }
    }, [resumeState.resumeDate]);

    useEffect(() => {
        if (!isFirst) { storage.write('resumeDate', resumeState.resumeDate, { prefix, session }); }
    }, [resumeState.resumeDate]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeNameKana', resumeState.resumeNameKana, { prefix, session }); }
    }, [resumeState.resumeNameKana]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeName', resumeState.resumeName, { prefix, session }); }
    }, [resumeState.resumeName]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeGender', resumeState.resumeGender, { prefix, session }); }
    }, [resumeState.resumeGender]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeBirthday', resumeState.resumeBirthday, { prefix, session }); }
    }, [resumeState.resumeBirthday]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeAddressKana', resumeState.resumeAddressKana, { prefix, session }); }
    }, [resumeState.resumeAddressKana]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeAddress', resumeState.resumeAddress, { prefix, session }); }
    }, [resumeState.resumeAddress]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeEmail', resumeState.resumeEmail, { prefix, session }); }
    }, [resumeState.resumeEmail]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeTel', resumeState.resumeTel, { prefix, session }); }
    }, [resumeState.resumeTel]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeMobile', resumeState.resumeMobile, { prefix, session }); }
    }, [resumeState.resumeMobile]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeContactAddressKana', resumeState.resumeContactAddressKana, { prefix, session }); }
    }, [resumeState.resumeContactAddressKana]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeContactAddress', resumeState.resumeContactAddress, { prefix, session }); }
    }, [resumeState.resumeContactAddress]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeContactTel', resumeState.resumeContactTel, { prefix, session }); }
    }, [resumeState.resumeContactTel]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeHistory', resumeState.resumeHistory, { prefix, session }); }
    }, [resumeState.resumeHistory]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeLicense', resumeState.resumeLicense, { prefix, session }); }
    }, [resumeState.resumeLicense]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeMotivation', resumeState.resumeMotivation, { prefix, session }); }
    }, [resumeState.resumeMotivation]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeWish', resumeState.resumeWish, { prefix, session }); }
    }, [resumeState.resumeWish]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeIdPhoto', resumeState.resumeIdPhoto, { prefix, session }); }
    }, [resumeState.resumeIdPhoto]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeCalender', resumeState.resumeCalender, { prefix, session }); }
    }, [resumeState.resumeCalender]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeContact', resumeState.resumeContact, { prefix, session }); }
    }, [resumeState.resumeContact]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeVisibility', resumeState.resumeVisibility, { prefix, session }); }
    }, [resumeState.resumeVisibility]);
    useEffect(() => {
        if (!isFirst) { storage.write('resumeSaveFilename', resumeState.resumeSaveFilename, { prefix, session }); }
    }, [resumeState.resumeSaveFilename]);

    return <>{children}</>;
};
