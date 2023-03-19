//Creates arrays to hold student and course objects.
var lectures = [];
var students = [];

//Class and constructor for Lecture objects
class lecture {
  constructor(code, name, teacher, pointScale) {
    this.code = code;
    this.name = name;
    this.teacher = teacher;
    this.pointScale = pointScale;
    //Each course has a student list
    this.studentList = [];
  }
}
//Creates a course and pushes it to the lectures array
function createLecture(code, name, teacher, pointScale) {
  let obj = new lecture(code, name, teacher, pointScale);
  lectures.push(obj);
}
//Creates a course with inputs from the user
function addLecture() {
  let codeInput = document.getElementById("coursecode").value;
  let nameInput = document.getElementById("coursename").value;
  let teacherInput = document.getElementById("teacher").value;
  let pointScaleInput = document.getElementById("pointScale").value;
  //All fields must be filled
  if (codeInput === "" || nameInput === "" || teacherInput === "") {
    alert("Please fill in all fields.")
  } else {
    //If there is no course, it adds it directly to the array
    if (lectures.length === 0) {
      createLecture(codeInput, nameInput, teacherInput, pointScaleInput)
    } else {
      for (let lecture of lectures) {
        //Makes sure that the entered code has not been used before
        if (codeInput === lecture.code) {
          alert("This course already exists!");
          return;
        }
      }
      createLecture(codeInput, nameInput, teacherInput, pointScaleInput);
    }
  }

  updateLectureOptions();
  document.getElementById("coursecode").value = "";
  document.getElementById("coursename").value = "";
  document.getElementById("teacher").value = "";
  
  
}
//Class and constructor for Student objects
class student {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    //Each student has a course list
    this.courseList = [];
  }
}
//Creates a student and pushes it to the students array
function createStudent(id, name) {
  let std = new student(id, name);
  students.push(std);
}
//Creates a student with inputs from the user
function addStudent() {
  let idInput = document.getElementById("studentid").value;
  let stdNameInput = document.getElementById("studentname").value;
  //All fields must be filled
  if (idInput === "" || stdNameInput === "") {
    alert("Please fill in all fields.")
  } else {
    //If there is no student, it adds it directly to the array
    if (students.length === 0) {
      createStudent(idInput, stdNameInput);
    } else {
      for (let std of students) {
        //Makes sure that the entered ID has not been used before
        if (idInput === std.id) {
          alert("This student already exists!")
          return;
        }
      }
      createStudent(idInput, stdNameInput);
    }
  }

  updateStudentOptions();
  document.getElementById("studentid").value = "";
  document.getElementById("studentname").value = "";
}
//Completely deletes the student from the system
function deleteStdnt() {
  let deletestd = document.getElementById("deleteStudent").value;
  //No need to delete if students array is empty
  if (students.length === 0) {
    alert("There is no student.");
    document.getElementById("deleteStudent").value = "";
    return;
  }
  //If the ID entered by the user matches,
  //it finds the student in the array and deletes it.
  for (std of students) {
    if (deletestd === std.id) {
      //Finds which index of the array the student is in
      let index = students.indexOf(std);
      if (index > -1) {
        students.splice(index, 1);
      }
    } else {
      //If the entered ID does not match anyone
      alert("No such student")
      document.getElementById("deleteStudent").value = "";
    }

  }
  //It looks at the student lists of the courses one by one 
  //and deletes any students in this ID.
  for (let l of lectures) {
    for (let i = 0; i < l.studentList.length; i++) {
      if (deletestd === l.studentList[i].std.id) {
        l.studentList.splice(i, 1);
      }
    }
  }
  //Changes are reported to other functions
  updateStudentOptions();
  displayTable();
  displayStudentInfo();
  document.getElementById("deleteStudent").value = "";
}
//Completely deletes the course from the system
function deleteLcture() {
  let deletelct = document.getElementById("deleteLecture").value;
  //No need to delete if lectures array is empty
  if (lectures.length === 0) {
    alert("There is no course");
    document.getElementById("deleteLecture").value="";
  }
  //If the code entered by the user matches,
  //it finds the course in the array and deletes it.
  for (l of lectures) {
    if (deletelct === l.code) {
      //Finds which index of the array the course is in
      let index = lectures.indexOf(l);
      if (index > -1) {
        lectures.splice(index, 1);
      }
    }

  }
  //It looks at the course lists of the students one by one 
  //and deletes any courses in this code.
  for (let std of students) {
    for (let i = 0; i < std.courseList.length; i++) {
      if (deletelct === std.courseList[i].course.code) {
        std.courseList.splice(i, 1);
      }
    }
  }
  //Changes are reported to other functions
  updateLectureOptions();
  displayTable();
  displayStudentInfo();
  document.getElementById("deleteLecture").value="";
}
//Updates student ID and name informations
function updateStd(studentId, newStudentId, newStudentName) {
  for (s of students) {
    //If a student already exists in this newly entered ID, it will not work
    if (s.id === newStudentId) {
      alert("A student already exists with this ID.")
      break;
    } else {
      if (s.id === studentId) {
        //If there is a blank space, it will not be updated, the old values will be preserved
        if (newStudentId !== "") {
          s.id = newStudentId;
        }
        if (newStudentName !== "") {
          s.name = newStudentName;
        }
      }
    }

  }
}
//The student is updated with the informations received from the user
function updateStudent() {
  //A student is selected from the dropdown menu
  let updatedStudent = document.getElementById("studentOptionsforUpdate").value;
  //New information is entered
  let updatedId = document.getElementById("studentIdUpdate").value;
  let updatedName = document.getElementById("studentNameUpdate").value;
  //The selected student is found
  for (s of students) {
    if (updatedStudent === s.id) {
      selectedUpdateStudent = s;
    }
  }
  //Update it with new informations
  updateStd(selectedUpdateStudent.id, updatedId, updatedName);
  updateStudentOptions();
  document.getElementById("studentOptionsforUpdate").value="";
  document.getElementById("studentIdUpdate").value="";
  document.getElementById("studentNameUpdate").value="";
  
}
////Updates course code, course name, instructor name, and point scale informations
function updateLecture(courseCode, newCourseCode, newName, newTeacher, newPointScale) {
  for (let l of lectures) {
    //If a course already exists in this newly entered code, it will not work
    if (l.code === newCourseCode) {
      alert("A course already exists with this code.");
      break;
    } else {
      if (l.code === courseCode) {
        //If there is a blank space, it will not be updated, the old values will be preserved
        if (newCourseCode !== "") {
          l.code = newCourseCode;
        }
        if (newName !== "") {
          l.name = newName;
        }
        if (newTeacher !== "") {
          l.teacher = newTeacher;
        }
        if (newPointScale !== "") {
          l.pointScale = newPointScale
          for (let studnt of l.studentList) {
            //Letter grade is recalculated
            studnt.ltr = calcLetter(studnt.mid, studnt.fin, l.pointScale);
          }
          for (s of students) {
            for (let course of s.courseList) {
              if (course.course.code === l.code) {
                //Letter grade is recalculated
                course.ltr = calcLetter(course.mid, course.fin, l.pointScale);

              }
            }
          }

        }
      }
    }
  }
}
//The course is updated with the informations received from the user
function updateCourse() {
  //Course is selected from the dropdown menu
  let updatedLecture = document.getElementById("lectureOptionsforUpdate").value;
  ////New informations is entered
  let codeInput = document.getElementById("coursecodeUpdate").value;
  let nameInput = document.getElementById("coursenameUpdate").value;
  let teacherInput = document.getElementById("teacherUpdate").value;
  let pointScaleInput = document.getElementById("pointScaleUpdate").value;
  let selectedLecture = null;

  // Loop through lectures to find the selected lecture
  for (let l of lectures) {
    if (updatedLecture === l.code) {
      selectedLecture = l;
    }
  }
  //Update it with new informations
  updateLecture(selectedLecture.code, codeInput, nameInput, teacherInput, pointScaleInput);
  updateLectureOptions();

}
//Updates all student dropdown menus
function updateStudentOptions() {
  const studentOptions = document.getElementById("studentOptions");
  const studentOptionsforUpdate = document.getElementById("studentOptionsforUpdate");
  studentOptions.innerHTML = "";
  studentOptionsforUpdate.innerHTML = "";


  for (let student of students) {
    const option = document.createElement("option");
    //Name in sight but keeps ID in background
    option.value = student.id;
    option.textContent = student.name;
    studentOptions.appendChild(option);
  }
  for (let student of students) {
    const option = document.createElement("option");
    option.value = student.id;
    option.textContent = student.name;
    studentOptionsforUpdate.appendChild(option);
  }
}
//Updates all course dropdown menus
function updateLectureOptions() {
  const lectureOptions = document.getElementById("lectureOptions");
  const displayLectureOptions = document.getElementById("displayLectureOptions");
  const lectureOptionsforUpdate = document.getElementById("lectureOptionsforUpdate");
  lectureOptions.innerHTML = "";
  displayLectureOptions.innerHTML = "";
  lectureOptionsforUpdate.innerHTML = "";



  for (let lecture of lectures) {
    const option = document.createElement("option");
    option.value = lecture.code;
    option.textContent = lecture.name;
    lectureOptions.appendChild(option);
  }

  for (let lecture of lectures) {
    const option = document.createElement("option");
    //Course name in sight but keeps code in background
    option.value = lecture.code;
    option.textContent = lecture.name;
    displayLectureOptions.appendChild(option);
  }
  for (let lecture of lectures) {
    const option = document.createElement("option");
    option.value = lecture.code;
    option.textContent = lecture.name;
    lectureOptionsforUpdate.appendChild(option);
  }
}
//Calculates the letter grades of the given grades
function calcLetter(midGrade, finalGrade, pScale) {
  result = ((midGrade * 40) + (finalGrade * 60)) / 100;
  if (pScale == 7) {
    if (100 >= result && result >= 93) {
      return "A";
    }
    else if (93 > result && result >= 85) {
      return "B";
    }
    else if (85 > result && result >= 77) {
      return "C";
    }
    else if (77 > result && result >= 70) {
      return "D";
    }
    else if (70 > result) {
      return "F";
    }
  }
  else if (pScale == 10) {
    if (100 >= result && result >= 90) {
      return "A";
    }
    else if (90 > result && result >= 80) {
      return "B";
    }
    else if (80 > result && result >= 70) {
      return "C";
    }
    else if (70 > result && result >= 60) {
      return "D";
    }
    else if (60 > result) {
      return "F";
    }
  }
}
//Enrolls student in a lesson
function register() {
  let lectureSelect = document.getElementById("lectureOptions").value;
  let studentSelect = document.getElementById("studentOptions").value;
  let midterm = document.getElementById("midterm").value;
  let final = document.getElementById("final").value;
  //In order to get the error that selectedLecture and selectedStudent are not defined,
  //a null value is given first.
  let selectedLecture = null;
  let selectedStudent = null;

  //Finds the selected course
  for (let l of lectures) {
    if (lectureSelect === l.code) {
      selectedLecture = l;
    }
  }
  //Finds the selected student
  for (let s of students) {
    if (studentSelect === s.id) {
      selectedStudent = s;
    }
  }
  //Grades must be within the accepted range
  if (midterm < 0 || midterm > 100 || final < 0 || final > 100) {
    alert("Grades must be between 0 and 100.")
  }
  else {
    //If the student does not have any course, registered directly
    if (selectedStudent.courseList.length === 0) {
      //register object is created
      let registeredLecture = {
        course: selectedLecture,
        mid: midterm,
        fin: final,
        ltr: calcLetter(midterm, final, selectedLecture.pointScale),
      };
      //Added to the student's course list along with the course grades for which they are enrolled
      selectedStudent.courseList.push(registeredLecture);
    } else {
      //It is prevented from retaking the same course
      for (let prevLecture of selectedStudent.courseList) {
        if (prevLecture.course.code === selectedLecture.code) {
          alert("Already registered for this course.!");
          return;
        }
      }
      let registeredLecture = {
        course: selectedLecture,
        mid: midterm,
        fin: final,
        ltr: calcLetter(midterm, final, selectedLecture.pointScale),
      };
      selectedStudent.courseList.push(registeredLecture);
    }
    //The same operations are done to add the selected student and 
    //grades to the student list of the selected course.
    if (selectedLecture.studentList.length === 0) {
      let registeredStudent = {
        std: selectedStudent,
        mid: midterm,
        fin: final,
        ltr: calcLetter(midterm, final, selectedLecture.pointScale),
      };
      selectedLecture.studentList.push(registeredStudent);
    } else {
      for (let prevStudent of selectedLecture.studentList) {
        if (prevStudent.std.id === selectedStudent.id) {
          alert("This student is already registered!");
          return;
        }
      }

      let registeredStudent = {
        std: selectedStudent,
        mid: midterm,
        fin: final,
        ltr: calcLetter(midterm, final, selectedLecture.pointScale),
      };
      selectedLecture.studentList.push(registeredStudent);
    }
  }
}
//Since many different tables will be created, the body creation part is kept in a function.
//It requests the body part of a table, the list of students and the selected course as variables.
function tableBodyCreator(body, std, selectLecture) {
  let row = body.insertRow();
  row.id = std.std.id;
  let cell1 = row.insertCell();
  cell1.textContent = std.std.id;
  let cell2 = row.insertCell();
  cell2.textContent = std.std.name;
  let cell3 = row.insertCell();
  cell3.textContent = std.mid;
  let cell4 = row.insertCell();
  cell4.textContent = std.fin;
  let cell5 = row.insertCell();
  cell5.textContent = std.ltr;
  let cell6 = row.insertCell();
  //A delete button is created in the table to delete the student from that course
  let deleteButton = document.createElement("button");
  //The element is added to the required class
  deleteButton.classList.add("submit")
  deleteButton.classList.add("tableButtons");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    let deletestd = std.std.id;
    //The Delete button deletes the selected course in the student's list 
    //and the student in the selected course's student list.
    for (let i = 0; i < selectLecture.studentList.length; i++) {
      if (deletestd === selectLecture.studentList[i].std.id) {
        selectLecture.studentList.splice(i, 1);
      }
    }
    for (let i = 0; i < std.std.courseList.length; i++) {
      if (selectLecture.code === std.std.courseList[i].course.code) {
        std.std.courseList.splice(i, 1);
      }
    }
    displayTable();
    displayStudentInfo();
  });
  cell6.appendChild(deleteButton);
  //Two new inputs are created for the Edit Scores button.
  //Student's old grades appear as placeholder
  let input1 = document.createElement("input");
  input1.placeholder = std.mid;
  //The element is added to the required class
  input1.classList.add("input")
  input1.id = "newMidInput";
  input1.type = "number";
  input1.min = "0"
  input1.max = "100";
  let input2 = document.createElement("input");
  input2.placeholder = std.fin;
  //The element is added to the required class
  input2.classList.add("input");
  input2.id = "newFinInput"
  input2.type = "number";
  input2.min = "0"
  input2.max = "100";
  let cell7 = row.insertCell();
  //An edit button is created to change the student's grades
  let editButton = document.createElement("button");
  //The element is added to the required class
  editButton.classList.add("submit")
  editButton.classList.add("tableButtons")
  editButton.textContent = "Edit";
  editButton.addEventListener("click", function () {
    //When the button is clicked, two new inputs appear on the screen
    cell3.textContent = "";
    cell3.appendChild(input1);
    cell4.textContent = "";
    cell4.appendChild(input2);
  })
  let cell8 = row.insertCell();
  //A save button is created to save newly entered notes
  let saveButton = document.createElement("button");
  //The element is added to the required class
  saveButton.classList.add("submit");
  saveButton.classList.add("tableButtons");
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", function () {
    let newMid = document.getElementById("newMidInput").value;
    let newFin = document.getElementById("newFinInput").value;
    //Grades must be in the acceptable range
    if (newMid < 0 || newMid > 100 || newFin < 0 || newFin > 100) {
      alert("Grades must be between 0 and 100.");
    } else {
      updateScore(std.std.id, selectLecture.code, newMid, newFin);
      displayTable();
    }
  })
  cell7.appendChild(editButton);
  cell8.appendChild(saveButton);
}
function updateScore(studentId, lectureCode, newMid, newFin) {
  //To avoid not defined error, a null value is given at the beginning
  let selectedStudent = null;
  let selectedLecture = null;
  // Find the selected student and lecture
  for (let s of students) {
    if (s.id === studentId) {
      selectedStudent = s;
      break;
    }
  }

  for (let l of lectures) {
    if (l.code === lectureCode) {
      selectedLecture = l;
      break;
    }
  }

  // Update the student's records for the selected lecture

  for (let course of selectedStudent.courseList) {
    if (course.course.code === lectureCode) {
      //If left blank, the old note is requested to remain.
      if (newMid !== "") {
        course.mid = newMid;
      }
      if (newFin !== "") {
        course.fin = newFin;
      }
      //Letter grade is recalculated
      course.ltr = calcLetter(course.mid, course.fin, selectedLecture.pointScale);
      break;
    }
  }

  // Update the lecture's record for the selected student
  for (let studnt of selectedLecture.studentList) {
    if (studnt.std.id === studentId) {
      if (newMid !== "") {
        studnt.mid = newMid;
      }
      if (newFin !== "") {
        studnt.fin = newFin;
      }

      studnt.ltr = calcLetter(studnt.mid, studnt.fin, selectedLecture.pointScale);
      break;
    }
  }
}
//Displays the tables of the selected course
function displayTable() {
  //Course and table type (All, Fails, Passes, Details) are selected
  let selectedDispLecture = document.getElementById("displayLectureOptions").value;
  let tableType = document.getElementById("tableType").value;
  let selectLecture = null;
  //The selected course is found
  for (const l of lectures) {
    if (selectedDispLecture === l.code) {
      selectLecture = l;
    }
  }
  //If no course is selected, the information is cleared.
  if (selectLecture === null) {
    let existingTable = document.getElementById("studentTable");
    if (existingTable !== null) {
      existingTable.parentNode.removeChild(existingTable);
    }
    let existingDetail = document.getElementById("detail");
    if (existingDetail !== null) {
      existingDetail.parentNode.removeChild(existingDetail);
    }
    return;
  }
  //A new table is created
  let table = document.createElement("table");
  table.id = selectLecture.code;
  let header = table.createTHead();
  let headerRow = header.insertRow();
  let headerCell1 = headerRow.insertCell();
  headerCell1.textContent = "Student ID"
  let headerCell2 = headerRow.insertCell();
  headerCell2.textContent = "Student Name"
  let headerCell3 = headerRow.insertCell();
  headerCell3.textContent = "Midterm Grade"
  let headerCell4 = headerRow.insertCell();
  headerCell4.textContent = "Final Grade"
  let headerCell5 = headerRow.insertCell();
  headerCell5.textContent = "Letter Grade"
  let body = table.createTBody();
  //If there is a table or paragraph on the screen, it is cleared
  let existingTable = document.getElementById("studentTable");
  if (existingTable !== null) {
    existingTable.parentNode.removeChild(existingTable);
  }
  let existingDetail = document.getElementById("detail");
  if (existingDetail !== null) {
    existingDetail.parentNode.removeChild(existingDetail);
  }
  //Fail, pass, total number of students and total grade calculation are all set to 0 at the beginning
  let passCounter = 0;
  let failCounter = 0;
  let studentCount = 0;
  let totalGrade = 0;
  //The students of the lesson are looped
  for (let std of selectLecture.studentList) {
    //Number of students counted
    studentCount = studentCount + 1;
    //total score is calculated
    totalGrade = totalGrade + ((std.mid * 40) + (std.fin * 60)) / 100;
    //Students with letter grade F are marked as fail
    if (std.ltr === "F") {
      failCounter = failCounter + 1;
    }
    else {
      //The rest are marked as pass
      passCounter = passCounter + 1;
    }
  }
  //All table type is selected for all students
  if (tableType === "All") {
    for (let std of selectLecture.studentList) {
      //The body is created
      tableBodyCreator(body, std, selectLecture);
    }
    //The table is inserted where it should be
    table.id = "studentTable";
    document.getElementById("tableContainer").appendChild(table);
  }
  //Fail table type is selected for fail students
  else if (tableType === "Fail") {
    for (let std of selectLecture.studentList) {
      if (std.ltr === "F") {
        tableBodyCreator(body, std, selectLecture);
      }
    }
    table.id = "studentTable";
    document.getElementById("tableContainer").appendChild(table);
  }
  //Pass table type is selected for pass students
  else if (tableType === "Pass") {
    for (let std of selectLecture.studentList) {
      if (std.ltr !== "F") {
        tableBodyCreator(body, std, selectLecture);
      }
    }
    table.id = "studentTable";
    document.getElementById("tableContainer").appendChild(table);
  }
  //Detail table type is selected for the course details
  else if (tableType = "Details") {
    //The details paragraph is created
    let detail = document.createElement("p");
    //The element is added to the required class
    detail.classList.add("details")
    //The content of the paragraph is added
    detail.innerHTML = "Course Code: " + selectLecture.code + "<br><br>" + "Course Name: " + selectLecture.name + "<br><br>" + "Instructor: " + selectLecture.teacher + "<br><br>" + "Number of Student: " + studentCount + "<br><br>" + "Fail Student Number: " + failCounter + "<br><br>" + "Pass Student Number: " + passCounter + "<br><br>" + "Mean: " + totalGrade / studentCount;
    detail.id = "detail";
    document.getElementById("tableContainer").appendChild(detail);
  }
}
//Calculates a GPA from the student's letter grades
function calcGPA(std) {
  totalScore = 0;
  for (let i = 0; i < std.courseList.length; i++) {
    if (std.courseList[i].ltr === "A") {
      totalScore = totalScore + 4.0;
    }
    else if (std.courseList[i].ltr === "B") {
      totalScore = totalScore + 3.0;
    }
    else if (std.courseList[i].ltr === "C") {
      totalScore = totalScore + 2.0;
    }
    else if (std.courseList[i].ltr === "D") {
      totalScore = totalScore + 1.0;
    }
    else if (std.courseList[i].ltr === "F") {
      totalScore = totalScore + 0.0;
    }
  }
  return totalScore / std.courseList.length;
}
//Creates paragraphs and tables for student's information
function displayStudentInfo() {
  //Clears the screen if there are paragraphs or tables
  let existingInfo = document.getElementById("infoP");
  if (existingInfo !== null) {
    existingInfo.parentNode.removeChild(existingInfo);
  }
  let existingTable = document.getElementById("lectureTable");
  if (existingTable !== null) {
    existingTable.parentNode.removeChild(existingTable);
  }
  //Takes the selected student and finds it from the array
  let studentInfo = document.getElementById("studentInfo").value;
  selectedStd = null;
  for (let std of students) {
    if (std.name === studentInfo) {
      selectedStd = std;

    }
  }
  //Doesn't work if student is not selected
  if (selectedStd === null) {
    return;
  }
  //A different table is created for the student
  let table = document.createElement("table");
  let header = table.createTHead();
  let headerRow = header.insertRow();
  let headerCell1 = headerRow.insertCell();
  headerCell1.textContent = "Course Code"
  let headerCell2 = headerRow.insertCell();
  headerCell2.textContent = "Course Name"
  let headerCell3 = headerRow.insertCell();
  headerCell3.textContent = "Instructor Name"
  let headerCell4 = headerRow.insertCell();
  headerCell4.textContent = "Midterm Grade"
  let headerCell5 = headerRow.insertCell();
  headerCell5.textContent = "Final Grade"
  let headerCell6 = headerRow.insertCell();
  headerCell6.textContent = "Letter Grade"
  let body = table.createTBody();
  //Information of all courses taken is displayed
  for (let i = 0; i < selectedStd.courseList.length; i++) {
    let row = body.insertRow();
    let cell1 = row.insertCell();
    cell1.textContent = selectedStd.courseList[i].course.code;
    let cell2 = row.insertCell();
    cell2.textContent = selectedStd.courseList[i].course.name;
    let cell3 = row.insertCell();
    cell3.textContent = selectedStd.courseList[i].course.teacher;
    let cell4 = row.insertCell();
    cell4.textContent = selectedStd.courseList[i].mid;
    let cell5 = row.insertCell();
    cell5.textContent = selectedStd.courseList[i].fin;
    let cell6 = row.insertCell();
    cell6.textContent = selectedStd.courseList[i].ltr;
  }

  //Student information and table is added where it should be
  table.id = "lectureTable";
  let infoP = document.createElement("p");
  //The element is added to the required class
  infoP.classList.add("details");
  infoP.id = "infoP";
  infoP.innerHTML = "Student ID: " + selectedStd.id + "<br>" + "Student  name: " + selectedStd.name + "<br>" + "GPA: " + calcGPA(selectedStd) + "<br>";
  document.getElementById("studentInfoTable").appendChild(infoP);
  document.getElementById("studentInfoTable").appendChild(table);
}