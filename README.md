# MinnesotaStateSystemDarsParser
Generic parser that returns tech ID, student name, advisor name, cumulative GPA, major GPA, 
Minnesota State Transfer Curriculum status & course IDs, grades, and course names of 
completed and currently enrolled courses.

To get a copy of your DARs, sign into your school's eservices page -> select the 
'Academic Records' tab -> select 'Degree Audit Report' -> select your current 
major -> right click on the DARs, select 'Print...' -> in print preview, click the 
change button on 'Destination' and select 'Save as PDF' -> save in your desired loctation

To use replace line 179 in server.js with a path to your DARs & open terminal
npm install
npm install pdf-parse
nodemon server.js