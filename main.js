status = "";
objects = [];
alarm = "";
function preload() {
yes = loadImage("yes.jpg");
alarm = loadSound("alarm.mp3");
}
function setup() {
canvas = createCanvas(380, 380);
canvas.center();
baby = true;
objectDetector = ml5.objectDetector('cocossd', modelLoaded);
   
}

function draw() {
image(yes, 0, 0, 380, 380);
if (status != "") {

    for(i=0; i<objects.length; i++) {
        document.getElementById("s_value").innerHTML = "Objects Detected";

        percentage = floor(objects[i].confidence*100);
        fill("#FF0000");
        text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y +20);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if (objects[i].label != "person") {
            alarm.play();
            alarm.setVolume(1);
            alarm.rate(1);
        }
        else {
            document.getElementById("baby").innerHTML = "Baby Found";
        }
    }
}



objectDetector.detect(yes, getResults)

}

function modelLoaded() {
    console.log("Model Loaded!");
    status= true;
    document.getElementById("s_value").innerHTML = "Detecting Objects";
}

function getResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}