const fs = require("fs");
const pdf = require("pdf-parse");

// Parsing Functions

// Tech ID
function returnTechID(data) {
  var techIdPattern = /[:]\d\d\d\d\d\d\d\d\d\d/;
  var techIdParse = data.text.match(techIdPattern);
  var techId = techIdParse[0];
  techId = techId.substr(3);
  // returns Tech ID as a String
  return techId;
}

// Student Name
function returnStudentName(data) {
  var namePattern = /.*\n[P][R][O]/;
  var nameParse = data.text.match(namePattern);
  var name = nameParse[0];
  name = name.slice(0, -4);
  // returns Student Name as a String
  return name;
}

// // Student Classification
function returnStudentClassification(data) {
  var studentClassificationPattern = /(Classification:)\s[A-Z][A-Z]/;
  var studentClassificationParse = data.text.match(studentClassificationPattern);
  var studentClassification = studentClassificationParse[0];
  studentClassification = studentClassification.substr(16);
  // returns Student Classification as a String
  return studentClassification;
}

// Advisor Name
function returnAdvisorName(data) {
  var advisorPattern = /[A][d][v][i][s][o][r][:].*/;
  var advisorParse = data.text.match(advisorPattern);
  var advisor = advisorParse[0];
  advisor = advisor.substr(9);
  // returns Advisor Name as a String
  return advisor;
}

// Cumulative GPA
function returnCumulativeGPA(data) {
  var cumGpaPattern = /...................................................[0-9]... [G][P][A]/;
  var cumGpaParse = data.text.match(cumGpaPattern);
  cumGpaParse[0] = cumGpaParse[0].substr(51);
  cumGpaParse[0] = cumGpaParse[0].slice(0, -3);
  var cumGpa = parseFloat(cumGpaParse[0]).toFixed(2);
  // returns Cumulative GPA as a Float (#.##)
  return cumGpa;
}

// Major GPA
function returnMajorGPA(data) {
  var majorGpaPattern = /[:]............................................[0-9].../;
  var majorGpaParse = data.text.match(majorGpaPattern);
  majorGpaParse[0] = majorGpaParse[0].substr(45);
  var majorGpa = parseFloat(majorGpaParse[0]).toFixed(2);
  // returns Major GPA as a Float (#.##)
  return majorGpa;
}

// Minnesota Transfer Curriculum Status
function returnMinnTCS(data) {
  var mtcPattern = /[t]\s[a-z]{3}\s[g][a-z]{6}\s/g;
  var mtcParse = data.text.match(mtcPattern);
  if (mtcParse == undefined) {
    // returns Minnesota Transfer Curriculum Status as a Boolean
    return false;
  } else {
    return true;
  }
}

// ACT Composite Score
function returnACTCompositeScore(data) {
  var actCompositeScorePattern = /(ACT Composite Score:).\d\d/;
  var actCompositeScoreParse = data.text.match(actCompositeScorePattern);
  // var actCompositeScore = actCompositeScoreParse[0]
  actCompositeScoreParse[0] = actCompositeScoreParse[0].slice(-2);
  var actCompositeScore = parseInt(actCompositeScoreParse[0]);
  // returns ACT Composite Score as Integer
  return actCompositeScore;
}

// // ACT Math Score
// function returnACTMathScore(data){
//     var actMathScorePattern = ;
//     var actMathScoreParse = data.text.match(actMathScorePattern);
//     var actMathScore = actMathScoreParse[0]
//     actMathScore = actMathScore.substr(3);
//     var actMathScore = parseint(actMathScore);
//     // returns ACT Math Score as Integer
//     return actMathScore;
// }

// // ACT English Score
// function returnACTEnglishScore(data){
//     var actEnglishScorePattern = ;
//     var actEnglishScoreParse = data.text.match(actEnglishScorePattern);
//     var actEnglishScore = actEnglishScoreParse[0]
//     actEnglishScore = actEnglishScore.substr(3);
//     var actEnglishScore = parseint(actEnglishScore);
//     // returns ACT English Score as Integer
//     return actEnglishScore;
// }

