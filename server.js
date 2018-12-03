const fs = require("fs");
const pdf = require("pdf-parse");

// let dataBuffer = fs.readFileSync("fileName.pdf");
let dataBuffer = fs.readFileSync("./DARs/SE_DARs.pdf");

pdf(dataBuffer).then(function(data) {
  
  // DARs parser

  // Tech ID
  var techIdPattern = /[:]\d\d\d\d\d\d\d\d\d\d/;
  var techIdParse = data.text.match(techIdPattern);
  var techId = techIdParse[0]
  techId = techId.substr(3);
  console.log("Tech ID: " + techId);
  // Student Name
  var namePattern = /.*\n[P][R][O]/;
  var nameParse = data.text.match(namePattern);
  var name = nameParse[0];
  name = name.slice(0, -4);
  console.log("Student Name: " + name);
  // Advisor Name
  var advisorPattern = /[A][d][v][i][s][o][r][:].*/;
  var advisorParse = data.text.match(advisorPattern);
  var advisor = advisorParse[0];
  advisor = advisor.substr(9);
  console.log("Advisor: " + advisor);
  // Cumulative GPA
  var cumGpaPattern = /...................................................[0-9]... [G][P][A]/;
  var cumGpaParse = data.text.match(cumGpaPattern);
  cumGpaParse[0] = cumGpaParse[0].substr(51);
  cumGpaParse[0] = cumGpaParse[0].slice(0, -3);
  var cumGpa = parseFloat(cumGpaParse[0]).toFixed(2);
  console.log("Cumulative GPA: " + cumGpa);
  // Major GPA
  var majorGpaPattern = /[:]............................................[0-9].../;
  var majorGpaParse = data.text.match(majorGpaPattern);
  majorGpaParse[0] = majorGpaParse[0].substr(45);
  var majorGpa = parseFloat(majorGpaParse[0]).toFixed(2);
  console.log("Major GPA: " + majorGpa);
  // Minnnesota Transfer Curriculum
  var mtcPattern = /[t]\s[a-z]{3}\s[g][a-z]{6}\s/g;
  var mtcParse = data.text.match(mtcPattern);
  var mtc = false;
  if (mtcParse == undefined) {
    console.log("Minnnesota Transfer Curriculum Status: Not Completed")
  } else {
    mtc = true;
    console.log("Minnnesota Transfer Curriculum Status: Completed")
  }
  // Courses
  var coursePattern = /[A-Z].[0-9]..[A-Z]{2,5}..[0-9]{2,3}...........[^WF][^WF][^WF].*/g;
  var courseParse = data.text.match(coursePattern);
  var academicHistoryParse = [];
  var academicHistory = [];
  for (var i=0; i<courseParse.length; i++){
    courseParse[i] = courseParse[i].substr(5);
    academicHistoryParse.push(courseParse[i]);
  }
  for(let i = 0;i < academicHistoryParse.length; i++){
    if(academicHistory.indexOf(academicHistoryParse[i]) == -1){
        academicHistory.push(academicHistoryParse[i])
    }
}
  console.log("Academic History:");
  console.log("   Course ID:    Grade:     Course Name:");
  console.log(academicHistory);
  // Legend
  console.log("--------------  LEGEND  --------------- \n" +
  "IP    Course  in  progress \n" +
  "Z     Not  graded  yet \n" +
  "T     Transfer grade \n" +
  ">D    Duplicate  (doesn't  count) \n" +
  ">X    Repeat  (doesn't  count) \n"  +
  ">R    Repeatable  Course,  counts \n" +
  "        more  than  once \n" +
  "RP    Repeated  course  \n" +
  "(R)   In  course  list,  identifies \n" +
  "        a  required  course \n" +
  "---------------------------------------");
});
