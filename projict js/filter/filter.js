let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let hueRotate = document.getElementById('hueRotate');

let upload = document.getElementById('upload');
let download = document.getElementById('download');
let img = document.getElementById("img");

let reset = document.querySelector('span');
let imgBox = document.querySelector('.img-box');

onload = function () {
    download.style.display = "none";
    reset.style.display = "none";
    imgBox.style.display = "none";
}

upload.onchange = function () {
    download.style.display = "block";
    reset.style.display = "block";
    imgBox.style.display = "block"
    
    let file = new FileReader();
    file.readAsDataURL(upload.file [0]);

    file.onload = () =>{
        img.src = file.result;
    }
};

let filter = document.querySelectorAll('ul li input');

filter.forEach(filters => {

    filters.addEventListener('input', () => {
        img.style.filter = `
        
        saturate  (${saturate.value}%)
        contrast  (${contrast.value}%)
        brightness(${brightness.value}%)
        sepia     (${sepia.value}%)
        grayscale (${grayscale.value})
        blur      (${blur.value}px)
        hueRotate (${hueRotate.value}deg)
        
        `
    })

})