// // ACT Reading Score
// function returnACTReadingScore(data){
//     var actReadingScorePattern = ;
//     var actReadingScoreParse = data.text.match(actReadingScorePattern);
//     var actReadingScore = actReadingScoreParse[0]
//     actReadingScore = actReadingScore.substr(3);
//     var actReadingScore = parseint(actReadingScore);
//     // returns ACT Reading Score as Integer
//     return actReadingScore;
// }

// // ACT Science Reasoning Score
// function returnACTReadingScore(data){
//     var actScienceReasoningScorePattern = ;
//     var actScienceReasoningScoreParse = data.text.match(actScienceReasoningScorePattern);
//     var actScienceReasoningScore = actScienceReasoningScoreParse[0]
//     actScienceReasoningScore = actScienceReasoningScore.substr(3);
//     var actScienceReasoningScore = parseint(actScienceReasoningScore);
//     // returns ACT Science Reasoning Score as Integer
//     return actScienceReasoningScore;
// }

// // Accuplacer Reading Comprehension Score
// function returnAccuplacerReadingComprehensionScore(data){
//     var accuplacerReadingComprehensionScorePattern = ;
//     var accuplacerReadingComprehensionScoreParse = data.text.match(accuplacerReadingComprehensionScorePattern);
//     var accuplacerReadingComprehensionScore = accuplacerReadingComprehensionScoreParse[0]
//     accuplacerReadingComprehensionScore = accuplacerReadingComprehensionScore.substr(3);
//     var accuplacerReadingComprehensionScore = parseint(accuplacerReadingComprehensionScore);
//     // returns Accuplacer Reading Comprehension Score as Integer
//     return accuplacerReadingComprehensionScore;
// }

// // Accuplacer Sentence Skills Score
// function returnAccuplacerSentenceSkillsScore(data){
//     var accuplacerSentenceSkillsScorePattern = ;
//     var accuplacerSentenceSkillsScoreParse = data.text.match(accuplacerSentenceSkillsScorePattern);
//     var accuplacerSentenceSkillsScore = accuplacerSentenceSkillsScoreParse[0]
//     accuplacerSentenceSkillsScore = accuplacerSentenceSkillsScore.substr(3);
//     var accuplacerSentenceSkillsScore = parseint(accuplacerSentenceSkillsScore);
//     // returns Accuplacer Sentence Skills Score as Integer
//     return accuplacerSentenceSkillsScore;
// }

// // Accuplacer Elementary Algebra Score
// function returnAccuplacerSentenceSkillsScore(data){
//     var accuplacerElementaryAlgebraScorePattern = ;
//     var accuplacerElementaryAlgebraScoreParse = data.text.match(accuplacerElementaryAlgebraScorePattern);
//     var accuplacerElementaryAlgebraScore = accuplacerElementaryAlgebraScoreParse[0]
//     accuplacerElementaryAlgebraScore = accuplacerElementaryAlgebraScore.substr(3);
//     var accuplacerElementaryAlgebraScore = parseint(accuplacerElementaryAlgebraScore);
//     // returns Accuplacer Elementary Algebra Score as Integer
//     return accuplacerElementaryAlgebraScore;
// }

// // Accuplacer College Level Math Score
// function returnAccuplacerCollegeLevelMathScore(data){
//     var accuplacerCollegeLevelMathScorePattern = ;
//     var accuplacerCollegeLevelMathScoreParse = data.text.match(accuplacerCollegeLevelMathScorePattern);
//     var accuplacerCollegeLevelMathScore = accuplacerCollegeLevelMathScoreParse[0]
//     accuplacerCollegeLevelMathScore = accuplacerCollegeLevelMathScore.substr(3);
//     var accuplacerCollegeLevelMathScore = parseint(accuplacerCollegeLevelMathScore);
//     // returns Accuplacer College Level Score as Integer
//     return accuplacerCollegeLevelMathScore;
// }

