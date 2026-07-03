const API =
"https://script.google.com/macros/s/AKfycby2PHdv3C9YFmZZ7akKazW5aqPX337oxcBwgVD65NpGC_5bUMSnLttaCmqSds0d6Yv_Eg/exec";

async function call(action){

document.getElementById("status").innerHTML="Processing...";

const res=await fetch(API+"?action="+action);

const json=await res.json();

document.getElementById("status").innerHTML=
JSON.stringify(json,null,2);

}

function syncStates(){

call("syncStatesFromLGD");

}

function syncDistricts(){

call("syncDistrictsFromLGD");

}

function syncSubDistricts(){

call("syncSubDistrictsFromLGD");

}

function syncAllStates(){

call("syncAllStates");

}
