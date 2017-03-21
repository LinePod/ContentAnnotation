document.getElementById('btn').onclick = function() {
    var val = document.getElementById('imagename').value,
        src = val,
        img = document.createElement('img');

    img.src = src;
    img.style.position = "absolute"
    img.style.width = "100%"
    img.style.height = "90%"
    img.style.left = "0px"
    img.style.top = "100px"
    img.style.zindex = "10"
    document.body.appendChild(img);
}
