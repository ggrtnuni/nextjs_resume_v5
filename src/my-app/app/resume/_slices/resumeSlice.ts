import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ResumeHistory, type ResumeState, type ResumeJson } from '../_types/resume';
import format from '../_utils/format';
import validator from '../_utils/validator';

export type ResumeSliceState = ResumeState;

const initialState: ResumeSliceState = {
    resumeDate: '',
    resumeNameKana: '',
    resumeName: '',
    resumeGender: '0',
    resumeBirthday: '',
    resumePostalcode: '',
    resumeAddressKana: '',
    resumeAddress: '',
    resumeEmail: '',
    resumeTel: '',
    resumeMobile: '',
    resumeContactPostalcode: '',
    resumeContactAddressKana: '',
    resumeContactAddress: '',
    resumeContactTel: '',
    resumeHistory: { rows: [] } as ResumeHistory,
    resumeLicense: { rows: [] } as ResumeHistory,
    resumeMotivation: '',
    resumeWish: '',
    resumeIdPhoto: '',

    // view state
    resumeCalender: 'en',
    resumeContact: true,
    resumeVisibility: true,
    resumeSaveFilename: 'resume',
};

export const resumeSlice = createSlice({
    name: "resume",
    initialState,
    reducers: (create) => ({
        setResumeDate: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeDate = action.payload;
        }),
        setResumeNameKana: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeNameKana = action.payload;
        }),
        setResumeName: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeName = action.payload;
        }),
        setResumeGender: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeGender = action.payload;
        }),
        setResumeBirthday: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeBirthday = action.payload;
        }),
        setResumePostalcode: create.reducer((state, action: PayloadAction<string>) => {
            state.resumePostalcode = action.payload;
        }),
        setResumeAddressKana: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeAddressKana = action.payload;
        }),
        setResumeAddress: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeAddress = action.payload;
        }),
        setResumeEmail: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeEmail = action.payload;
        }),
        setResumeTel: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeTel = action.payload;
        }),
        setResumeMobile: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeMobile = action.payload;
        }),
        setResumeContactPostalcode: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeContactPostalcode = action.payload;
        }),
        setResumeContactAddressKana: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeContactAddressKana = action.payload;
        }),
        setResumeContactAddress: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeContactAddress = action.payload;
        }),
        setResumeContactTel: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeContactTel = action.payload;
        }),
        setResumeHistory: create.reducer((state, action: PayloadAction<ResumeHistory>) => {
            state.resumeHistory = action.payload;
        }),
        setResumeLicense: create.reducer((state, action: PayloadAction<ResumeHistory>) => {
            state.resumeLicense = action.payload;
        }),
        setResumeMotivation: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeMotivation = action.payload;
        }),
        setResumeWish: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeWish = action.payload;
        }),
        setResumeIdPhoto: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeIdPhoto = action.payload;
        }),

        setResumeCalender: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeCalender = action.payload;
        }),
        setResumeContact: create.reducer((state, action: PayloadAction<boolean>) => {
            state.resumeContact = action.payload;
        }),
        setResumeVisibility: create.reducer((state, action: PayloadAction<boolean>) => {
            state.resumeVisibility = action.payload;
        }),
        setResumeSaveFilename: create.reducer((state, action: PayloadAction<string>) => {
            state.resumeSaveFilename = action.payload;
        }),
        empty: create.reducer((state) => {
            state.resumeDate = '';
            state.resumeNameKana = '';
            state.resumeName = '';
            state.resumeGender = '0';
            state.resumeBirthday = '';
            state.resumePostalcode = '';
            state.resumeAddressKana = '';
            state.resumeAddress = '';
            state.resumeEmail = '';
            state.resumeTel = '';
            state.resumeMobile = '';
            state.resumeContactPostalcode = '';
            state.resumeContactAddressKana = '';
            state.resumeContactAddress = '';
            state.resumeContactTel = '';
            state.resumeHistory = { rows: [] } as ResumeHistory;
            state.resumeLicense = { rows: [] } as ResumeHistory;
            state.resumeMotivation = '';
            state.resumeWish = '';

            state.resumeIdPhoto = '';
            state.resumeCalender = 'en';
            state.resumeContact = true;
            state.resumeSaveFilename = 'resume';
        }),
        loadResumeFromJson: create.reducer((state, action: PayloadAction<ResumeJson>) => {
            state.resumeDate = action.payload.resumeDate;
            state.resumeNameKana = action.payload.resumeNameKana;
            state.resumeName = action.payload.resumeName;
            state.resumeGender = action.payload.resumeGender;
            state.resumeBirthday = action.payload.resumeBirthday;
            state.resumePostalcode = action.payload.resumePostalcode;
            state.resumeAddressKana = action.payload.resumeAddressKana;
            state.resumeAddress = action.payload.resumeAddress;
            state.resumeEmail = action.payload.resumeEmail;
            state.resumeTel = action.payload.resumeTel;
            state.resumeMobile = action.payload.resumeMobile;
            state.resumeContactPostalcode = action.payload.resumeContactPostalcode;
            state.resumeContactAddressKana = action.payload.resumeContactAddressKana;
            state.resumeContactAddress = action.payload.resumeContactAddress;
            state.resumeContactTel = action.payload.resumeContactTel;
            state.resumeHistory = action.payload.resumeHistory;
            state.resumeLicense = action.payload.resumeLicense;
            state.resumeMotivation = action.payload.resumeMotivation;
            state.resumeWish = action.payload.resumeWish;

            state.resumeIdPhoto = action.payload.resumeIdPhoto;
            state.resumeCalender = action.payload.resumeCalender;
            state.resumeContact = action.payload.resumeContact;
            state.resumeSaveFilename = action.payload.resumeSaveFilename;
        }),
    }),

    selectors: {
        selectResumeDate: (state) => state.resumeDate,
        selectResumeDateText: (state) => {
            let result = '';
            if (validator.date(state.resumeDate)) {
                const date = new Date(state.resumeDate);
                result = format.year(state.resumeCalender, date.getFullYear());
                result += ' 年';
                result += ' ' + (date.getMonth() + 1) + ' 月';
                result += ' ' + date.getDate() + ' 日 現在';
            } else {
                result += '年　　月　　日 現在';
            }
            return result;
        },
        selectResumeNameKana: (state) => state.resumeNameKana,
        selectResumeName: (state) => state.resumeName,
        selectResumeGender: (state) => state.resumeGender,
        selectResumeGenderText: (state) => {
            return state.resumeGender === '1' ? '男' : (state.resumeGender === '2' ? '女' : '-');
        },
        selectResumeBirthday: (state) => state.resumeBirthday,
        selectResumeBirthdayText: (state) => {
            let result = '';
            if (validator.date(state.resumeBirthday)) {
                const now = validator.date(state.resumeDate) ? new Date(state.resumeDate) : new Date();
                const date = new Date(state.resumeBirthday);
                const thisYearBirthday = format.thisYear(date, now);
                const age = now.getFullYear() - date.getFullYear() - 1 + (now.getTime() >= thisYearBirthday.getTime() ? 1 : 0);
                result = format.year(state.resumeCalender, date.getFullYear()) + ' 年';
                result += ' ' + (date.getMonth() + 1) + ' 月';
                result += ' ' + date.getDate() + ' 日';
                result += ' ( 満 ' + age + ' 歳 )';
            }
            return result;
        },
        selectResumePostalcode: (state) => state.resumePostalcode,
        selectResumeAddressKana: (state) => state.resumeAddressKana,
        selectResumeAddress: (state) => state.resumeAddress,
        selectResumeAddressText: (state) => {
            let result = '';
            if (validator.postalcode(state.resumePostalcode)) {
                result = '〒 ' + state.resumePostalcode;
            }
            if (validator.string(state.resumeAddress)) {
                if (result.length > 0) {
                    result += "\n";
                }
                result += state.resumeAddress;
            }
            return result;
        },
        selectResumeEmail: (state) => state.resumeEmail,
        selectResumeTel: (state) => state.resumeTel,
        selectResumeMobile: (state) => state.resumeMobile,
        selectResumeContactPostalcode: (state) => state.resumeContactPostalcode,
        selectResumeContactAddressKana: (state) => state.resumeContactAddressKana,
        selectResumeContactAddress: (state) => state.resumeContactAddress,
        selectResumeContactAddressText: (state) => {
            let result = '';
            if (validator.postalcode(state.resumeContactPostalcode)) {
                result = '〒 ' + state.resumeContactPostalcode;
            }
            if (validator.string(state.resumeContactAddress)) {
                if (result.length > 0) {
                    result += "\n";
                }
                result += state.resumeContactAddress;
            }
            return result;
        },
        selectResumeContactTel: (state) => state.resumeContactTel,
        selectResumeHistory: (state) => state.resumeHistory,
        selectResumeLicense: (state) => state.resumeLicense,
        selectResumeMotivation: (state) => state.resumeMotivation,
        selectResumeWish: (state) => state.resumeWish,
        selectResumeIdPhoto: (state) => state.resumeIdPhoto,

        // view state
        selectResumeCalender: (state) => state.resumeCalender,
        selectResumeContact: (state) => state.resumeContact,
        selectResumeVisibility: (state) => state.resumeVisibility,
        selectResumeSaveFilename: (state) => state.resumeSaveFilename,

        selectToJSON: (state) => {
            const data = {
                resumeDate: state.resumeDate,
                resumeNameKana: state.resumeNameKana,
                resumeName: state.resumeName,
                resumeGender: state.resumeGender,
                resumeBirthday: state.resumeBirthday,
                resumePostalcode: state.resumePostalcode,
                resumeAddressKana: state.resumeAddressKana,
                resumeAddress: state.resumeAddress,
                resumeEmail: state.resumeEmail,
                resumeTel: state.resumeTel,
                resumeMobile: state.resumeMobile,
                resumeContactPostalcode: state.resumeContactPostalcode,
                resumeContactAddressKana: state.resumeContactAddressKana,
                resumeContactAddress: state.resumeContactAddress,
                resumeContactTel: state.resumeContactTel,
                resumeHistory: state.resumeHistory,
                resumeLicense: state.resumeLicense,
                resumeMotivation: state.resumeMotivation,
                resumeWish: state.resumeWish,

                resumeCalender: state.resumeCalender,
                resumeContact: state.resumeContact,
                resumeSaveFilename: state.resumeSaveFilename,
                resumeIdPhoto: state.resumeIdPhoto,
            }
            return JSON.stringify(data, null, 2); // JSON 文字列に変換 (整形オプション付き)
        }
    },
});

