

let w = 2400; // Width of the rectangle
let h = 600; // Height of the rectangle
let bw = 100; // Border width
let n = 1000

// seed color and alpha
var bgColor = "#F6E9DF"
var oneColor = "#4375db", twoColor = "#B4B0C4", threeColor = "#CC9395", fourColor = "#EF611B", fiveColor = "#ED0707";
var oneStop = 0, twoStop = 0.25, threeStop = 0.5, fourStop = 0.75, fiveStop = 1;
var oneStopMin = 0, twoStopMin = 0, threeStopMin = 0, fourStopMin = 0, fiveStopMin = 0;
var oneStopMax = 1, twoStopMax = 1, threeStopMax = 1, fourStopMax = 1, fiveStopMax = 1;
var oneStopStep = 0.01, twoStopStep = 0.01, threeStopStep = 0.01, fourStopStep = 0.01, fiveStopStep = 0.01;
var granularity = 3
var granularityMin = 1, granularityMax = 20, granularityStep = 1;
var gamma = 1
var gammaMin = 0, gammaMax = 2, gammaStep = 0.1;
var gui;
let guiControllers = {}; 
let colours = []
let UPSIDE_DOWN = false


let mixChoices = ['rgb', 'lrgb', 'lab', 'lch', 'hsl']
var mixChoice = 'lch'
let direction = "up"
var palette_name = "GLOWING"
var palette_names;
let palettes = { 
  "blue-red": {oneColor: "#4375db", twoColor: "#B4B0C4", threeColor: "#CC9395", fourColor: "#EF611B", fiveColor: "#ED0707"},
  "1970s": {oneColor: "#F51905", twoColor: "#FFE380", threeColor: "#F584CC", fourColor: "#3A67DA", fiveColor: "#1F5128"},
  "1970s-TWO": {oneColor: "#F5cc00", twoColor: "#F08928", threeColor: "#EEA5CB", fourColor: "#778FEE", fiveColor: "#265443"},
  "1970s-THREE": {oneColor: "#000C29", twoColor: "#3DB1FF", threeColor: "#F1A2CA", fourColor: "#F4C623", fiveColor: "#FB2D28"},
  "CALYPSO": {oneColor: "#FF1500", twoColor: "#F5781C", threeColor: "#F0C800", fourColor: "A2FA1E", fiveColor: "#255728"},
  "CERULEAN THISTLE": {oneColor: "#0690F9", twoColor: "#D170D7", twoStop: 0.3, threeColor: "#D53934", fourColor: "#36533D", fiveColor: "#121935"},
  "PRIMARY": {oneColor: "#E9371C", oneStop: 0, twoColor: "#3480EA", twoStop: 0.29, threeColor: "#4194C8", threeStop: 0.51, fourColor: "#66A171", fourStop: 0.74, fiveColor: "#F8C61B", fiveStop: 1},
  "GLOWING": {oneColor: "#191923", oneStop: 0, twoColor: "#15578a", twoStop: 0.29, threeColor: "#BE2770", threeStop: 0.63, fourColor: "#EE4744", fourStop: 0.82, fiveColor: "#f4b943", fiveStop: 1},
  "EARTHRISE": {oneColor: "#061927", oneStop: 0, twoColor: "#2779EC", twoStop: 0.29, threeColor: "#61FFC8", threeStop: 0.49, fourColor: "#EF935A", fourStop: 0.67, fiveColor: "#B11812", fiveStop: 1},
  "PURPLE PATCH": {oneColor: "#142542", oneStop: 0, twoColor: "#EE7264", twoStop: 0.44, threeColor: "#ECB718", threeStop: 0.63, fourColor: "#880D23", fourStop: 0.94, fiveColor: "#6E071A", fiveStop: 1},
  "UP ONLY": {oneColor: "#E63357", oneStop: 0, twoColor: "#210128", twoStop: 0.11, threeColor: "#0E26A0", threeStop: 0.4, fourColor: "#436E71", fourStop: 0.66, fiveColor: "#F1a145", fiveStop: 1},
  "FOREST": {oneColor: "#2D4E38", oneStop: 0, twoColor: "#6C7F72", twoStop: 0.15, threeColor: "#75877B", threeStop: 0.23, fourColor: "#FB9E79", fourStop: 0.55, fiveColor: "#304570", fiveStop: 1},
  "JUPITER": {oneColor: "#000000", oneStop: 0, twoColor: "#000000", twoStop: 0.01, threeColor: "#14142d", threeStop: 0.25, fourColor: "#ff6417", fourStop: 0.72, fiveColor: "#eec584", fiveStop: 1},
  "PROG ROCK": {oneColor: "#3aa7a7", oneStop: 0, twoColor: "#708d81", twoStop: 0.08, threeColor: "#98090c", threeStop: 0.43, fourColor: "#a50104", fourStop: 0.54, fiveColor: "#fcba04", fiveStop: 1},
  "PURPLE BRUISE": {oneColor: "#390040", oneStop: 0, twoColor: "#390040", twoStop: 0.02, threeColor: "#073d50", threeStop: 0.17, fourColor: "#2448e1", fourStop: 0.38, fiveColor: "#f08700", fiveStop: 1},
  "TANGO": {oneColor: "#4375db", oneStop: 0, twoColor: "#b4b0c4", twoStop: 0.16, threeColor: "#cc9395", threeStop: 0.23, fourColor: "#ef611b", fourStop: 0.62, fiveColor: "#2f4b26", fiveStop: 1},
  "DC": {oneColor: "#f0bf74", oneStop: 0, twoColor: "#ffa108", twoStop: 0.17, threeColor: "#e3676e", threeStop: 0.39, fourColor: "#1b5299", fourStop: 0.79, fiveColor: "#273c1f", fiveStop: 1},
  "RACING GREY AND NEON": {oneColor: "#13293d", oneStop: 0, twoColor: "#13293d", twoStop: 0.04, threeColor: "#d53934", threeStop: 0.51, fourColor: "#103718", fourStop: 0.86, fiveColor: "#0d280d", fiveStop: 1},
  "BRIGHT": {oneColor: "#e81a20", oneStop: 0, twoColor: "#ffbc06", twoStop: 0.42, threeColor: "#fcb900", threeStop: 0.54, fourColor: "#ff99c3", fourStop: 0.7, fiveColor: "#2159ed", fiveStop: 1, mixChoice: 'rgb'},
  "OEHM RAINBOW": {oneColor: "#ff2000", twoColor: "#ffd801", twoStop: 0.28, threeColor: "#41aa52", threeStop: 0.54, fourColor: "#00539c", fourStop: 0.83, fiveColor: "#012355"},
  "LICORICE AUBURN CERULEAN": {oneColor: "#c4d6b0", twoColor: "#4c9fd4", twoStop: 0.28, threeColor: "#409cd7", threeStop: 0.28, fourColor: "#c52424", fourStop: 0.64, fiveColor: "#070101"},
  "BOY GIRL": {oneColor: "#f58fb7", twoColor: "#ed7ca8", twoStop: 0.11, threeColor: "#2f67b1", threeStop: 0.56, fourColor: "#12288a", fourStop: 0.92, fiveColor: "#12288a"},
  "HIROSHIMA SUNRISE": {oneColor: "#003387", twoColor: "#0d508e", twoStop: 0.14, threeColor: "#ed9e28", threeStop: 0.79, fourColor: "#ed9e28", fourStop: 0.25, fiveColor: "#190935"},

}

