import {useState} from "react";

const resulutions = {
    l: 552,
    m: 276,
    s: 138
}

export default function RecipeImg({ recipeData, quality }) {
    const [src, setSrc] = useState(`https://img.chefkoch-cdn.de/rezepte/${recipeData?._id}/bilder/${recipeData?.previewImageId}/crop-${resulutions[quality]}x${resulutions[quality]}/${recipeData?.title.replace(/\s/g, "-")}.jpg`);
    return <img src={src} alt={recipeData?.title} className="recipeImage" onError={() => setSrc("/img/logo.png")}/>
}
