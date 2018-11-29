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
  // Tech ID
  var techIdPattern = /[:]\d\d\d\d\d\d\d\d\d\d/;
  var techId = data.text.match(techIdPattern);
  techId[0] = techId[0].substr(3);
  console.log("Tech ID: " + techId);
  // Student Name
  var namePattern = /.*\n[P][R][O]/;
  var name = data.text.match(namePattern);
  name[0] = name[0].slice(0, -4);
  console.log("Student Name: " + name);
  // Advisor Name
  var advisorPattern = /[A][d][v][i][s][o][r][:].*/;
  var advisor = data.text.match(advisorPattern);
  advisor[0] = advisor[0].substr(9);
  console.log("Advisor: " + advisor);
  // Cumulative GPA
  var cumGpaPattern = /...................................................[0-9]... [G][P][A]/;
  var cumGpa = data.text.match(cumGpaPattern);
  cumGpa[0] = cumGpa[0].substr(51);
  cumGpa[0] = cumGpa[0].slice(0, -3);
  console.log("Cumulative GPA: " + cumGpa);
  // Major GPA
  var majorGpaPattern = /[:]............................................[0-9].../;
  var majorGpa = data.text.match(majorGpaPattern);
  majorGpa[0] = majorGpa[0].substr(45);
  console.log("Major GPA: " + majorGpa);
  // Courses
  var coursePattern = /[A-Z].[0-9]..[A-Z]{2,5}..[0-9]{2,3}...........[^WF][^WF][^WF].*/g;
  var courses = data.text.match(coursePattern);
  var academicHistory = [];
  for (var i=0; i<courses.length; i++){
    courses[i] = courses[i].substr(5);
    academicHistory.push(courses[i]);
  }
  console.log("Academic History:");
  console.log("   Course ID:    Grade:     Course Name:");
  academicHistory = removeDuplicates(academicHistory);
  console.log(academicHistory);
});