let settings = {
  bgColor: '#F6E9DF',
  oneColor: '#4375db',
  twoColor: '#B4B0C4',
  threeColor: '#CC9395',
  fourColor: '#EF611B',
  fiveColor: '#ED0707'
};

function setup() {
  createCanvas(w+2*bw, h+2*bw);

  p5grain.setup();
  palette_names = Object.keys(palettes)
  palette_name_idx = floor(random(palette_names.length))
  palette_name = palette_names[palette_name_idx]
  set_colours(palette_name)
  UPSIDE_DOWN = random() > 0.5
  UPSIDE_DOWN = true
  // setup_gui()

  noLoop(); 
  p5grain.setup();
  granulateSimple(granularity)
  noStroke();

}

function setup_gui(){
  let gui = new dat.GUI();

  gui.addColor(this, 'bgColor').name('Background Color').onChange(() => redraw());
  gui.add(this, 'granularity', 1, 20, 1).name('Granularity').onChange(() => redraw());
  gui.add(this, 'gamma', 0, 2, 0.1).name('Gamma').onChange(() => redraw());

  let colorFolder = gui.addFolder('Gradient Colors');
  guiControllers.oneColor = colorFolder.addColor(this, 'oneColor').name('Color 1').onChange(() => redraw());
  guiControllers.oneStop = colorFolder.add(this, 'oneStop', 0, 1, 0.01).name('Stop 1').onChange(() => redraw());
  guiControllers.twoColor = colorFolder.addColor(this, 'twoColor').name('Color 2').onChange(() => redraw());
  guiControllers.twoStop = colorFolder.add(this, 'twoStop', 0, 1, 0.01).name('Stop 2').onChange(() => redraw());
  guiControllers.threeColor = colorFolder.addColor(this, 'threeColor').name('Color 3').onChange(() => redraw());
  guiControllers.threeStop = colorFolder.add(this, 'threeStop', 0, 1, 0.01).name('Stop 3').onChange(() => redraw());
  guiControllers.fourColor = colorFolder.addColor(this, 'fourColor').name('Color 4').onChange(() => redraw());
  guiControllers.fourStop = colorFolder.add(this, 'fourStop', 0, 1, 0.01).name('Stop 4').onChange(() => redraw());
  guiControllers.fiveColor = colorFolder.addColor(this, 'fiveColor').name('Color 5').onChange(() => redraw());
  guiControllers.fiveStop = colorFolder.add(this, 'fiveStop', 0, 1, 0.01).name('Stop 5').onChange(() => redraw());
  colorFolder.open();

  gui.add(this, 'palette_name', palette_names).name('Palette').onChange((value) => {
    set_colours(value);
    updateGUI()
    redraw();
  });
}


