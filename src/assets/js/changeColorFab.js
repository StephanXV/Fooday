function myFunction() {
    var hb = document.getElementById("heartB").color;
    if (hb === "light") {
        document.getElementById("heartB").color = "primary";
    }
    if (hb === "primary") {
        document.getElementById("heartB").color = "light";
    }
    console.log(hb);
}