// Full Academic Record
function returnFullAcademicRecord(data) {
  var coursePattern = /[A-Z].[0-9]..[A-Z]{2,5}..[0-9]{2,3}...........[^WF][^WF][^WF].*/g;
  var courseParse = data.text.match(coursePattern);
  var academicHistoryParse = [];
  var academicHistory = [];
  for (var i = 0; i < courseParse.length; i++) {
    courseParse[i] = courseParse[i].substr(5);
    academicHistoryParse.push(courseParse[i]);
  }
  for (let i = 0; i < academicHistoryParse.length; i++) {
    if (academicHistory.indexOf(academicHistoryParse[i]) == -1) {
      academicHistory.push(academicHistoryParse[i]);
    }
  }
  // returns List of Enrolled Courses as an Array of Strings
  //'(Course ID)       (Credits (#.#)) (Grade)   (Additional Info) (Name) '
  return academicHistory;
}

// Course IDs
function returnCourseIds(data) {
  var coursePattern = /[A-Z].[0-9]..[A-Z]{2,5}..[0-9]{2,3}...........[^WF][^WF][^WF].*/g;
  var courseParse = data.text.match(coursePattern);
  var academicHistoryParse = [];
  var academicHistory = [];
  for (var i = 0; i < courseParse.length; i++) {
    courseParse[i] = courseParse[i].substr(5);
    courseParse[i] = courseParse[i].substring(0, 8);
    academicHistoryParse.push(courseParse[i]);
  }
  for (let i = 0; i < academicHistoryParse.length; i++) {
    if (academicHistory.indexOf(academicHistoryParse[i]) == -1) {
      academicHistory.push(academicHistoryParse[i]);
    }
  }
  // returns List of Enrolled Course IDs as an Array of Strings
  //'(Course ID)'
  return academicHistory;
}

// Grades
function returnGrades(data) {
  var coursePattern = /[A-Z].[0-9]..[A-Z]{2,5}..[0-9]{2,3}...........[^WF][^WF][^WF].*/g;
  var courseParse = data.text.match(coursePattern);
  var academicHistoryParse = [];
  var academicHistory = [];
  for (var i = 0; i < courseParse.length; i++) {
    courseParse[i] = courseParse[i].substr(5);
    courseParse[i] = courseParse[i].substring(0, 22);
    academicHistoryParse.push(courseParse[i]);
  }
  for (let i = 0; i < academicHistoryParse.length; i++) {
    if (academicHistory.indexOf(academicHistoryParse[i]) == -1) {
      academicHistory.push(academicHistoryParse[i]);
    }
  }
  // returns List of Enrolled Course IDs & Grades as an Array of Strings
  //'(Course ID)       (Credits (#.#)) (Grade)'
  return academicHistory;
}

// In Progress Courses
function returnInProgressCourses(data) {
  var coursePattern = /[A-Z].[0-9]..[A-Z]{2,5}..[0-9]{2,3}...........[^WF][^WF][^WF].*/g;
  var courseParse = data.text.match(coursePattern);
  var academicHistoryParse = [];
  var academicHistory = [];
  for (var i = 0; i < courseParse.length; i++) {
    courseParse[i] = courseParse[i].substr(5);
    var x = courseParse[i].substring(22, 24);
    if (x == "IP") {
      academicHistoryParse.push(courseParse[i]);
    }
  }
  for (let i = 0; i < academicHistoryParse.length; i++) {
    if (academicHistory.indexOf(academicHistoryParse[i]) == -1) {
      academicHistory.push(academicHistoryParse[i]);
    }
  }
  // returns List of In Progress Courses as an Array of Strings
  //'(Course ID)       (Credits (#.#)) (Grade)   (Additional Info) (Name) '
  return academicHistory;
}

// In Progress Course IDs
function returnInProgressCourseIds(data) {
  var coursePattern = /[A-Z].[0-9]..[A-Z]{2,5}..[0-9]{2,3}...........[^WF][^WF][^WF].*/g;
  var courseParse = data.text.match(coursePattern);
  var academicHistoryParse = [];
  var academicHistory = [];
  for (var i = 0; i < courseParse.length; i++) {
    courseParse[i] = courseParse[i].substr(5);
    var x = courseParse[i].substring(22, 24);
    if (x == "IP") {
      courseParse[i] = courseParse[i].substring(0, 8);
      academicHistoryParse.push(courseParse[i]);
    }
  }
  for (let i = 0; i < academicHistoryParse.length; i++) {
    if (academicHistory.indexOf(academicHistoryParse[i]) == -1) {
      academicHistory.push(academicHistoryParse[i]);
    }
  }
  // returns List of In Progress Course IDs as an Array of Strings
  //'(Course ID) '
  return academicHistory;
}

