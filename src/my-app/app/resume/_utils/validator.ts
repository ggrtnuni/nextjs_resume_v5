/**
 * 書式チェック関連
 * 
 * @author ggrtn
 */

export default {
    /**
     * yyyy-mm-dd かどうか確認する
     * @param date 
     * @returns 
     */
    date(date: string) {
        return date && date.length > 0 && date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/);
    },

    /**
     * nnn-nnnn かどうか確認する
     * @param code 
     * @returns 
     */
    postalcode(code: string) {
        return code && code.length > 0 && code.match(/^[0-9]{3}-[0-9]{4}$/);
    },

    /**
     * 1文字以上の文字列化どうか確認する
     * @param text 
     * @returns 
     */
    string(text: string) {
        return text && text.length > 0;
    }
}