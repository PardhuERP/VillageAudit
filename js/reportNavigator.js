function openReport(){

    const year=document.getElementById("year").value;

    const state=document.getElementById("state").value;

    const district=document.getElementById("district").value;

    const block=document.getElementById("block").value;

    const village=document.getElementById("village").value;

    const url=
"https://egramswaraj.gov.in/FileRedirect.jsp?FD=SummaryReport"
+year+
"/"+state+
"/"+district+
"&name="+block+".html";

    window.open(url,"_blank");

}
