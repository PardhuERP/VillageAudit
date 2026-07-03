const API = "https://script.google.com/macros/s/AKfycby2PHdv3C9YFmZZ7akKazW5aqPX337oxcBwgVD65NpGC_5bUMSnLttaCmqSds0d6Yv_Eg/exec";

async function loadStates() {

    const res = await fetch(API + "?action=getStates");
    const json = await res.json();

    const state = document.getElementById("state");

    state.innerHTML = "<option value=''>Select State</option>";

    json.data.forEach(s => {

        state.innerHTML +=
        `<option value="${s.code}">${s.name}</option>`;

    });

}

window.onload = function () {
    loadStates();
};
