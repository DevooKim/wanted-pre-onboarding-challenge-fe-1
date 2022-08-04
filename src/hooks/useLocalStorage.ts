import { useCallback, useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T) => {
    const [storageValue, setStorageValue] = useState<T | undefined>(() => {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    });

    const setValue = useCallback((value: T) => {
        setStorageValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
    }, []);

    const deleteValue = useCallback(() => {
        window.localStorage.removeItem(key);
        setStorageValue(undefined);
    }, []);

    return [storageValue, setValue, deleteValue] as const;
};

export default useLocalStorage;