export const {
    setResumeDate,
    setResumeNameKana,
    setResumeName,
    setResumeGender,
    setResumeBirthday,
    setResumePostalcode,
    setResumeAddressKana,
    setResumeAddress,
    setResumeEmail,
    setResumeTel,
    setResumeMobile,
    setResumeContactPostalcode,
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

    empty,
    loadResumeFromJson,

} = resumeSlice.actions;

export const {
    selectResumeDate,
    selectResumeDateText,
    selectResumeNameKana,
    selectResumeName,
    selectResumeGender,
    selectResumeGenderText,
    selectResumeBirthday,
    selectResumeBirthdayText,
    selectResumePostalcode,
    selectResumeAddressKana,
    selectResumeAddress,
    selectResumeAddressText,
    selectResumeEmail,
    selectResumeTel,
    selectResumeMobile,
    selectResumeContactPostalcode,
    selectResumeContactAddressKana,
    selectResumeContactAddress,
    selectResumeContactAddressText,
    selectResumeContactTel,
    selectResumeHistory,
    selectResumeLicense,
    selectResumeMotivation,
    selectResumeWish,
    selectResumeIdPhoto,
    selectToJSON,

    // view state
    selectResumeCalender,
    selectResumeContact,
    selectResumeVisibility,
    selectResumeSaveFilename,

} = resumeSlice.selectors;

