"use client";

import { useResumeDispatch, useResumeSelector } from '../_hooks/resumeHooks';
import {
    selectResumeContact,
} from '../_slices/resumeSlice';

interface Props {
    className: string,
    label: string,
    value: string,
    preLike?: boolean,
    contactEffectLabel?: boolean,
    contactEffectValue?: boolean,
}

export default function ResumeCard(props: Props) {
    const preLike = props.preLike || false;
    const contactEffectLabel = props.contactEffectLabel || false;
    const contactEffectValue = props.contactEffectValue || false;

    const dispatch = useResumeDispatch();
    const resumeState = {
        resumeContact: useResumeSelector(selectResumeContact),
    };

    return (
        <div className={`card ${props.className}`}>
            <h2 className={contactEffectLabel && !resumeState.resumeContact ? 'card-without-contact' : ''}>
                {props.label}
            </h2>
            <div className={`${preLike ? 'pre-like' : ''} ${contactEffectValue && !resumeState.resumeContact ? 'card-without-contact' : ''}`} >
                {props.value}
            </div >
        </div >
    );
}