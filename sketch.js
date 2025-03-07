

let w = 2400; // Width of the rectangle
let h = 600; // Height of the rectangle
let bw = 100; // Border width
let n = 1000

var bgColor = "#F6E9DF"
var bez
let scaled_colours = []

let lines = []
let active_count = 1000000
let segments = []
let number_of_lines = 0
let gr_div = 20
let debug = false
let circles = []

let CURV;

function setup() {
  createCanvas(w+2*bw, h+2*bw);

  p5grain.setup();
  palette_names = Object.keys(palettes)
  palette_name_idx = floor(random(palette_names.length))
  palette_name = palette_names[palette_name_idx]
  set_colours(palette_name)
  UPSIDE_DOWN = random() > 0.5
  CURV = random([0.0005, 0.0005, 0.0005, 0.005, 0.005, 0.05])
  // setup_gui()

  noLoop(); 
  p5grain.setup();
  granulateSimple(granularity)
  noStroke();

}



function draw() {
  background(bgColor); 
  let scaled_colours = calculate_colours()
 
  noFill()
  stroke(0)
  
  create_segments()
  draw_segments()

  compute_circles(scaled_colours.length)
  
  draw_circles(circles)

  granulateSimple(granularity)
}

function draw_segments(){
  push()
  
  for(let i = 0; i < number_of_lines; i++){
    let this_line = lines[i]
    for(let j = 0; j < this_line.length; j++){
      let s = this_line[j]
      line(s.start.x, s.start.y, s.end.x, s.end.y)
    }
  }
  pop()
}

function create_segments(){
  let old_x = 0
  let old_y =  0
  let seg_length = 6
  let granularity = width / gr_div

  let curv2 = 10*CURV
  let line_id = 0
  let restart_line = false;


  for(let x = 0; x < width*2; x += granularity){
    // deal with line restarts, set x,y
    if(!restart_line) { old_y = 0 };
    restart_line = false;

    old_x = x;  
    lines[line_id] = []

    
    while(old_x <= width*2 && x >= 0 && old_y < height*2){
      let nz = noise(old_x * CURV, old_y * CURV)
      let angle = map(nz, 0, 1, PI*0.25, PI*.75)
      nz = noise(old_x * curv2, old_y * curv2)
      let swf = constrain(sin(nz*30), -1, 1)
      let seg_width = map(swf, -1, 1, granularity*0.1, granularity*0.75)
      let new_x = old_x+seg_length*cos(angle)
      let new_y = old_y+seg_length*sin(angle)
      
      segment = {start: {x: old_x, y: old_y}, end: {x: new_x, y: new_y}, line_id: line_id}
      
      segment, intersects = check_segment_intersection(segment, seg_width)

      lines[line_id].push(segment)
      
      old_x = new_x
      old_y = new_y
      if(intersects){ break }

    }

    line_id++
    if(restart_line) {
      x -= granularity
      old_y += 2*seg_length
    }
  }
  number_of_lines = line_id
} 

function check_segment_intersection(segment, seg_width){
  let intersects = false

  
  return segment, intersects
}

function draw_lines(lines){
  push()
  stroke(0)
  strokeWeight(1)
  for(let i = 0; i < lines.length - 1; i++){
    let this_line = lines[i]
    let next_line = lines[i+1]
    for(let j = 0; j < this_line.length; j++){
      let p1 = this_line[j]
      let p2 = next_line[j]
      if(p1 == undefined || p2 == undefined){ continue }
      line(p1.x, p1.y, p2.x, p2.y)
    }
  }
  pop()
}

function compute_circles(nn){
  for(let i = 0; i < number_of_lines - 1; i++){
    circles[i] = []
    let this_line = lines[i]
    let next_line = lines[i+1]
    for(let j = 0; j < this_line.length; j++){
      let p1 = this_line[j]
      let p2 = next_line[j]
      if(p1 == undefined || p2 == undefined){ continue }
      let m1 = (p1.start.x + p2.start.x) / 2
      let m2 = (p1.start.y + p2.start.y) / 2
      let d = sqrt((p1.start.x - p2.start.x)**2 + (p1.start.y - p2.start.y)**2) + 1
      let mh = constrain(m2/(2*h),0,1)
      let idx = floor(map(mh, 0, 0.7, 1, nn-10))
      if(UPSIDE_DOWN){ idx = nn - 10 - idx }
      let c = scaled_colours[idx]
      let properties = {x:m1, y:m2, r: d, d:d, mh:mh, idx:idx, c:c, active: true}
      // circle(m1, m2, d)
      // line(p1.start.x, p1.start.y, p2.start.x, p2.start.y)
      circles[i].push(properties)
    }
  }
}


function draw_circles(circles){
  push()
  noStroke()
  fill(0)
  translate(-width/4,0)
  for(let i = 0; i < circles.length - 2; i++){  
    let this_line = circles[i]
    for(let j = 0; j < this_line.length-2; j++){
      let properties = circles[i][j]
      if(properties.c){
        fill(properties.c)
        circle(properties.x, properties.y, properties.r)
      }
    }
  }
  pop()
}

function keyPressed(){
  let palette_names = Object.keys(palettes)
  if (key == 's'){
    save(`coloured_roots_${palette_name}.png`)
  } else if (key == '-' || key == '='){
    let palette_index = palette_names.indexOf(palette_name)
    let offset = key == '-' ? -1 : 1
    palette_index = (palette_index + offset + palette_names.length) % palette_names.length
    palette_name = palette_names[palette_index]
    console.log(palette_name)
    set_colours(palette_name)
    updateGUI();
    redraw()
  }
}
