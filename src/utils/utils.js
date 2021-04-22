
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