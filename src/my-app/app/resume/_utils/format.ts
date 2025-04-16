/**
 * 書式整形関連
 * 
 * @author ggrtn
 */

import validator from './validator';

const exportedObject = {
    /**
     * 与えられた日付文字列を yyyy-mm-dd にする
     * @param dateString 
     * @returns 
     */
    date(dateString: string = '') {
        let now: Date | undefined;
        if (dateString.length === 0) {
            now = new Date();
        } else {
            now = new Date(dateString);
        }
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    },

    /**
     * 与えられた４桁の西暦を、与えられたタイプに応じて西暦か和暦にする
     * @param type 
     * @param year 
     * @returns 
     */
    year(type: string, year: number | string): string {
        if (typeof year === 'string') {
            year = parseInt(year);
        }

        let result: string = '';
        if (year && !isNaN(year)) {
            if (type === 'jp') {
                if (year <= 1988) {
                    result = `昭和 ${year - 1988 + 63}`;
                } else if (year <= 2018) {
                    result = `平成 ${year - 2018 + 30}`;
                } else {
                    result = `令和 ${year - 2018}`
                }
            } else {
                result = String(year);
            }
        }
        return String(result);
    },

    /**
     * 月日を変えずに、年だけ現在または指定された日付に変更する
     * @param birthDate 
     * @param now 
     * @returns 
     */
    thisYear(birthDate: string | Date, now: Date | string | null = null) {
        if (birthDate instanceof Date) {
            //
        } else if (typeof birthDate === 'string' && validator.date(birthDate)) {
            birthDate = new Date(birthDate);
        } else {
            birthDate = new Date();
        }

        if (now instanceof Date) {
            // 
        } else if (typeof now === 'string' && validator.date(now)) {
            now = new Date(now);
        } else {
            now = new Date();
        }

        const month = birthDate.getMonth();
        const day = birthDate.getDate();
        const currentYear = now.getFullYear();

        return new Date(currentYear, month, day);
    }
}

export default exportedObject;