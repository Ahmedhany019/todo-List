//Setting Variables
let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let taskState = document.querySelector(".task-stats");

//Focus on Input Field
onload = function () {
  theInput.focus();
};
//Adding The Task
theAddButton.onclick = function () {
  //Check If Input Empty
  if (theInput.value == "") {
    swal.fire({
      title: "Empty Filled",
      text: "you have to fill the input",
      icon: "error",
      confirmButtonText: "Cool",
    });
  } else {
    let noTasksMsg = document.querySelector(".no-tasks-message");
    //Check if noTasksMsg is Exist
    if (document.body.contains(document.querySelector(".no-tasks-message"))) {
      //Remove noTasksMsg
      noTasksMsg.remove();
    }
    //Create Main Span
    let mainSpan = document.createElement("span");

    //Create Text Span
    let spanText = document.createTextNode(theInput.value);

    //Create Delete Span
    let deleteSpan = document.createElement("span");

    //Create Text Delete Span And Add Class
    deleteSpan.appendChild(document.createTextNode("delete"));
    deleteSpan.classList.add("delete");

    //Add Text And Delete To Main Span
    mainSpan.appendChild(spanText);
    mainSpan.appendChild(deleteSpan);

    //add Main Span To Page
    tasksContainer.appendChild(mainSpan);

    //add Class Name To Span
    mainSpan.classList.add("task-box");

    //Remove text From Input
    theInput.value = "";
    //Focus on Input Field
    theInput.focus();

    calculateTasks();
  }
};
document.addEventListener("click", function (e) {
  //remove task
  if (e.target.classList.contains("delete")) {
    e.target.parentNode.remove();
    //Add function createNoTasksMsg
    if (tasksContainer.childElementCount == 0) {
      createNoTasksMsg();
    }
  }
  //remove All tasks
  if (e.target.classList.contains("deleteall")) {
    let taskBoxes = document.querySelectorAll(".task-box");
    if (taskBoxes.length == 0) {
      swal.fire({
        title: "Erorr",
        text: "No Tasks To Delete",
        icon: "error",
        confirmButtonText: "No Problem",
      });
    } else {
      taskBoxes.forEach(function (taskBox) {
        taskBox.remove();
        
      });
      createNoTasksMsg()
    }
  }
  //Finished All tasks
  if (e.target.classList.contains("finishedall")) {
    let taskBoxes = document.querySelectorAll(".task-box");
    if (taskBoxes.length < 1) {
      swal.fire({
        title: "Erorr",
        text: "No Tasks To Finish",
        icon: "error",
        confirmButtonText: "No Problem",
      });
    } else {
      let taskBoxes = document.querySelectorAll(".task-box");
      taskBoxes.forEach(function (taskBox) {
        taskBox.classList.toggle("finished");
      });
    }
  }
  //Finished Task
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
  }
  calculateTasks()
});

//Create Delete All
let delAll = document.createElement("span");
let delAllText = document.createTextNode("Delete All");
delAll.appendChild(delAllText);
//Add Class Name To Delete All Element
delAll.classList.add("deleteall");

//add Element To page
taskState.appendChild(delAll);

//Create finished All
let finAll = document.createElement("span");
let finlAllText = document.createTextNode("Finished All");
finAll.appendChild(finlAllText);
//Add Class Name To Delete All Element
finAll.classList.add("finishedall");

//add Element To page
taskState.appendChild(finAll);

//Function To Create No Tasks Message
function createNoTasksMsg() {
  //Create Span Element
  let msgSpan = document.createElement("span");
  //Create Span message
  let msgText = document.createTextNode("No Tasks To Show");
  //add class to Span Element
  msgSpan.className = "no-tasks-message";
  // add msgText To Span Element
  msgSpan.appendChild(msgText);
  // add Span Element To Task Container
  tasksContainer.appendChild(msgSpan);
}

//Function To calculate tasks
function calculateTasks() {
  //Calculate All Tasks
  tasksCount.innerHTML = document.querySelectorAll(".tasks-content .task-box").length;

  //Calculate Completed Tasks
  tasksCompleted.innerHTML = document.querySelectorAll(".tasks-content .finished").length;
}
