/**
 * 履歴書 型定義
 * 
 * @author ggrtn
 */

// 履歴項目
export interface ResumeHistoryItem {
    'resume-year': string | number,
    'resume-month': string | number,
    'resume-text': string,
    'right'?: boolean | undefined,
};

// 履歴
export interface ResumeHistory {
    rows: Array<ResumeHistoryItem>,
};

// 履歴書 (json)
export interface ResumeJson {
    resumeDate: string;
    resumeNameKana: string;
    resumeName: string;
    resumeGender: string;
    resumeBirthday: string;
    resumePostalcode: string;
    resumeAddressKana: string;
    resumeAddress: string;
    resumeEmail: string;
    resumeTel: string;
    resumeMobile: string;
    resumeContactPostalcode: string;
    resumeContactAddressKana: string;
    resumeContactAddress: string;
    resumeContactTel: string;
    resumeHistory: ResumeHistory;
    resumeLicense: ResumeHistory;
    resumeMotivation: string;
    resumeWish: string;
    resumeIdPhoto: string;

    resumeCalender: string;
    resumeContact: boolean;
    resumeSaveFilename: string;
}

// 履歴書 状態
export interface ResumeState extends ResumeJson {
    resumeVisibility: boolean;
}