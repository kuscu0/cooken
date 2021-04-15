
const resulutions = {
    l: 552,
    m: 276,
    s: 138
}

export function getImgSrcFromRecipeData(recipeData, quality) {
    return `https://img.chefkoch-cdn.de/rezepte/${recipeData?._id}/bilder/${recipeData?.previewImageId}/crop-${resulutions[quality]}x${resulutions[quality]}/${recipeData?.title.replace(/\s/g, "-")}.jpg`
}