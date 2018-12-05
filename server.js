const fs = require("fs");
const pdf = require("pdf-parse");

// Parsing Functions

// Tech ID
function returnTechID(data){
    var techIdPattern = /[:]\d\d\d\d\d\d\d\d\d\d/;
    var techIdParse = data.text.match(techIdPattern);
    var techId = techIdParse[0]
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

// Full Academic Record
function returnFullAcademicRecord(data) {
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
    for (var i=0; i<courseParse.length; i++){
        courseParse[i] = courseParse[i].substr(5);
        courseParse[i] = courseParse[i].substring(0, 8);
        academicHistoryParse.push(courseParse[i]);
    }
    for(let i = 0;i < academicHistoryParse.length; i++){
        if(academicHistory.indexOf(academicHistoryParse[i]) == -1){
            academicHistory.push(academicHistoryParse[i])
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
    for (var i=0; i<courseParse.length; i++){
        courseParse[i] = courseParse[i].substr(5);
        courseParse[i] = courseParse[i].substring(0, 22);
        academicHistoryParse.push(courseParse[i]);
    }
    for(let i = 0;i < academicHistoryParse.length; i++){
        if(academicHistory.indexOf(academicHistoryParse[i]) == -1){
            academicHistory.push(academicHistoryParse[i])
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
    for (var i=0; i<courseParse.length; i++){
        courseParse[i] = courseParse[i].substr(5);
        var x = courseParse[i].substring(22, 24);
        if (x == "IP") {
            academicHistoryParse.push(courseParse[i]);
        }
    }
    for(let i = 0;i < academicHistoryParse.length; i++){
        if(academicHistory.indexOf(academicHistoryParse[i]) == -1){
            academicHistory.push(academicHistoryParse[i])
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
    for (var i=0; i<courseParse.length; i++){
        courseParse[i] = courseParse[i].substr(5);
        var x = courseParse[i].substring(22, 24);
        if (x == "IP") {
            courseParse[i] = courseParse[i].substring(0, 8);
            academicHistoryParse.push(courseParse[i]);
        }
    }
    for(let i = 0;i < academicHistoryParse.length; i++){
        if(academicHistory.indexOf(academicHistoryParse[i]) == -1){
            academicHistory.push(academicHistoryParse[i])
        }
    }
    // returns List of In Progress Course IDs as an Array of Strings
    //'(Course ID) '
    return academicHistory;
}

// File Path to DARs
let dataBuffer = fs.readFileSync("path to PDF file...");

// Output
pdf(dataBuffer).then(function(data) {
    // Outputting Header
    console.log("--------------  DARs RESULTS  ---------------");
    // Outputting Tech ID
    console.log("Tech ID: " + returnTechID(data)); 
    // Outputting Student Name
    console.log("Student Name: " + returnStudentName(data));
    // Outputting Advisor
    console.log("Advisor: " + returnAdvisorName(data));
    // Outputting Cumulative GPA
    console.log("Cumulative GPA: " + returnCumulativeGPA(data));
    // Outputting Major GPA
    console.log("Major GPA: " + returnMajorGPA(data));
    // Outputting Minnesota Transfer Curriculum Status
    if (returnMinnTCS(data) == false) {
        console.log("Minnnesota Transfer Curriculum Status: Not Completed")
    } else {
        console.log("Minnnesota Transfer Curriculum Status: Completed")
    }
    // Outputting Full Academic Record
    console.log("Academic History:");
    console.log("   Course ID:    Grade:     Course Name:");
    console.log(returnFullAcademicRecord(data));
    // Outputting Course IDs
    console.log("Enrolled Course IDs:");
    console.log("   Course ID:");
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
    console.log("   Course ID:");
    console.log(returnInProgressCourseIds(data));
    // Outputting Legend
    console.log("-----------------  LEGEND  ------------------ \n" +
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
        "---------------------------------------------");
});