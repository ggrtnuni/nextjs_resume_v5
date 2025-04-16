"use client";

import { useEffect, useRef, useState } from 'react';
import { useResumeDispatch, useResumeSelector } from '../_hooks/resumeHooks';
import {
    selectResumeDate,
    selectResumeNameKana,
    selectResumeName,
    selectResumeGender,
    selectResumeBirthday,
    selectResumePostalcode,
    selectResumeAddressKana,
    selectResumeAddress,
    selectResumeEmail,
    selectResumeTel,
    selectResumeMobile,
    selectResumeContactPostalcode,
    selectResumeContactAddressKana,
    selectResumeContactAddress,
    selectResumeContactTel,
    selectResumeMotivation,
    selectResumeWish,
    selectResumeCalender,
    selectResumeContact,
    selectResumeVisibility,
    selectResumeSaveFilename,
    selectToJSON,
    // actions
    setResumeDate,
    setResumeNameKana,
    setResumeName,
    setResumeGender,
    setResumePostalcode,
    setResumeAddressKana,
    setResumeAddress,
    setResumeBirthday,
    setResumeEmail,
    setResumeTel,
    setResumeMobile,
    setResumeContactPostalcode,
    setResumeContactAddressKana,
    setResumeContactAddress,
    setResumeContactTel,
    setResumeMotivation,
    setResumeWish,
    setResumeIdPhoto,
    setResumeVisibility,
    setResumeCalender,
    setResumeContact,
    loadResumeFromJson,
    empty,
} from '../_slices/resumeSlice';
import ResumeControlButton from './ResumeControlButton';
import ResumeControlFileUpload from './ResumeControlFileUpload';
import ResumeControlInputText from './ResumeControlInputText';
import ResumeControlTextarea from './ResumeControlTextarea';
import ResumeControlInputRadio from './ResumeControlInputRadio';
import ResumeControlInputCheckbox from './ResumeControlInputCheckbox';
import ResumeControlTableHistory from './ResumeControlTableHistory';

