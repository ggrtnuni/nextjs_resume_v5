"use client";

import { useEffect, useRef } from 'react';
// import { useResumeDispatch } from '../_hooks/resumeHooks';
import { useResumeSelector } from '../_hooks/resumeHooks';
import {
    selectResumeDateText,
    selectResumeNameKana,
    selectResumeName,
    selectResumeGenderText,
    selectResumeBirthdayText,
    selectResumeAddressKana,
    selectResumeAddressText,
    selectResumeEmail,
    selectResumeTel,
    selectResumeMobile,
    selectResumeContactAddressKana,
    selectResumeContactAddressText,
    selectResumeContactTel,
    selectResumeHistory,
    selectResumeLicense,
    selectResumeMotivation,
    selectResumeWish,
    selectResumeIdPhoto,
    selectResumeContact,
    selectResumeVisibility,
} from '../_slices/resumeSlice';
import ResumeCard from './ResumeCard';
import ResumeTableHistory from './ResumeTableHistory';

export default function Resume() {
    // const dispatch = useResumeDispatch();
    const resumeState = {
        resumeDateText: useResumeSelector(selectResumeDateText),
        resumeNameKana: useResumeSelector(selectResumeNameKana),
        resumeName: useResumeSelector(selectResumeName),
        resumeGenderText: useResumeSelector(selectResumeGenderText),
        resumeBirthdayText: useResumeSelector(selectResumeBirthdayText),
        resumeAddressKana: useResumeSelector(selectResumeAddressKana),
        resumeAddressText: useResumeSelector(selectResumeAddressText),
        resumeEmail: useResumeSelector(selectResumeEmail),
        resumeTel: useResumeSelector(selectResumeTel),
        resumeMobile: useResumeSelector(selectResumeMobile),
        resumeContactAddressKana: useResumeSelector(selectResumeContactAddressKana),
        resumeContactAddressText: useResumeSelector(selectResumeContactAddressText),
        resumeContactTel: useResumeSelector(selectResumeContactTel),
        resumeHistory: useResumeSelector(selectResumeHistory),
        resumeLicense: useResumeSelector(selectResumeLicense),
        resumeMotivation: useResumeSelector(selectResumeMotivation),
        resumeWish: useResumeSelector(selectResumeWish),
        resumeIdPhoto: useResumeSelector(selectResumeIdPhoto),
        resumeContact: useResumeSelector(selectResumeContact),
        resumeVisibility: useResumeSelector(selectResumeVisibility),
    };
    const resume = useRef<HTMLElement>(null);

    useEffect(() => {
        console.log(`check resumeVisibility: ${resumeState.resumeVisibility} in Resume.tsx`)
    }, [resumeState.resumeVisibility]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const dataUri = resumeState.resumeIdPhoto;
            const imagePreview = document.querySelector('.resume-photo-img');
            if (imagePreview) {
                if (dataUri && dataUri.length > 0) {
                    if (imagePreview) {
                        imagePreview.innerHTML = '';

                        const photoImage = document.createElement('img');
                        photoImage.src = dataUri;
                        imagePreview.append(photoImage);
                    }
                } else {
                    imagePreview.innerHTML = '';
                }
            }
        }
    }, [resumeState.resumeIdPhoto]);

    return (
        <article hidden={!resumeState.resumeVisibility} className="resume container" ref={resume}>
            <div className="page">
                <div className="page-content relative">
                    <div className="resume-photo-img"></div>

                    <section className="panel resume-info-meta">
                        <h1 className="resume-title">履歴書</h1>
                        <div className="resume-date">{resumeState.resumeDateText}</div>
                    </section>

                    <section className="panel resume-info-general">
                        <ResumeCard className="resume-name-kana" label="ふりがな" value={resumeState.resumeNameKana} />
                        <ResumeCard className="resume-name" label="氏名" value={resumeState.resumeName} />
                        <ResumeCard className="resume-gender" label="性別" value={resumeState.resumeGenderText} />
                        <ResumeCard className="resume-birthday" label="生年月日" value={resumeState.resumeBirthdayText} />
                        <ResumeCard className="resume-address-kana" label="ふりがな" value={resumeState.resumeAddressKana} />
                        <ResumeCard className="resume-address" label="現住所" value={resumeState.resumeAddressText} preLike={true} />
                        <ResumeCard className="resume-email" label="E-mail" value={resumeState.resumeEmail} contactEffectLabel={true} contactEffectValue={true} />
                        <ResumeCard className="resume-tel" label="自宅電話" value={resumeState.resumeTel} />
                        <ResumeCard className="resume-mobile" label="携帯電話" value={resumeState.resumeMobile} contactEffectValue={true} />
                        <div hidden={!resumeState.resumeContact}>
                            <ResumeCard className="resume-contact-address-kana" label="ふりがな" value={resumeState.resumeContactAddressKana} />
                            <ResumeCard className="resume-contact-address" label="連絡先" value={resumeState.resumeContactAddressText} preLike={true} />
                            <ResumeCard className="resume-contact-tel" label="連絡先電話" value={resumeState.resumeContactTel} />
                        </div>
                    </section>

                    <section className="panel resume-info-history">
                        <ResumeTableHistory className="resume-history" name="resumeHistory"
                            maxNumRows={26 + (resumeState.resumeContact ? 0 : 3)} top={90 - (resumeState.resumeContact ? 0 : 18)} />
                    </section>
                </div>
            </div>

            <div className="page">
                <div className="page-content">
                    <section className="panel resume-info-license">
                        <ResumeTableHistory className="resume-license" name="resumeLicense"
                            maxNumRows={10} top={0} />
                    </section>

                    <section className="panel resume-info-motivation">
                        <ResumeCard className="resume-motivation" label="志望の動機、特技、好きな学科、アピールポイントなど"
                            value={resumeState.resumeMotivation} preLike={true} />
                    </section>

                    <section className="panel resume-info-wish">
                        <ResumeCard className="resume-wish" label="本人希望記入欄（特に給料・職種・勤務時間・勤務地・その他についての希望などがあれば記入）"
                            value={resumeState.resumeWish} preLike={true} />
                    </section>
                </div>
            </div>
        </article>
    );
}