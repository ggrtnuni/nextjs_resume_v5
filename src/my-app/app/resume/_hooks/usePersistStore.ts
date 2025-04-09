"use client";

/**
 * 状態をローカル/セッションストレージにも保存
 * 
 * @author ggrtn
 */
import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';

interface UsePersistStoreOptions<T> {
    // serializer?: StorageSerializers<T>;
    serializer?: {
        read(value: string): T,
        write(value: T): string,
    };
    immediate?: boolean;
    deep?: boolean;
    once?: boolean;
    prefix?: string;
    session?: boolean;
}

/**
 * リアクティブな変数をローカル/セッションストレージにも保存する
 * 
 * const hoge = useState<string>('');
 * ↓
 * const hoge = usePersistStore<string>('hoge', '', { prefix: 'tako_', session: true })
 * → セッションストレージに tako_hoge というキー名で保存され、更新も連動する。
 * 
 * [注意] usePersistStore の useEffect 配下以外で、setStoredValue を使うと無限ループになる。
 * 
 * sample: ブラウザのリロードをしても値が保持され続ける。ブラウザを閉じると全部消える。
 * const [counter, setCounter] = usePersistStore('counter', 0, { session: true, prefix: 'resume_v5_' })
 * 
 *  <div>
 *      <div>
 *          {counter}
 *      </div>
 *      <div>
 *          <button onClick={(e) => { setCounter(3) }}>set 3</button>
 *          <button onClick={(e) => { setCounter(6) }}>set 6</button>
 *          <button onClick={(e) => { setCounter(9) }}>set 9</button>
 *      </div>
 *  </div>
 * 
 * @param key 
 * @param initialValue 
 * @param options 
 * @returns 
 */
export function usePersistStore<T>(key: string, initialValue: T, options: UsePersistStoreOptions<T> = {}): [T, Dispatch<SetStateAction<T>>] {
    const {
        serializer = {
            read(value: string): T {
                return JSON.parse(value) as T;
            },
            write(value: T): string {
                return JSON.stringify(value) as string;
            }
        },
        prefix = '',
        session = false,
    } = options;

    const [isFirst, setIsFirst] = useState(true);
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    // console.log(`storedValue: ${storedValue}, initialValue: ${initialValue}`)

    let initialSorageValue = initialValue;
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
                initialSorageValue = serializer.read(stored);
            } catch (error) {
                console.error(`Failed to parse ${storageName} value for key "${prefix + key}".`, error);
                storage.removeItem(prefix + key);
            }
        }
    }

    const updateStorage = () => {
        if (typeof window !== 'undefined') {
            let storage = localStorage;
            let storageName = 'localStorage';
            if (session) {
                storage = sessionStorage;
                storageName = 'sessionStorage';
            }

            try {
                const serialized = serializer.write(storedValue);
                storage.setItem(prefix + key, serialized);
            } catch (e) {
                console.error(`Failed to set ${storageName} value for key "${prefix + key}".`, e);
            }
        }
    };

    useEffect(() => {
        // Hydration エラーが出ないように、ローカルストレージの値は DOM 描画後に更新する。
        // useEffect の最初の呼び出しの時のみ、ローカルストレージの値を反映するようにする。
        if (isFirst) {
            setStoredValue(initialSorageValue);
            setIsFirst(false);
        }

        // storedValue を監視して変更があるたびにローカルストレージへの更新を行う。
        updateStorage();
    }, [storedValue]);

    return [storedValue, setStoredValue];
}
