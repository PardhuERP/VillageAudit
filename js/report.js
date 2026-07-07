const API = "https://script.google.com/macros/s/AKfycby2PHdv3C9YFmZZ7akKazW5aqPX337oxcBwgVD65NpGC_5bUMSnLttaCmqSds0d6Yv_Eg/exec";
let reportTemplates = [];
const report = document.getElementById("report");
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
    "&state=" + encodeURIComponent(stateCode)
);

    if (!json.status) return;

    district.innerHTML =
        "<option value=''>Select District</option>";

    json.data.forEach(d => {

        district.innerHTML +=
            `<option value="${d.code}">${d.name}</option>`;

    });
    updateSelection();
generateUrl();

}

// =======================================
// SUB DISTRICTS
// =======================================

async function loadSubDistricts(districtCode) {

    const json = await api(
    "getSubDistricts",
    "&district=" + encodeURIComponent(districtCode)
);

    if (!json.status) return;

    subdistrict.innerHTML =
        "<option value=''>Select Sub District</option>";

    json.data.forEach(s => {

        subdistrict.innerHTML +=
            `<option value="${s.code}">${s.name}</option>`;

    });
    updateSelection();
generateUrl();

}

// =======================================
// VILLAGES
// =======================================

async function loadVillages(stateCode, subDistrictCode) {

    const json = await api(
    "getVillages",
    "&state=" + encodeURIComponent(stateCode) +
    "&subdistrict=" + encodeURIComponent(subDistrictCode)
);

    if (!json.status) return;

    village.innerHTML =
        "<option value=''>Select Village</option>";

    json.data.forEach(v => {

        village.innerHTML +=
            `<option value="${v.code}">${v.name}</option>`;

    });
   updateSelection();
generateUrl(); 

}


// =======================================
// REPORT TYPES
// =======================================

async function loadReports() {

    const json = await api("getReportTypes");

    if (!json.status) return;

    reportTemplates = json.data;

    report.innerHTML =
        "<option value=''>Select Report</option>";

    json.data.forEach(r => {

        report.innerHTML +=
            `<option value="${r.id}">${r.name}</option>`;

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
// REPORT URL
// =======================================

function generateUrl() {

    const reportId = report.value;

    if (!reportId) {

        document.getElementById("generatedUrl").value = "";

        return;

    }

    const template = reportTemplates.find(r => String(r.id) === String(reportId));

    if (!template) return;

    let url = template.url;

    url = url.replace("{YEAR}", year.value);
    url = url.replace("{STATE}", state.value);
    url = url.replace("{DISTRICT}", district.value);
    url = url.replace("{SUBDISTRICT}", subdistrict.value);
    url = url.replace("{VILLAGE}", village.value);

    document.getElementById("generatedUrl").value = url;

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


village.addEventListener("change", function () {

    updateSelection();

    generateUrl();

});

report.addEventListener("change", generateUrl);

year.addEventListener("change", generateUrl);

state.addEventListener("change", generateUrl);

district.addEventListener("change", generateUrl);

subdistrict.addEventListener("change", generateUrl);

// =======================================
// START
// =======================================

window.onload = async function () {

    await loadStates();

    await loadReports();

    updateSelection();

};

// =======================================
// COPY URL
// =======================================

function copyUrl() {

    const url = document.getElementById("generatedUrl").value;

    if (!url) {

        alert("No URL Generated");

        return;

    }

    navigator.clipboard.writeText(url)
.then(() => {

    alert("URL Copied");

})
.catch(error => {

    console.error(error);

    alert("Unable to copy URL");

});

}

// =======================================
// OPEN REPORT
// =======================================

function openReport() {

    const url = document.getElementById("generatedUrl").value;

    if (!url) {

        alert("Generate URL First");

        return;

    }

    window.open(url, "_blank");

}