// File Path to DARs
let dataBuffer = fs.readFileSync("Adam_Walley_DAR22.pdf");

// Output
pdf(dataBuffer).then(function (data) {
  // Outputting Header
  console.log("--------------  DARs RESULTS  ---------------");
  // Outputting Tech ID
  console.log("Tech ID: " + returnTechID(data));
  // Outputting Student Name
  console.log("Student Name: " + returnStudentName(data));
  // // Outputting Student Classification
  console.log("Classification: " + returnStudentClassification(data));
  // Outputting Advisor
  console.log("Advisor Name: " + returnAdvisorName(data));
  // Outputting Cumulative GPA
  console.log("Cumulative GPA: " + returnCumulativeGPA(data));
  // Outputting Major GPA
  console.log("Major GPA: " + returnMajorGPA(data));
  // Outputting Minnesota Transfer Curriculum Status
  if (returnMinnTCS(data) == false) {
    console.log("Minnnesota Transfer Curriculum Status: Not Completed");
  } else {
    console.log("Minnnesota Transfer Curriculum Status: Completed");
  }
  // // Outputting ACT Composite Score
  console.log("ACT Composite Score: " + returnACTCompositeScore(data));
  // // Outputting ACT Math Score
  // console.log("ACT Math Score: " + returnACTMathScore(data));
  // // Outputting ACT English Score
  // console.log("ACT English Score: " + returnACTEnglishScore(data));
  // // Outputting ACT Reading Score
  // console.log("ACT Reading Score: " + returnACTReadingScore(data));
  // // Outputting ACT Science Reasoning Score
  // console.log("ACT Science Reasoning Score: " + returnACTScienceReasoningScore(data));
  // // Outputting Accuplacer Reading Comprehension Score
  // console.log("Accuplacer Reading Comprehension Score: " + returnAccuplacerReadingComprehensionScore(data));
  // // Outputting Accuplacer Sentence Skills Score
  // console.log("Accuplacer Sentence Skills Score: " + returnAccuplacerSentenceSkillsScore(data));
  // // Outputting Accuplacer Elementary Algebra Score
  // console.log("Accuplacer Elementary Algebra Score: " + returnAccuplacerElementaryAlgebraScore(data));
  // // Outputting Accuplacer College Level Math Score
  // console.log("Accuplacer College Level Math Score: " + returnAccuplacerCollegeLevelMathScore(data));
  // Outputting Full Academic Record
  console.log("Academic History:");
  console.log("   Course ID:    Grade:     Course Name:");
  console.log(returnFullAcademicRecord(data));
  // Outputting Course IDs
  console.log("Enrolled Course IDs:");
  console.log(returnCourseIds(data));
  // Outputting Grades
  console.log("Grades:");
  console.log("   Course ID:    Grade:");
  console.log(returnGrades(data));
  // Outputting In Progress Courses
  console.log("In Progress Courses:");
  console.log("   Course ID:    Grade:     Course Name:");
  console.log(returnInProgressCourses(data));
  // Outputting In Progress Course IDs
  console.log("In Progress Course IDs:");
  console.log(returnInProgressCourseIds(data));
  // Outputting Legend
  console.log(
    "-----------------  LEGEND  ------------------ \n" +
    "IP    Course  in  progress \n" +
    "Z     Not  graded  yet \n" +
    "T     Transfer grade \n" +
    ">D    Duplicate  (doesn't  count) \n" +
    ">X    Repeat  (doesn't  count) \n" +
    ">R    Repeatable  Course,  counts \n" +
    "        more  than  once \n" +
    "RP    Repeated  course  \n" +
    "(R)   In  course  list,  identifies \n" +
    "        a  required  course \n" +
    "---------------------------------------------"
  );
});
