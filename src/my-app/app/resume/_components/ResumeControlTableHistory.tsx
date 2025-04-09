"use client";

import { useResumeDispatch, useResumeSelector } from '../_hooks/resumeHooks';
import {
    selectResumeHistory,
    selectResumeLicense,
    selectResumeCalender,
    selectResumeVisibility,
    // actions
    setResumeHistory,
    setResumeLicense,
} from '../_slices/resumeSlice';
import { type ResumeHistory } from '../_types/resume';
import ResumeControlButton from '../_components/ResumeControlButton';

interface Props {
    children?: React.ReactNode;
    name?: string;
}

export default function ResumeControlInputText(props: Props) {
    const children = props.children || '';
    const name = props.name || '';

    const dispatch = useResumeDispatch();
    const resumeState = {
        resumeHistory: useResumeSelector(selectResumeHistory),
        resumeLicense: useResumeSelector(selectResumeLicense),
        resumeCalender: useResumeSelector(selectResumeCalender),
        resumeVisibility: useResumeSelector(selectResumeVisibility),
        // actions
        setResumeHistory,
        setResumeLicense,
    };

    // 上流から受け取った name の値によってデータソースを「学歴・職歴」「免許・資格」のどちらかに切り替える。
    let target = resumeState.resumeHistory;
    let subtitle = '学歴・職歴';
    if (name === 'resumeLicense') {
        target = resumeState.resumeLicense;
        subtitle = '免許・資格';
    }

    /**
     * 行追加
     */
    const addRow = () => {
        if (name === 'resumeLicense') {
            dispatch(resumeState.setResumeLicense({ rows: [...resumeState.resumeLicense.rows, { 'resume-year': '', 'resume-month': '', 'resume-text': '', 'right': false }] } as ResumeHistory));
        } else {
            dispatch(resumeState.setResumeHistory({ rows: [...resumeState.resumeHistory.rows, { 'resume-year': '', 'resume-month': '', 'resume-text': '', 'right': false }] } as ResumeHistory));
        }
    };

    /**
     * 履歴を更新
     * @param resumeHistory 
     */
    const updateResumeHistory = (resumeHistory: ResumeHistory) => {
        if (name === 'resumeLicense') {
            dispatch(resumeState.setResumeLicense(resumeHistory));
        } else {
            dispatch(resumeState.setResumeHistory(resumeHistory));
        }
    }

    /**
     * 全て削除
     */
    const deleteAllRow = () => {
        const targetClone = { rows: [] } as ResumeHistory;
        if (typeof window !== 'undefined') {
            if (confirm('削除しますか？')) {
                updateResumeHistory(targetClone);
            }
        } else {
            console.warn('ブラウザ環境ではありません。');
            updateResumeHistory(targetClone);
        }
    };

    /**
     * 行入れ替え
     */
    const swapRow = (index1: number, index2: number) => {
        if (index1 >= 0 && index1 < target.rows.length && index2 >= 0 && index2 < target.rows.length) {
            const targetClone = { rows: [...target.rows] } as ResumeHistory;
            let temp = targetClone.rows.splice(index1, 1, targetClone.rows[index2]);
            targetClone.rows.splice(index2, 1, temp[0]);
            updateResumeHistory(targetClone);
        }
    };

    /**
     * 行削除
     */
    const deleteRow = (index: number) => {
        if (typeof window !== 'undefined') {
            if (confirm('削除しますか？')) {
                const targetClone = { rows: [...target.rows] } as ResumeHistory;
                targetClone.rows.splice(index, 1);
                updateResumeHistory(targetClone);
            }
        } else {
            console.warn('ブラウザ環境ではありません。');
            const targetClone = { rows: [...target.rows] } as ResumeHistory;
            targetClone.rows.splice(index, 1);
            updateResumeHistory(targetClone);
        }
    };

    /**
     * 年を更新
     * @param index 
     * @param value 
     */
    const updateResumeYear = (index: number, value: string) => {
        const targetClone = { rows: [...target.rows] } as ResumeHistory;
        targetClone.rows[index] = { ...targetClone.rows[index], "resume-year": value };
        updateResumeHistory(targetClone);
    };

    /**
     * 月を更新
     * @param index 
     * @param value 
     */
    const updateResumeMonth = (index: number, value: string) => {
        const targetClone = { rows: [...target.rows] } as ResumeHistory;
        targetClone.rows[index] = { ...targetClone.rows[index], "resume-month": value };
        updateResumeHistory(targetClone);
    };

    /**
     * 内容を更新
     * @param index 
     * @param value 
     */
    const updateResumeText = (index: number, value: string) => {
        const targetClone = { rows: [...target.rows] } as ResumeHistory;
        targetClone.rows[index] = { ...targetClone.rows[index], "resume-text": value };
        updateResumeHistory(targetClone);
    };

    /**
     * 右寄せの更新
     * @param index 
     * @param value 
     */
    const updateRight = (index: number, value: boolean) => {
        const targetClone = { rows: [...target.rows] } as ResumeHistory;
        targetClone.rows[index] = { ...targetClone.rows[index], "right": value };
        updateResumeHistory(targetClone);
    };

    const rows = target.rows.map((row, index) => {
        return (
            <div className={`border mb-1 bg-gray-100 p-1 rounded ${!resumeState.resumeVisibility ? 'flex' : ''} ${!resumeState.resumeVisibility ? 'items-left' : ''}`} key={index}>
                <div className="flex items-center mb-1">
                    <input type="text" defaultValue={row['resume-year']}
                        className="shadow appearance-none border rounded w-20 mr-2 py-1 px-3 text-xs text-gray-700 leading-tight focus:outline-none forcus:shadow-outline"
                        placeholder="年"
                        onInput={(event) => { updateResumeYear(index, (event.target as HTMLInputElement).value) }} />
                    <input type="text" defaultValue={row['resume-month']}
                        className="shadow appearance-none border rounded w-20 mr-2 py-1 px-3 text-xs text-gray-700 leading-tight focus:outline-none forcus:shadow-outline"
                        placeholder="月"
                        onInput={(event) => { updateResumeMonth(index, (event.target as HTMLInputElement).value) }} />
                </div>
                <div className={`flex items-center mb-1 ${!resumeState.resumeVisibility ? 'w-full' : ''} ${!resumeState.resumeVisibility ? 'pr-2' : ''}`}>
                    <input type="text" defaultValue={row['resume-text']}
                        className="shadow appearance-none border rounded w-full py-1 px-3 text-xs text-gray-700 leading-tight focus:outline-none forcus:shadow-outline"
                        placeholder="内容"
                        onInput={(event) => { updateResumeText(index, (event.target as HTMLInputElement).value) }} />
                </div >
                <div className="flex items-center">
                    <ResumeControlButton onClick={() => { swapRow(index, index - 1) }}>
                        上へ
                    </ResumeControlButton>
                    <ResumeControlButton onClick={() => { swapRow(index, index + 1) }} >
                        下へ
                    </ResumeControlButton >
                    <ResumeControlButton level="danger" onClick={() => { deleteRow(index) }}>
                        行削除
                    </ResumeControlButton >
                    <div className={`pl-1 text-nowrap`}>
                        <input type="checkbox" name={name} value="1"
                            id={`${name}-${index}`} defaultChecked={row['right'] === true}
                            className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                            onChange={(event) => { updateRight(index, (event.target as HTMLInputElement).checked) }} />
                        <label htmlFor={`${name}-${index}`}
                            className="ml-2 text-nowrap text-xs font-medium text-gray-900" >
                            右寄せ
                        </label >
                    </div >
                </div >
            </div >
        );
    });

    return (
        <div className="space-y-2 mb-2">
            <label htmlFor={name} className="block text-gray-700 text-sm font-bold">
                {children}
            </label>
            <div>
                <ResumeControlButton onClick={() => { addRow() }}>
                    行追加
                </ResumeControlButton>
                <ResumeControlButton onClick={() => { deleteAllRow() }} level="danger">
                    全削除
                </ResumeControlButton>
            </div>
            <div>
                {rows}
            </div>
        </div>
    );
}