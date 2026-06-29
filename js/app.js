const API = "https://script.google.com/macros/s/AKfycby2PHdv3C9YFmZZ7akKazW5aqPX337oxcBwgVD65NpGC_5bUMSnLttaCmqSds0d6Yv_Eg/exec";

async function getConfig() {

    console.log("Calling API...");

    const response = await fetch(API + "?action=getConfig");

    console.log(response);

    const result = await response.json();

    console.log(result);

    return result.data;
}
