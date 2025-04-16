"use client";

import { useState, type DragEvent as ReactDragEvent, type ChangeEvent as ReactChangeEvent } from 'react';
import '../fileupload.css';

interface Props {
    formId: string,
    accept: string,
    asDataUrl?: boolean,
    buttonLabel?: string,
    onUpload?: (result: { data: string }) => void,
}

export default function ResumeControlFileUpload(props: Props) {
    const formId = props.formId || 'file-input';
    const accept = props.accept || '*';
    const asDataUrl = props.asDataUrl || false;
    const buttonLabel = props.buttonLabel || 'アップロード';
    const onUpload = props.onUpload || Function();

    const [selectedFile, setSelectFile] = useState<File | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    /**
 * ドラックオーバーイベントのハンドラ
 * @param event 
 */
    const handleDragOver = (event: ReactDragEvent) => {
        setIsDragOver(true);
        event.preventDefault();
    };

    /**
     * ドラック開始イベントのハンドラ
     * @param event 
     */
    const handleDragEnter = (event: ReactDragEvent) => {
        setIsDragOver(true);
        event.preventDefault();
    };

    /**
     * ドラッグ離脱イベントのハンドラ
     */
    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    /**
     * ドロップイベントのハンドラ
     * @param event 
     */
    const handleDrop = (event: ReactDragEvent) => {
        setIsDragOver(false);
        setErrorMessage('');
        if (event && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const file = event.dataTransfer.files[0];
            setSelectFile(file);
        }
    };

    /**
     * ファイル変更イベントのハンドラ
     * ※ 「ファイルを選択」ボタンを押して開いたダイアログでファイルを選択したあと
     * @param event 
     */
    const handleFileChange = (event: ReactChangeEvent) => {
        setErrorMessage('');
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            setSelectFile(target.files[0]);
        }
    };

    /**
     * 選択中のファイルをクリアする
     */
    const clearFile = () => {
        setSelectFile(null);
        setErrorMessage('');
        const fileInput = document.getElementById(props.formId) as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    /**
     * ファイルアプロードのハンドラ
     * ※ サーバへのアップロードは行っていない、File オブジェクトを得るのみ
     */
    const handleUpload = async () => {
        if (!selectedFile) {
            setErrorMessage('アップロードするファイルを選択してください。');
            return;
        }

        setIsUploading(true);

        const file = selectedFile;
        if (file) {
            // ファイルが存在する場合、FileReader を使ってテキストとして読み込む
            const reader = new FileReader();

            reader.onload = function (e) {
                try {
                    // 上流に通知
                    if (e && e.target) {
                        // console.log(e.target.result)
                        onUpload({ data: String(e.target.result) });
                    } else {
                        console.error("ファイルのアップロードに失敗しました");
                    }
                    setIsUploading(false);
                } catch (error) {
                    console.error("JSON ファイルのパースに失敗しました:", error);
                    setIsUploading(false);
                }
            }

            reader.onerror = function (error) {
                console.error("ファイルの読み込みに失敗しました:", error);
                setIsUploading(false);
            }

            if (asDataUrl) {
                reader.readAsDataURL(file);
            } else {
                reader.readAsText(file);
            }
        } else {
            console.error("ファイルが選択されていません");
            setIsUploading(false);
        }
    }

    return (
        <div className="file-upload-container">
            <label htmlFor={formId} className={`file-upload-label ${isDragOver ? 'drag-over' : ''}`}
                onDragOver={(event) => { event.preventDefault(); handleDragOver(event) }}
                onDragEnter={(event) => { event.preventDefault(); handleDragEnter(event) }}
                onDragLeave={(event) => { event.preventDefault(); handleDragLeave() }}
                onDrop={(event) => { event.preventDefault(); handleDrop(event) }}>
                <div hidden={!!selectedFile}>
                    <p>ドラッグ＆ドロップでファイルを選択、<br />または</p>
                    <p className=" browse-button">ファイルを選択</p>
                </div>
                <div className="file-info">
                    <p>選択されたファイル:</p>
                    <p className="file-name">{selectedFile?.name}</p>
                </div>
            </label>
            <input type="file" id={formId} className="file-input" onChange={(event) => { handleFileChange(event) }} accept={accept} />
            <div hidden={!errorMessage} className="error-message">
                {errorMessage}
            </div>
            <div className="button-container">
                <button onClick={() => { handleUpload() }} disabled={!selectedFile || isUploading}>
                    {buttonLabel}
                </button>
                <button onClick={() => { clearFile() }} className="clear-button">
                    クリア
                </button>
            </div >
        </div >
    );
}