const API="https://script.google.com/macros/s/AKfycby2PHdv3C9YFmZZ7akKazW5aqPX337oxcBwgVD65NpGC_5bUMSnLttaCmqSds0d6Yv_Eg/exec";


window.onload=function(){

loadStates();

};

async function loadStates(){

const res=await fetch(API+"?action=getStates");

const json=await res.json();

const state=document.getElementById("state");

state.innerHTML="<option value=''>Select State</option>";

json.data.forEach(s=>{

state.innerHTML+=`<option value="${s.code}">${s.name}</option>`;

});

}

document.getElementById("state").addEventListener("change",function(){

loadDistricts(this.value);

});

async function loadDistricts(stateCode){

const district=document.getElementById("district");

district.innerHTML="<option>Loading...</option>";

const res=await fetch(API+"?action=getDistricts&state="+stateCode);

const json=await res.json();

district.innerHTML="<option value=''>Select District</option>";

json.data.forEach(d=>{

district.innerHTML+=`<option value="${d.code}">${d.name}</option>`;

});

}

document.getElementById("district").addEventListener("change", function () {

    loadSubDistricts(this.value);

});

async function loadSubDistricts(districtCode) {

    const sub = document.getElementById("subdistrict");

    sub.innerHTML = "<option>Loading...</option>";

    const res = await fetch(API + "?action=getSubDistricts&district=" + districtCode);

    const json = await res.json();

    sub.innerHTML = "<option value=''>Select Sub District</option>";

    json.data.forEach(s => {

        sub.innerHTML += `<option value="${s.code}">${s.name}</option>`;

    });

}

async function loadVillages(stateCode, subDistrictCode) {

    const village = document.getElementById("village");

    village.innerHTML = "<option>Loading...</option>";

    const res = await fetch(
        API +
        "?action=getVillages" +
        "&state=" + stateCode +
        "&subdistrict=" + subDistrictCode
    );

    const json = await res.json();

    village.innerHTML = "<option value=''>Select Village</option>";

    json.data.forEach(v => {

        village.innerHTML +=
            `<option value="${v.code}">${v.name}</option>`;

    });

}
