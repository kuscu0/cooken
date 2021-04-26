import {useCallback, useEffect, useRef, useState} from "react";

export const serverAddress = "http://localhost:3000";

export async function authFetch(path, isJson, options = {}) {
    const r = await fetch(serverAddress + path, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
        ...options
    });
    return await (isJson ? r.json() : r.text());
}

export function isLoggedIn() {
    return Boolean(localStorage.token);
}

export function useStateCallback(initialState) {
    const [state, setState] = useState(initialState);
    const cbRef = useRef(null); // mutable ref to store current callback

    const setStateCallback = useCallback((state, cb) => {
        cbRef.current = cb; // store passed callback to ref
        setState(state);
    }, []);

    useEffect(() => {
        // cb.current is `null` on initial render, so we only execute cb on state *updates*
        if (cbRef.current) {
            cbRef.current(state);
            cbRef.current = null; // reset callback after execution
        }
    }, [state]);

    return [state, setStateCallback];
}

export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
