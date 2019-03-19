const fs = require("fs");
const pdf = require("pdf-parse");
var parser = require("./parser")

// File Path to DARs
let dataBuffer = fs.readFileSync("Path to DARs...");

// Output
pdf(dataBuffer).then(function (data) {
  // Outputting Header
  console.log("--------------  DARs RESULTS  ---------------");
  // Outputting Tech ID
  console.log("Tech ID: " + parser.returnTechID(data));
  // Outputting Student Name
  console.log("Student Name: " + parser.returnStudentName(data));
  // // Outputting Student Classification
  console.log("Classification: " + parser.returnStudentClassification(data));
  // Outputting Advisor
  console.log("Advisor Name: " + parser.returnAdvisorName(data));
  // Outputting Cumulative GPA
  console.log("Cumulative GPA: " + parser.returnCumulativeGPA(data));
  // Outputting Major GPA
  console.log("Major GPA: " + parser.returnMajorGPA(data));
  // Outputting Minnesota Transfer Curriculum Status
  if (parser.returnMinnTCS(data) == false) {
    console.log("Minnnesota Transfer Curriculum Status: Not Completed");
  } else {
    console.log("Minnnesota Transfer Curriculum Status: Completed");
  }
  // Outputting ACT Composite Score
  console.log("ACT Composite Score: " + parser.returnACTCompositeScore(data));
  // Outputting ACT Math Score
  console.log("ACT Math Score: " + parser.returnACTMathScore(data));
  // Outputting ACT English Score
  console.log("ACT English Score: " + parser.returnACTEnglishScore(data));
  // Outputting ACT Reading Score
  console.log("ACT Reading Score: " + parser.returnACTReadingScore(data));
  // Outputting ACT Science Reasoning Score
  console.log("ACT Science Reasoning Score: " + parser.returnACTScienceReasoningScore(data));
  // Outputting ACT English Writing Combo Score
  console.log("ACT English Writing Combo Score: " + parser.returnACTEnglishWritingComboScore(data));
  // Outputting ACT Writing Subject Score
  console.log("ACT Writing Subject Score: " + parser.returnACTWritingSubjectScore(data));
  // Outputting ACT Writing Domain Score
  console.log("ACT Writing Domain Score: " + parser.returnACTWritingDomainScore(data));
  // Outputting Accuplacer Reading Comprehension Score
  console.log("Accuplacer Reading Comprehension Score: " + parser.returnAccuplacerReadingComprehensionScore(data));
  // Outputting Accuplacer Sentence Skills Score
  console.log("Accuplacer Sentence Skills Score: " + parser.returnAccuplacerSentenceSkillsScore(data));
  // Outputting Accuplacer Elementary Algebra Score
  console.log("Accuplacer Elementary Algebra Score: " + parser.returnAccuplacerElementaryAlgebraScore(data));
  // Outputting Accuplacer College Level Math Score
  console.log("Accuplacer College Level Math Score: " + parser.returnAccuplacerCollegeLevelMathScore(data));
  // Outputting Full Academic Record
  console.log("Academic History:");
  console.log("   Course ID:    Grade:     Course Name:");
  console.log(parser.returnFullAcademicRecord(data));
  // Outputting Course IDs
  console.log("Enrolled Course IDs:");
  console.log(parser.returnCourseIds(data));
  // Outputting Grades
  console.log("Grades:");
  console.log("   Course ID:    Grade:");
  console.log(parser.returnGrades(data));
  // Outputting In Progress Courses
  console.log("In Progress Courses:");
  console.log("   Course ID:    Grade:     Course Name:");
  console.log(parser.returnInProgressCourses(data));
  // Outputting In Progress Course IDs
  console.log("In Progress Course IDs:");
  console.log(parser.returnInProgressCourseIds(data));
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
