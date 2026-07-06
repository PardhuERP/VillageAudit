const API = "https://script.google.com/macros/s/AKfycby2PHdv3C9YFmZZ7akKazW5aqPX337oxcBwgVD65NpGC_5bUMSnLttaCmqSds0d6Yv_Eg/exec";
let reportTemplates = [];
// =======================================
// ELEMENTS
// =======================================

const year = document.getElementById("year");
const state = document.getElementById("state");
const district = document.getElementById("district");
const subdistrict = document.getElementById("subdistrict");
const village = document.getElementById("village");

// =======================================
// API
// =======================================

async function api(action, params = "") {

    try {

        const res = await fetch(API + "?action=" + action + params);

        return await res.json();

    } catch (e) {

        console.error(e);

        alert("Network Error");

        return {
            status: false,
            data: []
        };

    }

}

// =======================================
// RESET
// =======================================

function resetDistrict() {
    district.innerHTML = "<option value=''>Select District</option>";
}

function resetSubDistrict() {
    subdistrict.innerHTML = "<option value=''>Select Sub District</option>";
}

function resetVillage() {
    village.innerHTML = "<option value=''>Select Village</option>";
}

// =======================================
// STATES
// =======================================

async function loadStates() {

    const json = await api("getStates");

    if (!json.status) return;

    state.innerHTML = "<option value=''>Select State</option>";

    json.data.forEach(s => {

        state.innerHTML +=
            `<option value="${s.code}">${s.name}</option>`;

    });

}

// =======================================
// DISTRICTS
// =======================================

async function loadDistricts(stateCode) {

    const json = await api(
        "getDistricts",
        "&state=" + stateCode
    );

    if (!json.status) return;

    district.innerHTML =
        "<option value=''>Select District</option>";

    json.data.forEach(d => {

        district.innerHTML +=
            `<option value="${d.code}">${d.name}</option>`;

    });

}

// =======================================
// SUB DISTRICTS
// =======================================

async function loadSubDistricts(districtCode) {

    const json = await api(
        "getSubDistricts",
        "&district=" + districtCode
    );

    if (!json.status) return;

    subdistrict.innerHTML =
        "<option value=''>Select Sub District</option>";

    json.data.forEach(s => {

        subdistrict.innerHTML +=
            `<option value="${s.code}">${s.name}</option>`;

    });

}

// =======================================
// VILLAGES
// =======================================

async function loadVillages(stateCode, subDistrictCode) {

    const json = await api(
        "getVillages",
        "&state=" + stateCode +
        "&subdistrict=" + subDistrictCode
    );

    if (!json.status) return;

    village.innerHTML =
        "<option value=''>Select Village</option>";

    json.data.forEach(v => {

        village.innerHTML +=
            `<option value="${v.code}">${v.name}</option>`;

    });

}

// =======================================
// SELECTED DETAILS
// =======================================

function updateSelection() {

    document.getElementById("selectedYear").innerText =
        year.value || "-";

    document.getElementById("selectedState").innerText =
        state.selectedIndex > 0
            ? state.options[state.selectedIndex].text
            : "-";

    document.getElementById("selectedDistrict").innerText =
        district.selectedIndex > 0
            ? district.options[district.selectedIndex].text
            : "-";

    document.getElementById("selectedSubDistrict").innerText =
        subdistrict.selectedIndex > 0
            ? subdistrict.options[subdistrict.selectedIndex].text
            : "-";

    document.getElementById("selectedVillage").innerText =
        village.selectedIndex > 0
            ? village.options[village.selectedIndex].text
            : "-";

}

// =======================================
// EVENTS
// =======================================

year.addEventListener("change", updateSelection);

state.addEventListener("change", function () {

    resetDistrict();
    resetSubDistrict();
    resetVillage();

    updateSelection();

    if (!this.value) return;

    loadDistricts(this.value);

});

district.addEventListener("change", function () {

    resetSubDistrict();
    resetVillage();

    updateSelection();

    if (!this.value) return;

    loadSubDistricts(this.value);

});

subdistrict.addEventListener("change", function () {

    resetVillage();

    updateSelection();

    if (!this.value) return;

    loadVillages(
        state.value,
        this.value
    );

});

village.addEventListener("change", updateSelection);

// =======================================
// START
// =======================================

window.onload = async function () {

    await loadStates();

    updateSelection();

};