function set_colours(palette_name){
  oneColor = palettes[palette_name].oneColor
  twoColor = palettes[palette_name].twoColor
  threeColor = palettes[palette_name].threeColor
  fourColor = palettes[palette_name].fourColor
  fiveColor = palettes[palette_name].fiveColor
  oneStop = palettes[palette_name].oneStop || 0
  twoStop = palettes[palette_name].twoStop || 0.25
  threeStop = palettes[palette_name].threeStop || 0.5
  fourStop = palettes[palette_name].fourStop || 0.75
  fiveStop = palettes[palette_name].fiveStop || 1
  mixChoice = palettes[palette_name].mixChoice || 'lch'
}

function updateGUI(){
  guiControllers.oneColor.setValue(oneColor);
  guiControllers.oneStop.setValue(oneStop);
  guiControllers.twoColor.setValue(twoColor);
  guiControllers.twoStop.setValue(twoStop);
  guiControllers.threeColor.setValue(threeColor);
  guiControllers.threeStop.setValue(threeStop);
  guiControllers.fourColor.setValue(fourColor);
  guiControllers.fourStop.setValue(fourStop);
  guiControllers.fiveColor.setValue(fiveColor);
  guiControllers.fiveStop.setValue(fiveStop);
}

var bez
let scaled_colours = []