export default function ResumeControl() {
    const dispatch = useResumeDispatch();
    const resumeState = {
        resumeDate: useResumeSelector(selectResumeDate),
        resumeNameKana: useResumeSelector(selectResumeNameKana),
        resumeName: useResumeSelector(selectResumeName),
        resumeGender: useResumeSelector(selectResumeGender),
        resumeBirthday: useResumeSelector(selectResumeBirthday),
        resumePostalcode: useResumeSelector(selectResumePostalcode),
        resumeAddressKana: useResumeSelector(selectResumeAddressKana),
        resumeAddress: useResumeSelector(selectResumeAddress),
        resumeEmail: useResumeSelector(selectResumeEmail),
        resumeTel: useResumeSelector(selectResumeTel),
        resumeMobile: useResumeSelector(selectResumeMobile),
        resumeContactPostalcode: useResumeSelector(selectResumeContactPostalcode),
        resumeContactAddressKana: useResumeSelector(selectResumeContactAddressKana),
        resumeContactAddress: useResumeSelector(selectResumeContactAddress),
        resumeContactTel: useResumeSelector(selectResumeContactTel),
        resumeMotivation: useResumeSelector(selectResumeMotivation),
        resumeWish: useResumeSelector(selectResumeWish),
        resumeCalender: useResumeSelector(selectResumeCalender),
        resumeContact: useResumeSelector(selectResumeContact),
        resumeVisibility: useResumeSelector(selectResumeVisibility),
        resumeSaveFilename: useResumeSelector(selectResumeSaveFilename),
        toJSON: useResumeSelector(selectToJSON),
        // actions
        setResumeDate,
        setResumeNameKana,
        setResumeName,
        setResumeGender,
        setResumePostalcode,
        setResumeAddressKana,
        setResumeAddress,
        setResumeBirthday,
        setResumeEmail,
        setResumeTel,
        setResumeMobile,
        setResumeContactPostalcode,
        setResumeContactAddressKana,
        setResumeContactAddress,
        setResumeContactTel,
        setResumeMotivation,
        setResumeWish,
        setResumeIdPhoto,
        setResumeVisibility,
        setResumeCalender,
        setResumeContact,
        empty,
        loadResumeFromJson,
    };
    const control = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log(`check resumeVisibility: ${resumeState.resumeVisibility} in ResumeControl.tsx`)
    }, [resumeState.resumeVisibility]);

    const [showSectionLoad, setShowSectionLoad] = useState(false);
    const [showSectionOption, setShowSectionOption] = useState(false);
    const [showSectionPhoto, setShowSectionPhoto] = useState(false);
    const [showSectionGeneral, setShowSectionGeneral] = useState(false);
    const [showSectionHistory, setShowSectionHistory] = useState(false);
    const [showSectionLicense, setShowSectionLicense] = useState(false);
    const [showSectionMotivation, setShowSectionMotivation] = useState(false);
    const [showSectionWish, setShowSectionWish] = useState(false);

    /**
     * 証明写真を反映 (サイズ調整あり)
     */
    const applyIdPhoto = (dataUri: string | null) => {
        if (typeof window !== 'undefined') {
            if (dataUri) {
                // アスペクト比を 3:4 としてトリミング
                const img = new Image();
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    img.style.display = 'none';
                    canvas.style.display = 'none';
                    document.body.appendChild(img);
                    document.body.appendChild(canvas);

                    img.onload = function () {
                        const mimeType = 'image/png';

                        let offsetWidth = 0;
                        let offsetHeight = 0;
                        let cropedWidth = img.naturalWidth;
                        let cropedHeight = img.naturalHeight;
                        if (img.naturalWidth / img.naturalHeight >= (3 / 4)) {
                            // 3/4よりも横長 or 長方形
                            cropedWidth = Math.ceil(img.naturalHeight * (3 / 4));
                            offsetWidth = Math.ceil((img.naturalWidth - cropedWidth) / 2);
                        } else {
                            // 3/4よりも縦長
                            cropedHeight = Math.ceil(img.naturalWidth * (4 / 3));
                            offsetHeight = Math.ceil((img.naturalHeight - cropedHeight) / 2);
                        }

                        // 354 x 472 で保存する (dataUri が長くなりすぎないように)
                        canvas.width = 354;
                        canvas.height = 472;
                        ctx.drawImage(img, offsetWidth, offsetHeight, cropedWidth, cropedHeight, 0, 0, 354, 472);
                        const dataUri = canvas.toDataURL(mimeType);

                        dispatch(resumeState.setResumeIdPhoto(dataUri));

                        // 不要になった要素を削除
                        document.body.removeChild(img);
                        document.body.removeChild(canvas);
                    }
                    img.src = dataUri;
                }
            }
        } else {
            console.warn('ブラウザ環境ではありません。');
        }
    }

    /**
     * 印刷ボタンのハンドラ
     */
    const printPage = () => {
        if (typeof window !== 'undefined') {
            window.print();
        } else {
            console.warn('ブラウザ環境ではありません。');
        }
    }

    /**
     * 保存(JSON)ボタンのハンドラ
     */
    const confirmSave = () => {
        if (typeof window !== 'undefined') {
            // if ($data.isEmpty()) { window.alert('未入力です。'); } else { $data.downloadJSON() }
            const now = new Date();
            const saveFilename = resumeState.resumeSaveFilename.length > 0 ? resumeState.resumeSaveFilename : 'resume';
            const filename = String(now.getFullYear()) + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0')
                + '-' + String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0') + String(now.getSeconds()).padStart(2, '0')
                + '-' + saveFilename + '.json';

            const json = resumeState.toJSON;
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url); // メモリリークを防ぐ

        } else {
            console.warn('ブラウザ環境ではありません。');
        }
    }

    /**
     * 消去ボタンのハンドラ
     */
    const confirmClearAll = () => {
        if (typeof window !== 'undefined') {
            if (confirm('記載した履歴書の情報を削除しますか？')) {
                dispatch(resumeState.empty());
            }
        } else {
            console.warn('ブラウザ環境ではありません。');
        }
    }

    /**
     * 読込(JSON)のハンドラ
     */
    const handleUploadJson = (response: { data: string }) => {
        // console.log(response.data)
        const jsonData = JSON.parse(response.data);
        // console.log("展開された JSON データ:", Object.keys(jsonData));
        dispatch(resumeState.loadResumeFromJson(jsonData));
    }

    /**
     * 証明写真アップロードのハンドラ
     * @param image 
     */
    const handleUploadIdPhoto = (response: { data: string }) => {
        applyIdPhoto(response.data);
    }

    useEffect(() => {
        if (resumeState.resumeVisibility === true) {
            if (control.current) {
                control.current.classList.remove('w-full', 'control-wide');
            }
        } else {
            if (control.current) {
                control.current.classList.add('w-full', 'control-wide');
            }
        }
        setShowSectionLoad(!resumeState.resumeVisibility);
        setShowSectionOption(!resumeState.resumeVisibility);
        setShowSectionPhoto(!resumeState.resumeVisibility);
        setShowSectionGeneral(!resumeState.resumeVisibility);
        setShowSectionHistory(!resumeState.resumeVisibility);
        setShowSectionLicense(!resumeState.resumeVisibility);
        setShowSectionMotivation(!resumeState.resumeVisibility);
        setShowSectionWish(!resumeState.resumeVisibility);
    }, [resumeState.resumeVisibility]);

    return (
        <div className="no-print control" ref={control}>
            <div className="float-right text-indigo-500 cursor-pointer"
                onClick={() => { dispatch(resumeState.setResumeVisibility(!resumeState.resumeVisibility)) }}>
                {resumeState.resumeVisibility ? '■' : '×'}
            </div>
            <span className="tex-gray-700">コントロール</span>
            <div style={{ fontSize: '9pt', marginBottom: '6mm' }}>
                <div style={{ fontSize: '9pt', marginBottom: '6mm' }}>
                    （コントロールは印刷されません）
                </div>
                <hr />
                <div style={{ fontSize: '9pt', marginBottom: '6mm' }}>
                    <div>
                        <ResumeControlButton data-show={resumeState.resumeVisibility} onClick={() => { printPage() }}>
                            印刷
                        </ResumeControlButton>
                        <ResumeControlButton onClick={() => { confirmSave() }}>
                            保存(JSON)
                        </ResumeControlButton>
                        <ResumeControlButton level="danger" onClick={() => { confirmClearAll() }}>
                            消去
                        </ResumeControlButton>
                    </div>
                </div >

                <hr />
                <div style={{ fontSize: '9pt', marginBottom: '6mm' }}>
                    <div>
                        <div className="flex items-left">
                            <h2 className="text-sm font-bold text-gray-700">読込 (JSON)</h2>
                            <div className="text-sm text-indigo-500 cursor-pointer" onClick={() => { setShowSectionLoad(!showSectionLoad) }}>
                                {showSectionLoad ? '▲' : '▼'}
                            </div>
                        </div>
                        <div hidden={!showSectionLoad}>
                            <ResumeControlFileUpload formId="jsonUpload" accept="application/json"
                                onUpload={(payload) => { handleUploadJson(payload) }} buttonLabel="反映" />
                        </div>
                    </div>
                </div >

                <hr />
                <div style={{ fontSize: '9pt', marginBottom: '6mm' }}>
                    <div>
                        <div className="flex items-left">
                            <h2 className="text-sm font-bold text-gray-700">オプション</h2>
                            <div className="text-sm text-indigo-500 cursor-pointer"
                                onClick={() => { setShowSectionOption(!showSectionOption) }}>
                                {showSectionOption ? '▲' : '▼'}
                            </div>
                        </div>
                        <div hidden={!showSectionOption}>
                            <ResumeControlInputRadio name="resumeCalender" selected={resumeState.resumeCalender}
                                items={[
                                    { 'label': '西暦', 'value': 'en' },
                                    { 'label': '和暦', 'value': 'jp' },
                                ]} onChange={(value: string) => { dispatch(resumeState.setResumeCalender(value)) }}>
                                年表記
                            </ResumeControlInputRadio>
                            <ResumeControlInputCheckbox name="resumeContact"
                                label="表示する" checked={resumeState.resumeContact} onChange={(value: boolean) => { dispatch(resumeState.setResumeContact(value)) }}>
                                連絡先
                            </ResumeControlInputCheckbox>
                            <ResumeControlInputText value={resumeState.resumeSaveFilename} name="resumeSaveFilename"
                                onInput={(value: string) => { resumeState.resumeSaveFilename = value }}>
                                保存時のファイル名
                            </ResumeControlInputText>
                        </div >
                    </div >
                </div >

                <hr />
                <div style={{ fontSize: '9pt', marginBottom: '6mm' }}>
                    <div>
                        <div className="flex items-left">
                            <h2 className="text-sm font-bold text-gray-700">証明写真</h2>
                            <div className="text-sm text-indigo-500 cursor-pointer"
                                onClick={() => { setShowSectionPhoto(!showSectionPhoto) }}>
                                {showSectionPhoto ? '▲' : '▼'}
                            </div>
                        </div>
                        <div hidden={!showSectionPhoto}>
                            <ResumeControlFileUpload formId="imageUpload" accept="image/*"
                                onUpload={(payload) => { handleUploadIdPhoto(payload) }}
                                buttonLabel="反映" asDataUrl={true} />
                        </div>
                    </div>
                </div >

                <hr />
                <div style={{ fontSize: '9pt', marginBottom: '6mm' }}>
                    <div>
                        <div className="flex items-left">
                            <h2 className="text-sm font-bold text-gray-700">基本情報</h2>
                            <div className="text-sm text-indigo-500 cursor-pointer"
                                onClick={() => { setShowSectionGeneral(!showSectionGeneral) }}>
                                {showSectionGeneral ? '▲' : '▼'}
                            </div>
                        </div>
                        <div hidden={!showSectionGeneral}>
                            <ResumeControlInputText value={resumeState.resumeDate} name="resumeDate"
                                onInput={(value: string) => { dispatch(resumeState.setResumeDate(value)) }}>
                                記入日
                            </ResumeControlInputText>
                            <ResumeControlInputText value={resumeState.resumeNameKana} name="resumeNameKana"
                                onInput={(value: string) => { dispatch(resumeState.setResumeNameKana(value)) }}>
                                氏名ふりがな
                            </ResumeControlInputText>
                            <ResumeControlInputText value={resumeState.resumeName} name="resumeName"
                                onInput={(value: string) => { dispatch(resumeState.setResumeName(value)) }} >
                                氏名
                            </ResumeControlInputText >

                            <ResumeControlInputRadio name="resumeGender" selected={resumeState.resumeGender}
                                items={[
                                    { 'label': '未回答', 'value': '0' },
                                    { 'label': '男', 'value': '1' },
                                    { 'label': '女', 'value': '2' },
                                ]} onChange={(value: string) => { dispatch(resumeState.setResumeGender(value)) }} >
                                性別
                            </ResumeControlInputRadio >
                            <ResumeControlInputText value={resumeState.resumeBirthday} name="resumeBirthday"
                                onInput={(value: string) => { dispatch(resumeState.setResumeBirthday(value)) }} >
                                生年月日
                            </ResumeControlInputText >
                            <ResumeControlInputText value={resumeState.resumePostalcode} name="resumePostalcode"
                                onInput={(value: string) => { dispatch(resumeState.setResumePostalcode(value)) }} >
                                郵便番号
                            </ResumeControlInputText >
                            <ResumeControlInputText value={resumeState.resumeAddressKana} name="resumeAddressKana"
                                onInput={(value: string) => { dispatch(resumeState.setResumeAddressKana(value)) }} >
                                住所ふりがな
                            </ResumeControlInputText >
                            <ResumeControlInputText value={resumeState.resumeAddress} name="resumeAddress"
                                onInput={(value: string) => { dispatch(resumeState.setResumeAddress(value)) }} >
                                住所
                            </ResumeControlInputText >
                            <ResumeControlInputText value={resumeState.resumeEmail} name="resumeEmail"
                                onInput={(value: string) => { dispatch(resumeState.setResumeEmail(value)) }} >
                                E - mail
                            </ResumeControlInputText >
                            <ResumeControlInputText value={resumeState.resumeTel} name="resumeTel"
                                onInput={(value: string) => { dispatch(resumeState.setResumeTel(value)) }} >
                                自宅電話
                            </ResumeControlInputText >
                            <ResumeControlInputText value={resumeState.resumeMobile} name="resumeMobile"
                                onInput={(value: string) => { dispatch(resumeState.setResumeMobile(value)) }} >
                                携帯電話
                            </ResumeControlInputText >
                            <ResumeControlInputText value={resumeState.resumeContactPostalcode}
                                name="resumeContactPostalcode"
                                onInput={(value: string) => { dispatch(resumeState.setResumeContactPostalcode(value)) }} >
                                連絡先郵便番号
                            </ResumeControlInputText >
                            <ResumeControlInputText value={resumeState.resumeContactAddressKana}
                                name="resumeContactAddressKana"
                                onInput={(value: string) => { dispatch(resumeState.setResumeContactAddressKana(value)) }} >
                                連絡先住所ふりがな</ResumeControlInputText >
                            <ResumeControlInputText value={resumeState.resumeContactAddress} name="resumeContactAddress"
                                onInput={(value: string) => { dispatch(resumeState.setResumeContactAddress(value)) }} >
                                連絡先住所
                            </ResumeControlInputText >
                            <ResumeControlInputText value={resumeState.resumeContactTel} name="resumeContactTel"
                                onInput={(value: string) => { dispatch(resumeState.setResumeContactTel(value)) }} >
                                連絡先電話
                            </ResumeControlInputText >
                        </div >
                    </div >
                </div >
            </div >

            <hr />
            <div style={{ fontSize: '9pt', marginBottom: '6mm' }}>
                <div>
                    <div className="flex items-left">
                        <h2 className="text-sm font-bold text-gray-700">学歴・職歴</h2>
                        <div className="text-sm text-indigo-500 cursor-pointer"
                            onClick={() => { setShowSectionHistory(!showSectionHistory) }}>
                            {showSectionHistory ? '▲' : '▼'}
                        </div>
                    </div>
                    <div hidden={!showSectionHistory}>
                        <ResumeControlTableHistory name="resumeHistory" />
                    </div>
                </div>
            </div >

            <hr />
            <div style={{ fontSize: '9pt', marginBottom: '6mm' }}>
                <div>
                    <div className="flex items-left">
                        <h2 className="text-sm font-bold text-gray-700">免許・資格</h2>
                        <div className="text-sm text-indigo-500 cursor-pointer"
                            onClick={() => { setShowSectionLicense(!showSectionLicense) }}>
                            {showSectionLicense ? '▲' : '▼'}
                        </div>
                    </div>
                    <div hidden={!showSectionLicense}>
                        <ResumeControlTableHistory name="resumeLicense" />
                    </div>
                </div>
            </div >

            <hr />
            <div style={{ fontSize: '9pt', marginBottom: '6mm' }}>
                <div>
                    <div className="flex items-left">
                        <h2 className="text-sm font-bold text-gray-700">志望動機</h2>
                        <div className="text-sm text-indigo-500 cursor-pointer"
                            onClick={() => { setShowSectionMotivation(!showSectionMotivation) }}>
                            {showSectionMotivation ? '▲' : '▼'}
                        </div>
                    </div>
                    <div hidden={!showSectionMotivation}>
                        <ResumeControlTextarea value={resumeState.resumeMotivation} name="resumeMotivation"
                            onInput={(value: string) => { dispatch(resumeState.setResumeMotivation(value)) }}>
                        </ResumeControlTextarea>
                    </div>
                </div >
            </div >

            <hr />
            <div style={{ fontSize: '9pt', marginBottom: '6mm' }}>
                <div>
                    <div className="flex items-left">
                        <h2 className="text-sm font-bold text-gray-700">本人希望記入欄</h2>
                        <div className="text-sm text-indigo-500 cursor-pointer" onClick={() => { setShowSectionWish(!showSectionWish) }}>
                            {showSectionWish ? '▲' : '▼'}
                        </div>
                    </div>
                    <div hidden={!showSectionWish}>
                        <ResumeControlTextarea value={resumeState.resumeWish} name="resumeWish"
                            onInput={(value: string) => { dispatch(resumeState.setResumeWish(value)) }}>
                        </ResumeControlTextarea>
                    </div>
                </div >
            </div >
        </div >
    );
}