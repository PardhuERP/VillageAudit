const API =
"https://script.google.com/macros/s/AKfycby2PHdv3C9YFmZZ7akKazW5aqPX337oxcBwgVD65NpGC_5bUMSnLttaCmqSds0d6Yv_Eg/exec";

async function getConfig() {

    const res = await fetch(API + "?action=getConfig");

    const json = await res.json();

    return json.data;

}
