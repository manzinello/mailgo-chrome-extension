import mailgo from "mailgo";

// check if mailgo HTML is already present in the page
let mailgoExists = !!document.getElementById("mailgo");

if (!mailgoExists) mailgo();
