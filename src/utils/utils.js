const resulutions = {
    l: 552,
    m: 276,
    s: 138
}

export function getImgSrcFromRecipeData(recipeData, quality) {
    return `https://img.chefkoch-cdn.de/rezepte/${recipeData?._id}/bilder/${recipeData?.previewImageId}/crop-${resulutions[quality]}x${resulutions[quality]}/${recipeData?.title.replace(/\s/g, "-")}.jpg`
}

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