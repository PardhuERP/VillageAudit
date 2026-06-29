const API = "YOUR_WEB_APP_URL";

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
