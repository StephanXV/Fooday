function f() {
    var coll = document.getElementsByClassName("collapsible");
    coll[0].classList.toggle("active");
    var content = coll[0].nextElementSibling;

    if (content.style.maxHeight){
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}
