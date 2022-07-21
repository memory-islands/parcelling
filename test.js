var THRESHOLD = 6;

var img = new Image();
var canvas;
img.crossOrigin = 'anonymous';
var width;
var height;
var length = 15;
var ylength = 10;
img.src = 'http://localhost:8080/island-images/island_12.png';
img.onload = function() {
	width = this.width;
    height = this.height;
    canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(img, 0, 0, width, height);

 	for (var j = 0; j < ylength; j++){
        for (var i = 0; i < length; i++){
            //console.log(canvas.getContext("2d").getImageData(i,j,length,ylength).data);
            var left = (-1 * width/length * i).toString() +"px";
            var top = (-1 * height/ylength * j).toString() +"px";
            var element = jQuery('<div/>', {
                id: i + ";"+j,
                class: "splitImg",
                css: {
                "width" : Math.floor(width/length),
                "height":Math.floor(height/ylength),
            "background-position": left  + " " +  top,
            "background-image" : 'url(' + img.src + ')'
                },
                onclick: `oclk("${i};${j}")`
                })
                element.appendTo('#wrapper');
            $("#wrapper").width(width + (length *2))
        }
	}
}

const oclk = (shit) => {
    var coor = shit.split(";");
    // console.log(width/length*parseInt(coor[0])+width/length/2,height/ylength*parseInt(coor[1])+height/ylength/2);
    // console.log(canvas.getContext("2d").getImageData(width/length*parseInt(coor[0])+width/length/2,height/ylength*parseInt(coor[1])+height/ylength/2,1,1).data);
    // console.log(canvas.getContext("2d").getImageData(width/length*parseInt(coor[0]),height/ylength*parseInt(coor[1]),width/length,height/ylength).data);
    var pxO = canvas.getContext("2d").getImageData(width/length*parseInt(coor[0]),height/ylength*parseInt(coor[1]),width/length,height/ylength).data;
    if(isOcean(pxO)) alert('Devlet henüz okyanusu parsellemedi.');
    else alert('Ormanları yaktıktan sonra buraya otel dikebilirsin.');
}

var isOcean = (pixelArray) => {
    var exp = THRESHOLD*pixelArray.length/4;
    var raw = 0;
    for(let i=3;i<pixelArray.length;i+=4) raw+=pixelArray[i];
    return exp>raw;
}