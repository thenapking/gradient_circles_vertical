// seed color and alpha
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


let settings = {
  bgColor: '#F6E9DF',
  oneColor: '#4375db',
  twoColor: '#B4B0C4',
  threeColor: '#CC9395',
  fourColor: '#EF611B',
  fiveColor: '#ED0707'
};

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
