const API = "https://script.google.com/macros/s/AKfycby2PHdv3C9YFmZZ7akKazW5aqPX337oxcBwgVD65NpGC_5bUMSnLttaCmqSds0d6Yv_Eg/exec";

async function saveVoucher(){

    const url =
        API +
        "?action=addPaymentVoucher" +
        "&date=" + encodeURIComponent(document.getElementById("date").value) +
        "&year=" + encodeURIComponent(document.getElementById("year").value) +
        "&scheme=" + encodeURIComponent(document.getElementById("scheme").value) +
        "&amount=" + encodeURIComponent(document.getElementById("amount").value) +
        "&paidTo=" + encodeURIComponent(document.getElementById("paidTo").value) +
        "&particulars=" + encodeURIComponent(document.getElementById("particulars").value) +
        "&voucherType=" + encodeURIComponent(document.getElementById("voucherType").value);

    const response = await fetch(url);
    const result = await response.json();

    alert(result.message);

}