let lines = []
let active_count = 1000000
let segments = []
let number_of_lines = 0
let gr_div = 20
let debug = false
let circles = []
function draw() {
  background(bgColor); // Light background color
  
  let scaled_colours = calculate_colours()
  let nn = scaled_colours.length
 
  let n = 10
  let r = (w+2*bw)/n
  let l = (h+2*bw)/nn
  
  let xw = 3
  let yh = 10
  let max_y = 2*h

  noFill()
  stroke(0)
  
  create_segments()
  draw_segments()

  for(let i = 0; i < number_of_lines - 1; i++){
    circles[i] = []
    let this_line = lines[i]
    let next_line = lines[i+1]
    for(let j = 0; j < this_line.length; j++){
      let p1 = this_line[j]
      let p2 = next_line[j]
      if(p1 == undefined || p2 == undefined){ continue }
      console.log(p1, p2)
      let m1 = (p1.start.x + p2.start.x) / 2
      let m2 = (p1.start.y + p2.start.y) / 2
      let d = sqrt((p1.start.x - p2.start.x)**2 + (p1.start.y - p2.start.y)**2) + 1
      let mh = constrain(m2/(max_y),0,1)
      let idx = floor(map(mh, 0, 0.7, 1, nn-10))
      if(UPSIDE_DOWN){ idx = nn - 10 - idx }
      let c = scaled_colours[idx]
      let properties = {x:m1, y:m2, r: d, d:d, mh:mh, idx:idx, c:c, active: true}
      circle(m1, m2, d)
      line(p1.start.x, p1.start.y, p2.start.x, p2.start.y)
      circles[i].push(properties)
    }
  }
  
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

  let curv = 0.002
  let curv2 = 10*curv
  let line_id = 0
  let restart_line = false;

  if(debug) { console.log(`gr_div: ${gr_div}, granularity: ${granularity}, curv: ${curv}`)}

  for(let x = 0; x < width*2; x += granularity){
    if(debug) { console.log(`line_id: ${line_id}, x: ${x}`) }


    // deal with line restarts, set x,y
    if(!restart_line) { old_y = 0 };
    restart_line = false;

    old_x = x;  
    lines[line_id] = []

    
    while(old_x <= width*2 && x >= 0 && old_y < height*2){
      let nz = noise(old_x * curv, old_y * curv)
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

function place_circles(lines, max_y, nn){
  let circles = []

  for(let i = -1; i < lines.length - 1; i++){
    let this_line = lines[i]
    let next_line = lines[i+1]
    circles[i] = []
    for(let j = 0; j < this_line.length; j++){
      let p1 = this_line[j]
      let p2 = next_line[j]
      if(p1 == undefined || p2 == undefined){ continue }
      let m1 = (p1.x + p2.x) / 2
      let m2 = (p1.y + p2.y) / 2
      let d = sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2)
      let mh = constrain(m2/(max_y),0,1)
      let idx = floor(map(mh, 0, 0.5, 1, nn-10))

      let c = scaled_colours[idx]
      let properties = {x:m1, y:m2, r: 10, d:d, mh:mh, idx:idx, c:c, active: true}
      circles[i].push(properties)
    }
  }
  return circles
}

function grow_circles(circles){
  let increment = 2
  while(active_count > 0){
    active_count = 0

    for(let i = 0; i < circles.length - 1; i++){
      let previous_line = circles[i-1]
      let this_line = circles[i]
      let next_line = circles[i+1]
      for(let j = 0; j < this_line.length; j++){
        let intersects = false
        let this_circle = this_line[j]
        if(this_circle.active == false){ continue }
        let r = this_circle.r
        let new_r = r + increment

        for(let other of previous_line){
          if(circle_intersects_circle(this_circle.x, this_circle.y, new_r, other.x, other.y, other.r)){
            intersects = true
            break
          }
        }

        for(let other of next_line){
          if(circle_intersects_circle(this_circle.x, this_circle.y, new_r, other.x, other.y, other.r)){
            intersects = true
            break
          }
        }

        if(!intersects){
          this_circle.r = new_r 
          active_count++
        } else {
          this_circle.active = false
        }
        
      }
    }
  }
  return circles
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

function circle_intersects_circle(x1, y1, r1, x2, y2, r2){
  let d = dist(x1, y1, x2, y2)
  return d < (r1 + r2)*0.5 - 1 // ensure no small
}


function calculate_colours(){
  scaled_colours = []
  let colour_array = [oneColor, twoColor, threeColor, fourColor, fiveColor]
  let stop_array = [oneStop, twoStop, threeStop, fourStop, fiveStop]

  for(let i = 0; i < colour_array.length - 1; i++){
    let c1 = colour_array[i]
    let c2 = colour_array[i+1]
    let s1 = stop_array[i] 
    let s2 = stop_array[i+1] 
    let total = floor((s2 - s1) * n)
    let c = chroma.scale([c1, c2]).correctLightness().mode(mixChoice).colors(total)
    scaled_colours = scaled_colours.concat(c)
    for(let j = 0; j < 10; j++){
      scaled_colours.push(c2)
    }
  }

  return scaled_colours
}


function keyPressed(){
  let palette_names = Object.keys(palettes)
  if (key == 's'){
    save(`gradient_gui_circles_${palette_name}.png`)
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


// function draw_coloured_circles(scaled_colours,n,nn,r,l){
//   for(let i = 0; i < n; i++){
//     push()
//       let counter = 0
//       for(let j = 0; j < nn - 1; j++){
//         let x = (i+0.5) * r
//         let y = j * l
        
//         let sf = 0.0002
//         let nz = noise(x*sf, 0)
//         let inc = map(nz, 0, 1, 0, 2)
//         counter += inc
//         let idx = constrain(floor(counter),2, nn-1) 
        
//         let c = scaled_colours[idx]
//         if(direction != "up"){
//           c = scaled_colours[nn - 2 - j]
//         }
//         fill(c)
        
//         circle(x,y,r)
//       }
//     pop()
//   }
// }


