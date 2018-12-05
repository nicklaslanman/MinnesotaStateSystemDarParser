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

// Minnesota Transfer Curriculum
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

// Courses
function returnEnrolledCourses(data) {
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

// File Path to DARs
let dataBuffer = fs.readFileSync("path to PDF file...");

// Output
pdf(dataBuffer).then(function(data) {
    console.log("--------------  DARs RESULTS  ---------------");
    console.log("Tech ID: " + returnTechID(data)); 
    console.log("Student Name: " + returnStudentName(data));
    console.log("Advisor: " + returnAdvisorName(data));
    console.log("Cumulative GPA: " + returnCumulativeGPA(data));
    console.log("Major GPA: " + returnMajorGPA(data));
    if (returnMinnTCS(data) == false) {
        console.log("Minnnesota Transfer Curriculum Status: Not Completed")
    } else {
        console.log("Minnnesota Transfer Curriculum Status: Completed")
    }
    console.log("Academic History:");
    console.log("   Course ID:    Grade:     Course Name:");
    console.log(returnEnrolledCourses(data));
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