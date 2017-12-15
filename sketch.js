var pilihan = ["Mie Joyo", "Sarbun", "Go-Food", "Ayam Willies", "Bubur Ayam Depan", "Soto Monju", "Batagor"];
var button, greeting, clearButton;


function setup() {
  // put setup code here
  createCanvas(1280,720);
  background(220);

  button = createButton('Pilihkan Makananku!');
  button.position(250,270);
  button.mousePressed(Makananku);

  clearButton = createButton('Reset Pilihan');
  clearButton.position(250,350);
  clearButton.mousePressed(clearCanvas);

  greeting = createElement('h1','mau makan apa hari ini????');
  greeting.position(250,200);
}

function draw() {
  // put drawing code here
  // var xColor = map(mouseX, 0, 400, 0, 255);
  // var yColor = map(mouseY, 0, 400, 0, 255);
  // fill(200, xColor, yColor);
  // ellipse(mouseX, mouseY, 25, 25);
}

function clearCanvas(){
    clear();
}

function Makananku() {
  var name = random(pilihan);

  for (var i=0; i<200; i++) {
    push();
    fill(random(255), random(255), 255);
    translate(random(width), random(height));
    rotate(random(2*PI));
    textSize(random(28));
    text(name, 0, 0);
    pop();
  }
}
