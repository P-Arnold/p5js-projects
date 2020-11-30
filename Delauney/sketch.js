const MOUSEMARGIN = 40;
let triangles = [] //Holds info generated with Delauney library
let particles = [] //Holds the class objects generated 'randomly'
let points = []
let pointsToTriangulate = new Map()

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('canvasForHTML');
    let width = 400;
    let height = 400;
    randomSeed(69);
    for(var i = 0; i < 200; i++){
        var tempx = floor(random(0,width));
        var tempy = floor(random(0,height))
        particles.push(new particle(tempx,tempy,i));
    }
    // noCursor();
}

function draw() {
    background(255);
    drawBorder();
    push();
    stroke(255);
    strokeWeight(1)
    //Update status of each particle & display
    particles.forEach(el => {
        el.checkPoint();
        el.display();
    });
    pop();
    // drawMouseBounding();
    tri();
    drawTriangles();
}

class particle {
    constructor(x,y,i) {
        this.x = x;
        this.y = y;
        this.i = i;
        this.mouseNear = false; 
    }

    checkPoint(){
        if (this.mouseNear) {
            if (!isMouseNear(this.x,this.y)) {
                this.mouseNear = false;
                pointsToTriangulate.delete(this.i);
            }
        }
        else { // Point was not near last time
            if (isMouseNear(this.x,this.y)) {
                this.mouseNear = true;
                pointsToTriangulate.set(this.i,[this.x,this.y]);
            }
        }
    }

    display() {
        // if (this.mouseNear){
        //     push();
        //     strokeWeight(5);
        //     point(this.x,this.y);
        //     pop();
        //     // text('near', this.x, this.y);
        // }
        point(this.x,this.y)
    }
}

function isMouseNear(x,y) {
    if(mouseY <= y + MOUSEMARGIN && mouseY >= y - MOUSEMARGIN){
        if(mouseX <= x + MOUSEMARGIN && mouseX >= x - MOUSEMARGIN) {
            return true;
        }
    }
    return false;
}

function mousePressed() {
    // points = Array.from(pointsToTriangulate.values());
    // console.log(points);
    // triangles = Delauney.triangulate(points);
    // console.log(triangles)
    
}

function tri() {
    points = Array.from(pointsToTriangulate.values());
    triangles = Delauney.triangulate(points);
}

function drawMouseBounding(){
    push();
    noFill();
    stroke(240,0,0);
    circle(mouseX,mouseY,MOUSEMARGIN*2);
    pop();
}

function drawTriangles() {
    push();
    stroke(0);
    noFill();
    for (let i = 0; i < triangles.length; i += 3) {
        beginShape();
        // fill(255-(i / triangles.length)*255, 0, 128);
        vertex(points[triangles[i]][0], points[triangles[i]][1]);
        vertex(points[triangles[i+1]][0], points[triangles[i+1]][1]);
          vertex(points[triangles[i+2]][0], points[triangles[i+2]][1]);
        endShape(CLOSE);
      }
    pop();
}

function drawBorder() {
    push();
    stroke(0);
    fill(0);
    line(width,0,width,height);
    line(0,height,width,height);
    pop()
}