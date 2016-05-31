// -------------------------------
// ImagePreviewer Component

function ImagePreviewerComp() {}

ImagePreviewerComp.prototype.updateImage = function(input) {
    var image = document.querySelector('[data-bind="image-preview"]');
    var reader = new FileReader();
    
    if(input.files && input.files[0]) {
        reader.onload = function (e) {
            image.src = e.target.result;
        }
        
        reader.readAsDataURL(input.files[0]);
        
        ImagePreviewer.hideUploadButton();
    }    
}

ImagePreviewerComp.prototype.hideUploadButton = function() {
    var uploadButton = document.querySelector('[data-bind="upload-button"]');
    
    uploadButton.classList.add('only-hover');
}

window.ImagePreviewer = new ImagePreviewerComp();


// -------------------------------
// SVG Fiddler Component

function SVGFiddlerComp() {}

SVGFiddlerComp.prototype.initCode = function() {
    var colorMatrix = document.querySelectorAll('[data-bind="svg-code"] b');
    
    for (var i = 0; i < colorMatrix.length; i++) {
        var element = colorMatrix[i];
        
        colorMatrix[i].addEventListener("click", function(e) {
            SVGFiddler.removeSelected();
            SVGFiddler.handleColorMatrix(e);
        });
    }
}

SVGFiddlerComp.prototype.handleColorMatrix = function(e) {
    window.currentMatrixItem = e.target;
    
    SVGFiddler.updateInputRange(e.target.innerText);
    
    window.currentMatrixItem.classList.add('selected');
}

SVGFiddlerComp.prototype.removeSelected = function() {
    var colorMatrix = document.querySelectorAll('[data-bind="svg-code"] b');
    
    colorMatrix = Array.prototype.slice.call(colorMatrix);
    
    colorMatrix.forEach(function(elem) {
        elem.classList.remove('selected');
    }, this);
}

SVGFiddlerComp.prototype.updateMatrix = function(e) {
    if(!window.currentMatrixItem) {
        
    }else {
        var rangeValue = parseFloat(e.value / 1000).toFixed(1).toString().replace(/.0{1,}$/,'');
        window.currentMatrixItem.innerText = rangeValue;
        
        SVGFiddler.updateSVG();
    }
}

SVGFiddlerComp.prototype.updateInputRange = function(value) {
    var inputRange = document.querySelector('[data-bind="svg-input-range"]');
    var rangeValue = Math.floor(value * 1000);
    
    inputRange.value = rangeValue;
}

SVGFiddlerComp.prototype.updateSVG = function(value) {
    var realSVG = document.querySelector('[data-bind="real-svg"] filter feColorMatrix');
    var colorMatrix = document.querySelectorAll('[data-bind="svg-code"] b');
    var values = [];
    
    colorMatrix = Array.prototype.slice.call(colorMatrix);
    
    colorMatrix.forEach(function(e) {
        values.push(e.innerText);
    }, this);
    
    values = values.join(' ');
    
    console.log(values);
    
    realSVG.setAttribute('values', values);
}

SVGFiddlerComp.prototype.setValue = function(value) {
    var values = value.split(' ');
    var colorMatrix = document.querySelectorAll('[data-bind="svg-code"] b');
    
    colorMatrix = Array.prototype.slice.call(colorMatrix);
    
    colorMatrix.forEach(function(e, i) {
        e.innerHTML = values[i];
    }, this);
    
    SVGFiddler.removeSelected();
    
    SVGFiddler.updateSVG(value);
    
}

window.SVGFiddler = new SVGFiddlerComp();
SVGFiddler.initCode();