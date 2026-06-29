const API = "https://script.google.com/macros/s/AKfycby2PHdv3C9YFmZZ7akKazW5aqPX337oxcBwgVD65NpGC_5bUMSnLttaCmqSds0d6Yv_Eg/exec";

async function getConfig(){

    const response = await fetch(API + "?action=getConfig");

    const result = await response.json();

    return result.data;

}
