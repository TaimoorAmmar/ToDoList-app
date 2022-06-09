//getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector (".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");



inputBox.onkeyup = () => {
    let userData = inputBox.value; //getting user entered value
    if(userData.trim() !=0){ //if user values arent only spaces
        addBtn.classList.add("active");//active the add button
    }else{
    addBtn.classList.remove("active");//unactive the add button

    }
}
showTasks();//calling showTasks function
  
//if user click on add button
addBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){//if localstorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage);//transforming json string into js object
    }
    listArr.push(userData);//pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into json string
    showTasks();//calling showTasks function
    deleteAllBtn.classList.remove("active");//unactive the clearall button

}   
//function to add task list inside ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if(getLocalStorage == null){//if localstorage is null
        listArr = []; //creating blank array
    }else{
        listArr = JSON.parse(getLocalStorage);//transforming json string into js object
    }
    const pendingnumb = document.querySelector(".pendingNumb");
    pendingnumb.textContent = listArr.length; //passing the length value in pendingNumb
    if(listArr.length >0){//if array length is greater than 0
        deleteAllBtn.classList.add("active");//active the clearall button
    }else{
        deleteAllBtn.classList.remove("active");//unactive the clearall button
    }
   
    let newLiTag = "";
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick ="deleteTask(${index})";> <i class="uil uil-trash"></i></span></li>`;
    });
    
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave input field blank
}
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete or remove the particular indexed li
    //after remove the li again and update local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));//transforming js obj intojs string
    showTasks();//calling showtask function

}

//delete all tasks function
deleteAllBtn.onclick = () => {
    listArr = []; //empty an array
    //after delete all task again and update local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));//transforming js obj intojs string
    showTasks();//calling showtask function

}