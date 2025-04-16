"use client";

// import { useResumeDispatch } from '../_hooks/resumeHooks';
import { useResumeSelector } from '../_hooks/resumeHooks';
import {
    selectResumeHistory,
    selectResumeLicense,
    selectResumeCalender,
} from '../_slices/resumeSlice';
import format from '../_utils/format';

interface Props {
    className: string,
    name: string,
    top: number,
    step?: number,
    unit?: string,
    maxNumRows: number,
}

export default function ResumeTableHistory(props: Props) {
    const step = props.step || 6;
    const unit = props.unit || 'mm';

    // const dispatch = useResumeDispatch();
    const resumeState = {
        resumeHistory: useResumeSelector(selectResumeHistory),
        resumeLicense: useResumeSelector(selectResumeLicense),
        resumeCalender: useResumeSelector(selectResumeCalender),
    };

    // 上流から受け取った name の値によってデータソースを「学歴・職歴」「免許・資格」のどちらかに切り替える。
    let target = resumeState.resumeHistory;
    let subtitle = '学歴・職歴';
    if (props.name === 'resumeLicense') {
        target = resumeState.resumeLicense;
        subtitle = '免許・資格';
    }

    const rows = target.rows.map((row, index) => {
        if (index < props.maxNumRows) {
            return (
                <div className="row" key={index}>
                    <div className="resume-year"
                        style={{ top: (props.top + step + index * step) + unit }}>
                        {format.year(resumeState.resumeCalender, target.rows[index]['resume-year'])} {
                            String(row['resume-year']).length > 0 ? '年' : ''}
                    </div>
                    <div className="resume-month"
                        style={{ top: (props.top + step + index * step) + unit }}>
                        {row['resume-month']}
                    </div>
                    <div className="resume-text"
                        style={{ top: (props.top + step + index * step) + unit, textAlign: row['right'] ? 'right' : 'inherit' }}>
                        {row['resume-text']}
                    </div>
                </div >
            );
        } else {
            return <></>
        }
    });

    const emptyRows = Array.from({ length: (props.maxNumRows - target.rows.length > 0 ? props.maxNumRows - target.rows.length : 0) }, (_, index) => {
        return (
            <div className="row" key={index}>
                <div className="resume-year"
                    style={{ top: (props.top + step + (target.rows.length + index - 1) * step) + unit }}>
                </div>
                <div className="resume-month"
                    style={{ top: (props.top + step + (target.rows.length + index - 1) * step) + unit }}>
                </div>
                <div className="resume-text"
                    style={{ top: (props.top + step + (target.rows.length + index - 1) * step) + unit }}>
                </div>
            </div >
        );
    });

    return (
        <div className={`table ${props.className}`}>
            <div className="table-header">
                <div className="resume-year" style={{ top: props.top + unit }}>
                    年
                </div>
                <div className="resume-month" style={{ top: props.top + unit }}>
                    月
                </div>
                <div className="resume-text" style={{ top: props.top + unit }}>
                    {subtitle}
                </div>
            </div >

            <div className="table-body">
                {rows}
                {emptyRows}
            </div >
        </ div >
    );
}