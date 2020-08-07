# Minnesota State System DAR Parser
Generic PDF parser that returns student ID, student name, student classification, 
advisor name, major and cumulative GPA's, ACT & Accuplacer test results, course IDs, 
grades, and course names of completed and currently enrolled courses from a MinnState 
Degree Audit Report (DAR).

Note: this method only works on Google Chrome. To get a copy of your DAR, sign into your 
school's eservices page -> select the 'Academic Records' tab -> select 'Degree Audit 
Report' -> select your current major -> right click on the DARs, select 'Print...' -> in 
print preview, click the change button on 'Destination' and select 'Save as PDF' -> save 
in your desired location Note: DO NOT select 'Microsoft Print to PDF' when changing your 
print destination as this will result in a version mismatch and leave your DARs unable to 
be parsed. Also, DO NOT select 'Save as...' after right clicking on the DARs, this will 
save your file as an html and not a pdf.

To use: <br />
replace line 6 in server.js with a path to your DAR & open terminal <br />
npm install <br />
npm install pdf-parse <br />
node server.js <br />
