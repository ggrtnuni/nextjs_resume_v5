interface StorageOptions {
    prefix?: string;
    session?: boolean;
}

const exportedObject = {
    /**
     * ローカルストレージに書き込む
     * @param key 
     * @param value 
     * @param options 
     */
    write: function <T>(key: string, value: T, options: StorageOptions = {}) {
        const prefix = options.prefix || '';
        const session = options.session || false;

        if (typeof window !== 'undefined') {
            let storage = localStorage;
            let storageName = 'localStorage';
            if (session) {
                storage = sessionStorage;
                storageName = 'sessionStorage';
            }

            try {
                const serialized = JSON.stringify(value) as string;
                storage.setItem(prefix + key, serialized);
            } catch (e) {
                console.error(`Failed to set ${storageName} value for key "${prefix + key}".`, e);
            }
        }
    },

    /**
     * ローカルストレージから読み込む
     * @param key 
     * @param defaultValue 
     * @param options 
     * @returns 
     */
    read: function <T>(key: string, defaultValue: T, options: StorageOptions = {}): T {
        const prefix = options.prefix || '';
        const session = options.session || false;

        let value: T = defaultValue;
        if (typeof window !== 'undefined') {
            let storage = localStorage;
            let storageName = 'localStorage';
            if (session) {
                storage = sessionStorage;
                storageName = 'sessionStorage';
            }

            const stored = storage.getItem(prefix + key);
            if (stored !== null) {
                try {
                    value = JSON.parse(stored) as T;
                } catch (error) {
                    console.error(`Failed to parse ${storageName} value for key "${prefix + key}".`, error);
                    storage.removeItem(prefix + key);
                }
            }
        }
        return value;
    }
}

export default exportedObject;
