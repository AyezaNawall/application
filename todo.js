

document.addEventListener("DOMContentLoaded", function () {

let inputv=document.querySelector("#input");
let taskIdCounter = 0;
let currentEditingId = null;

let editing=document.querySelector("#modalInput");

inputv.addEventListener("focus", function () {
    inputv.style.backgroundColor ="rgb(41, 41, 41)";
    inputv.style.border="1px solid white"
    inputv.style.boxShadow = " 0 0 8px 2px rgba(255, 255, 255, 0.4)";
    inputv.style.color = "white";
    
});
inputv.addEventListener("blur", function () {
    inputv.style.border = "none";
    inputv.style.boxShadow = "none";
});

editing.addEventListener("focus",function(){
    editing.style.border="none";
    editing.style.boxShadow="none";
    editing.style.color="white";
})

let todo=document.querySelector("#todo");
let h4=document.querySelector("h4");
let taskContainer = document.querySelector("#actualtasks");


let comptask=document.createElement("li");
    comptask.className="comptask";
    taskContainer.appendChild(comptask);


    let newdiv=document.createElement("div");
    newdiv.className="complete";
    newdiv.innerText="complete";
    taskContainer.appendChild(newdiv);


     //oncheck sound
    function audioplay(url){
        const audio = new Audio(url);
        audio.play();
    }

    //uncheck sound
    function audioplay2(url){
        const audio = new Audio(url);
        audio.volume=0.1;
        audio.play();
    }

    function editer(name){
    let editbtn=document.createElement("button");
    let uniqueId = "task-" + taskIdCounter++; // move ID here

    editbtn.innerText="Edit";
    editbtn.className = "btn btn-secondary editbtn";
    editbtn.setAttribute("editbtn-id", uniqueId); 

    name.appendChild(editbtn);


    editbtn.addEventListener("mousedown",function(){
        editbtn.style.backgroundColor="rgba(78, 73, 73, 1)";
        editbtn.style.border="1px solid white";
    })
    editbtn.addEventListener("mouseup",function(){
        editbtn.style.backgroundColor="rgb(41, 41, 41)";
        editbtn.style.border="none";
    });

    return uniqueId; 
}


    function deleter(name){
        let deletebtn=document.createElement("button");
        let uniqueId = "task-" + taskIdCounter++;
        name.appendChild(deletebtn);
        deletebtn.id="deletebtn";
        deletebtn.innerText="Delete";
        deletebtn.className="btn btn-danger";
        deletebtn.setAttribute("deletebtn-id", uniqueId);
        deletebtn.addEventListener("mousedown",function(){
            deletebtn.style.backgroundColor="rgba(78, 73, 73, 1)";
            deletebtn.style.border="1px solid crimson";
        })
        deletebtn.addEventListener("mouseup",function(){
            deletebtn.style.backgroundColor="rgb(41, 41, 41)";
            deletebtn.style.border="none";
        })
        return uniqueId;
    }
    function countTasksIn(container) {
    return [...container.children].filter(child => child.id === "container").length;
}
    

let userinput=()=>{
    let input=document.querySelector("#input");
    let inputval=input.value;
    if (inputval.trim() === "") return;
    //creating container
    let container=document.createElement("li");
    container.id="container";
    container.className="list-group-item";

    //creating checkbox
    let checkbox=document.createElement("input");
    checkbox.type="checkbox";
    checkbox.id="checkbox";
    checkbox.className="form-check-input mt-0"

    //creating para
    let para=document.createElement("p");
    para.className="para";
    para.innerText=inputval;

    let container2=document.createElement("div");
    container2.id="container2";


    let buttonWrapper = document.createElement("div");
buttonWrapper.className = "button-wrapper"; 
buttonWrapper.style.display = "flex";
buttonWrapper.style.gap = "5px";

let uniqueId = "task-" + taskIdCounter++;

// Create buttons and assign same ID
let editId = editer(buttonWrapper);  // returns ID
let deleteId = deleter(buttonWrapper); // also returns ID

// Force both to use the same uniqueId
editId = deleteId = uniqueId;

container.setAttribute("container-id", uniqueId);
para.setAttribute("para-id", uniqueId);

// Set the IDs on the actual buttons
buttonWrapper.querySelector(".editbtn").setAttribute("editbtn-id", uniqueId);
buttonWrapper.querySelector(".btn-danger").setAttribute("deletebtn-id", uniqueId);



// Then append everything to container
container2.appendChild(checkbox);
container2.appendChild(para);
container.appendChild(container2);
container.appendChild(buttonWrapper);


    //append container to task
    let taskContainer = document.querySelector("#actualtasks");
    taskContainer.appendChild(container);

    


    if(taskContainer.children.length!==0){
    let number = countTasksIn(taskContainer);
    h4.innerText="To Do "+number;
}
    
    oncheck(checkbox,para,container);
    input.value = "";
    
}
let oncheck=(checkbox,para,container)=>{
    checkbox.addEventListener("change",function(){
        let comptask=document.querySelector(".comptask");
        let complete=document.querySelector(".complete");
        if(this.checked){
            checkbox.style.backgroundColor="rgb(114, 114, 114)";
            let editBtn = container.querySelector(".editbtn");
            let deleteBtn = container.querySelector("#deletebtn");
            if (editBtn) editBtn.remove();
            if (deleteBtn) deleteBtn.remove();
            para.style.textDecoration="line-through";
            comptask.appendChild(container);
            
        complete.innerText = "Complete " + countTasksIn(comptask);
        h4.innerText = "To Do " + countTasksIn(taskContainer);

            complete.style.visibility="visible";
            audioplay("myaudio.mp3");
            

        }
        else {
            checkbox.style.backgroundColor="rgb(41, 41, 41)";
            para.style.textDecoration="none";
            let taskContainer=document.querySelector("#actualtasks");
            taskContainer.appendChild(container);
            audioplay2("no2.Wav");

            complete.innerText = "Complete " + countTasksIn(comptask);
            h4.innerText = "To Do " + countTasksIn(taskContainer);

            
            let buttonWrapper = document.createElement("div");
            buttonWrapper.className = "button-wrapper";
            buttonWrapper.style.display = "flex";
            buttonWrapper.style.gap = "5px";

            editer(buttonWrapper);
            deleter(buttonWrapper);
            container.appendChild(buttonWrapper);
                if (comptask.children.length === 0) {
                    complete.style.visibility = "hidden";
                }
            
            
        
            
        }
    })
    }
 inputv.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        userinput();
        
    }
})




  const modalElement = document.getElementById('myModal');
  const myModal = new bootstrap.Modal(modalElement);
  const modalElement2 = document.getElementById('myModal2');
  const myModal2 = new bootstrap.Modal(modalElement2);

  
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('editbtn')) {
    myModal.show();

    const editBtnId = e.target.getAttribute("editbtn-id");
    currentEditingId = editBtnId; 
    const matchingPara = document.querySelector(`[para-id="${editBtnId}"]`);
    if (matchingPara) {
      editing.value = matchingPara.innerText;  
    }
  }
});
document.getElementById("save").addEventListener("click", function () {
  if (currentEditingId) {
    const targetPara = document.querySelector(`[para-id="${currentEditingId}"]`);
    if (targetPara) {
      targetPara.innerText = editing.value; 
    }
    myModal.hide(); 
    currentEditingId = null; 
  }
});


document.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-danger')) {
    const deleteId = e.target.getAttribute("deletebtn-id");
    const containerToDelete = document.querySelector(`[container-id="${deleteId}"]`);

    if (containerToDelete) {
      myModal2.show();
      document.getElementById("delete").addEventListener("click", function () {
      containerToDelete.remove();
      myModal2.hide();
    });
    

        let comptask = document.querySelector(".comptask");
        let taskContainer = document.querySelector("#actualtasks");
        let complete = document.querySelector(".complete");
        
        complete.innerText = "Complete " + countTasksIn(comptask);
        h4.innerText = "To Do " + countTasksIn(taskContainer);

        if (comptask.children.length === 0) {
          complete.style.visibility = "hidden";
        }
    
      }
    }
  })
});

// });

        
   

   