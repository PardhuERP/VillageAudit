function update(id,msg){

document.getElementById(id).innerText=msg;

}

function syncStates(){

update("statesStatus","Syncing States...");

// TODO:
// Apps Script API

}

function syncDistricts(){

update("districtStatus","Syncing Districts...");

}

function syncBlocks(){

update("blockStatus","Syncing Blocks...");

}

function syncGP(){

update("gpStatus","Syncing Gram Panchayats...");

}

function syncVillages(){

update("villageStatus","Syncing Villages...");

}

async function syncAll(){

update("allStatus","Starting...");

syncStates();

await sleep(1000);

syncDistricts();

await sleep(1000);

syncBlocks();

await sleep(1000);

syncGP();

await sleep(1000);

syncVillages();

await sleep(1000);

update("allStatus","Completed");

}

function sleep(ms){

return new Promise(resolve=>setTimeout(resolve,ms));

}
