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
