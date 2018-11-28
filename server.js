const fs = require("fs");
const pdf = require("pdf-parse");

function removeDuplicates(arr){
  let unique_array = []
  for(let i = 0;i < arr.length; i++){
      if(unique_array.indexOf(arr[i]) == -1){
          unique_array.push(arr[i])
      }
  }
  return unique_array
}

// let dataBuffer = fs.readFileSync("test.pdf");
let dataBuffer = fs.readFileSync("SE_DARs.pdf");

pdf(dataBuffer).then(function(data) {
  // number of pages
  // console.log(data.numpages);
  // // number of rendered pages
  // console.log(data.numrender);
  // // PDF info
  // console.log(data.info);
  // // PDF metadata
  // console.log(data.metadata);
  // // PDF.js version
  // // check https://mozilla.github.io/pdf.js/getting_started/
  // console.log(data.version);
  // // PDF text
  // console.log(data.text);

  console.log("------------------------------------------------------------------------------");
  
  // DARs parser
  var patternFall = /[F]\s[0-9][0-9]\s[A-Z]{2,5}..[0-9]{2,3}..................([A-z]).*/g;
  var patternSpring = /[S][0-9][0-9]\s\s[A-Z]{2,5}..[0-9]{2,3}..................([A-z]).*/g;
  var patternSummer = /[S][S][0-9][0-9]\s[A-Z]{2,5}..[0-9]{2,3}..................([A-z]).*/g;
  var posFall = data.text.match(patternFall);
  var posSpring = data.text.match(patternSpring);
  var posSummer = data.text.match(patternSummer);
  var academicHistory = [];
  for (var i=0; i<posFall.length; i++){
    posFall[i] = posFall[i].substr(5);
    academicHistory.push(posFall[i]);
  }
  for (var i=0; i<posSpring.length; i++){
    posSpring[i] = posSpring[i].substr(5);
    academicHistory.push(posSpring[i]);
  }
  for (var i=0; i<posSummer.length; i++){
    posSummer[i] = posSummer[i].substr(5);
    academicHistory.push(posSummer[i]);
  }
  console.log(removeDuplicates(academicHistory));
});