// Parsing Functions

module.exports = {

  // Tech ID
  returnTechID: function (data) {
    var techIdPattern = /[:]\d\d\d\d\d\d\d\d\d\d/;
    var techIdParse = data.text.match(techIdPattern);
    if (techIdParse == null) {
      // returns N/A
      return "N/A"
    }
    var techId = techIdParse[0];
    techId = techId.substr(3);
    // returns Tech ID as a String
    return techId;
  },

  // Student Name
  returnStudentName: function (data) {
    var namePattern = /.*\n[P][R][O]/;
    var nameParse = data.text.match(namePattern);
    if (nameParse == null) {
      // returns N/A
      return "N/A"
    }
    var name = nameParse[0];
    name = name.slice(0, -4);
    // returns Student Name as a String
    return name;
  },

  // Student Classification
  returnStudentClassification: function (data) {
    var studentClassificationPattern = /(Classification:)\s[A-Z][A-Z]/;
    var studentClassificationParse = data.text.match(studentClassificationPattern);
    if (studentClassificationParse == null) {
      // returns N/A
      return "N/A"
    }
    var studentClassification = studentClassificationParse[0];
    studentClassification = studentClassification.substr(16);
    // returns Student Classification as a String
    return studentClassification;
  },

  // Advisor Name
  returnAdvisorName: function (data) {
    var advisorPattern = /[A][d][v][i][s][o][r][:].*/;
    var advisorParse = data.text.match(advisorPattern);
    if (advisorParse == null) {
      // returns N/A
      return "N/A"
    }
    var advisor = advisorParse[0];
    advisor = advisor.substr(9);
    // returns Advisor Name as a String
    return advisor;
  },

  // Cumulative GPA
  returnCumulativeGPA: function (data) {
    var cumGpaPattern = /...................................................[0-9]... [G][P][A]/;
    var cumGpaParse = data.text.match(cumGpaPattern);
    if (cumGpaParse == null) {
        // returns N/A
        return "N/A"
      }
    cumGpaParse[0] = cumGpaParse[0].substr(51);
    cumGpaParse[0] = cumGpaParse[0].slice(0, -3);
    var cumGpa = parseFloat(cumGpaParse[0]).toFixed(2);
    // returns Cumulative GPA as a Float (#.##)
    return cumGpa;
  },

  // Major GPA
  returnMajorGPA: function (data) {
    var majorGpaPattern = /[:]............................................[0-9].../;
    var majorGpaParse = data.text.match(majorGpaPattern);
    if (majorGpaParse == null) {
        // returns N/A
        return "N/A"
      }
    majorGpaParse[0] = majorGpaParse[0].substr(45);
    var majorGpa = parseFloat(majorGpaParse[0]).toFixed(2);
    // returns Major GPA as a Float (#.##)
    return majorGpa;
  },

  // Minnesota Transfer Curriculum Status
  returnMinnTCS: function (data) {
    var mtcPattern = /[t]\s[a-z]{3}\s[g][a-z]{6}\s/g;
    var mtcParse = data.text.match(mtcPattern);
    if (mtcParse == undefined) {
      // returns Minnesota Transfer Curriculum Status as a Boolean
      return false;
    } else {
      return true;
    }
  },

  // ACT Composite Score
  returnACTCompositeScore: function (data) {
    var actCompositeScorePattern = /(ACT Composite Score:).*/;
    var actCompositeScoreParse = data.text.match(actCompositeScorePattern);
    if (actCompositeScoreParse == null) {
      // returns N/A
      return "N/A"
    }
    actCompositeScoreParse[0] = actCompositeScoreParse[0].slice(-4);
    var actCompositeScore = parseInt(actCompositeScoreParse[0]);
    // returns ACT Composite Score as Integer
    return actCompositeScore;
  },

  //ACT Math Score
  returnACTMathScore: function (data) {
    var actMathScorePattern = /(ACT Math Score:).*/;
    var actMathScoreParse = data.text.match(actMathScorePattern);
    if (actMathScoreParse == null) {
      // returns N/A
      return "N/A"
    }
    actMathScoreParse[0] = actMathScoreParse[0].slice(-4);
    var actMathScore = parseInt(actMathScoreParse[0]);
    // returns ACT Math Score as Integer
    return actMathScore;
  },

  //ACT English Score
  returnACTEnglishScore: function (data) {
    var actEnglishScorePattern = /(ACT English Score:).*/;
    var actEnglishScoreParse = data.text.match(actEnglishScorePattern);
    if (actEnglishScoreParse == null) {
      // returns N/A
      return "N/A"
    }
    actEnglishScoreParse[0] = actEnglishScoreParse[0].slice(-4);
    var actEnglishScore = parseInt(actEnglishScoreParse[0]);
    // returns ACT English Score as Integer
    return actEnglishScore;
  },

  //ACT Reading Score
  returnACTReadingScore: function (data) {
    var actReadingScorePattern = /(ACT Reading Score:).*/;
    var actReadingScoreParse = data.text.match(actReadingScorePattern);
    if (actReadingScoreParse == null) {
      // returns N/A
      return "N/A"
    }
    actReadingScoreParse[0] = actReadingScoreParse[0].slice(-4);
    var actReadingScore = parseInt(actReadingScoreParse[0]);
    // returns ACT Reading Score as Integer
    return actReadingScore;
  },

  //ACT Science Reasoning Score
  returnACTScienceReasoningScore: function (data) {
    var actScienceReasoningScorePattern = /(ACT Science Reasoning Score:).*/;
    var actScienceReasoningScoreParse = data.text.match(actScienceReasoningScorePattern);
    if (actScienceReasoningScoreParse == null) {
      // returns N/A
      return "N/A"
    }
    actScienceReasoningScoreParse[0] = actScienceReasoningScoreParse[0].slice(-4);
    var actScienceReasoningScore = parseInt(actScienceReasoningScoreParse[0]);
    // returns ACT Science Reasoning Score as Integer
    return actScienceReasoningScore;
  },

  //Accuplacer Reading Comprehension Score
  returnAccuplacerReadingComprehensionScore: function (data) {
    var accuplacerReadingComprehensionScorePattern = /(Accuplacer Reading Comprehension Score:).*/;
    var accuplacerReadingComprehensionScoreParse = data.text.match(accuplacerReadingComprehensionScorePattern);
    if (accuplacerReadingComprehensionScoreParse == null) {
      // returns N/A
      return "N/A"
    }
    accuplacerReadingComprehensionScoreParse[0] = accuplacerReadingComprehensionScoreParse[0].slice(-4);
    var accuplacerReadingComprehensionScore = parseInt(accuplacerReadingComprehensionScoreParse[0]);
    // returns Accuplacer Reading Comprehension Score as Integer
    return accuplacerReadingComprehensionScore;
  },

  //Accuplacer Sentence Skills Score
  returnAccuplacerSentenceSkillsScore: function (data) {
    var accuplacerSentenceSkillsScorePattern = /(Accuplacer Sentence Skills Score:).*/;
    var accuplacerSentenceSkillsScoreParse = data.text.match(accuplacerSentenceSkillsScorePattern);
    if (accuplacerSentenceSkillsScoreParse == null) {
      // returns N/A
      return "N/A"
    }
    accuplacerSentenceSkillsScoreParse[0] = accuplacerSentenceSkillsScoreParse[0].slice(-4);
    var accuplacerSentenceSkillsScore = parseInt(accuplacerSentenceSkillsScoreParse[0]);
    // returns Accuplacer Sentence Skills Score as Integer
    return accuplacerSentenceSkillsScore;
  },

  //Accuplacer Elementary Algebra Score
  returnAccuplacerElementaryAlgebraScore: function (data) {
    var accuplacerElementaryAlgebraScorePattern = /(Accuplacer Elementary Algebra Score:).*/;
    var accuplacerElementaryAlgebraScoreParse = data.text.match(accuplacerElementaryAlgebraScorePattern);
    if (accuplacerElementaryAlgebraScoreParse == null) {
      // returns N/A
      return "N/A"
    }
    accuplacerElementaryAlgebraScoreParse[0] = accuplacerElementaryAlgebraScoreParse[0].slice(-4);
    var accuplacerElementaryAlgebraScore = parseInt(accuplacerElementaryAlgebraScoreParse[0]);
    // returns Accuplacer Elementary Algebra Score as Integer
    return accuplacerElementaryAlgebraScore;
  },

  //  Accuplacer College Level Math Score
  returnAccuplacerCollegeLevelMathScore: function (data) {
    var accuplacerCollegeLevelMathScorePattern = /(Accuplacer College Level Math Score:).*/;
    var accuplacerCollegeLevelMathScoreParse = data.text.match(accuplacerCollegeLevelMathScorePattern);
    if (accuplacerCollegeLevelMathScoreParse == null) {
      // returns N/A
      return "N/A"
    }
    accuplacerCollegeLevelMathScoreParse[0] = accuplacerCollegeLevelMathScoreParse[0].slice(-4);
    var accuplacerCollegeLevelMathScore = parseInt(accuplacerCollegeLevelMathScoreParse[0]);
    // returns Accuplacer College Level Score as Integer
    return accuplacerCollegeLevelMathScore;
  },

  // Full Academic Record
  returnFullAcademicRecord: function (data) {
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
    academicHistory.sort();
    // returns List of Enrolled Courses as an Array of Strings
    //'(Course ID)       (Credits (#.#)) (Grade)   (Additional Info) (Name) '
    return academicHistory;
  },

  // Course IDs
  returnCourseIds: function (data) {
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
  },

  // Grades
  returnGrades: function (data) {
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
  },

  // In Progress Courses
  returnInProgressCourses: function (data) {
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
  },

  // In Progress Course IDs
  returnInProgressCourseIds: function (data) {
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
};
