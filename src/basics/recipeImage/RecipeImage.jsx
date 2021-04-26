import {useState, useEffect} from "react";

const resulutions = {
    l: 552,
    m: 276,
    s: 138
}

const errorSrc = "/img/logo.png";

function srcFromData(recipeData, quality) {
    return `https://img.chefkoch-cdn.de/rezepte/${recipeData?._id}/bilder/${recipeData?.previewImageId}/crop-${resulutions[quality]}x${resulutions[quality]}/${recipeData?.title.replace(/\s/g, "-")}.jpg`
}

export default function RecipeImg({ recipeData, quality }) {
    const [src, setSrc] = useState(srcFromData(recipeData, quality));

    useEffect(() => {
        setSrc(srcFromData(recipeData, quality));
    }, [recipeData, quality]);

    return <img src={recipeData.hasImage ? src : errorSrc} alt={recipeData?.title} className="recipeImage" onError={() => setSrc(errorSrc)}/>
}
