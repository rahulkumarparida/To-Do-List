

    let INPUT  = document.getElementById("InputText")
    let ADD_btn = document.getElementById("SumbitButton")

    // let Completed_Btn = document.getElementsByClassName("completed")
    // let Deleted_btn = document.getElementsByClassName("deleted")

    let Output_Container =  document.getElementById("OutPut")




    // Variable and the function that check the Local-Storage if any Prev Task is left
    let taskArray
    function checkStorage() {
    let arr = JSON.parse(localStorage.getItem("AllTasks"))
    if (arr) {
        taskArray = arr
    } else {
        taskArray = []
    }
    }

    let a = -1 
    // function counter() {

    //     let b = a+1
    //     a = b
    //     console.log( a ,"<--a||b-->  ",b);
    //     return b 
    // }
   
    // function counter() {
    //     const count = 0;
      
    //     return {
    //       increment: function() {
    //       count =  count++;
    //         return count;
    //       }
    //     }
        
    // }
    


let lastId = localStorage.getItem("lastId") ? parseInt(localStorage.getItem("lastId")) : 0;

function getNextId() {
    return lastId;
}
   // Function to catch input values and return it
    function InputValues() {
        if (INPUT.value == "") {
            console.log("Empty Task");
        } else {
          let id = getNextId()
            Task =  {
                id : id,
                Input : INPUT.value.trim()
            }
        }
        lastId++;
        localStorage.setItem("lastId", lastId);
    
    //  console.log(Task);
    INPUT.value =""
        return Task
    }


   
    // function to Store Tasks in Localstorage
    let ArrayOfTaskOBJ 
    function StoreTask(task) {
        checkStorage()

        taskArray.push(task)

        ArrayOfTaskOBJ = JSON.stringify(taskArray)
    localStorage.setItem("AllTasks" , ArrayOfTaskOBJ)

    return taskArray

    }

    // Function to crate the  UI for the Task elemnts


    function UIofList(inputtask , id ) {
        const outputElement = document.getElementById("OutPut");

        // Create the list item
        const listItem = document.createElement("li");
        listItem.id = `Input1`;
    
        // Create paragraph element
        const paragraph = document.createElement("p");
        
        paragraph.textContent = `${id}. ${inputtask}`;
        
        // Create div container
        const div = document.createElement("div");
        
        // Create buttons


        const compButton = document.createElement("button");
        compButton.textContent = "Comp";
        compButton.setAttribute("key" , id)

        compButton.addEventListener("click" , (e)=>{
           let li = e.target.closest("li")
           li.setAttribute("class" , "Complete_task")
            
           
        })

//!--------------Delete Button -----------------//!
        let delButton = document.createElement("button");
        delButton.textContent = "Del";
        delButton.setAttribute("key" , id)
      
   //!--------------Delete Button Event Listner-----------------//!
    delButton.addEventListener("click" , (e)=>{
   
   let taskitem =  e.target.closest("li")
   let taskId = delButton.getAttribute("key");
   let RemoveLocal = JSON.parse(localStorage.getItem("AllTasks"))

   let RemovedArr = RemoveLocal.filter(ele=>{return  ele.id != taskId-1})
   console.log(RemovedArr);
    localStorage.setItem("AllTasks" ,JSON.stringify(RemovedArr))
    lastId = localStorage.getItem("lastId");
        if (RemovedArr.length <= 0) {
            lastId = 0
            localStorage.setItem("lastId" ,lastId)
        }
    localStorage.setItem("lastId" ,lastId)
    taskitem.remove()
    
        e.preventDefault()
    })



        // Append buttons to div
        div.appendChild(compButton);
        div.appendChild(delButton);
        
        // Append paragraph and div to list item
        listItem.appendChild(paragraph);
        listItem.appendChild(div);
        
        // Append list item to output element
        outputElement.appendChild(listItem);




        
    }



    // function to callback Stored values in the local storage
    let CalledBack
    let ArrayOfTaskReturn 
    function CallStoredValues() {
    CalledBack = localStorage.getItem("AllTasks")
        ArrayOfTaskReturn = JSON.parse(CalledBack)

        if (CalledBack) {
       
    
            let i = ArrayOfTaskReturn.length
           
            if (i <= 8) {
                console.log("new task added with id =" ,ArrayOfTaskReturn.id);
                let index = ArrayOfTaskReturn.length -1
                console.log(`This is Good ${index}`);
                UIofList(ArrayOfTaskReturn[i-1].Input , lastId)
              
    
            } else {

                alert("Finish the previous tasks")
            }
    
        } else {
            console.log("Error Storage is Empty");
            
        }
        
    }

    // Function to call the values after reloading the page
    let Recalled
    let ReturnedArray
    function RecalllValue() {
        Recalled = localStorage.getItem("AllTasks")

    if (Recalled == null) {
        Recalled = []
        ReturnedArray = Recalled
    } else {
        ReturnedArray = JSON.parse(Recalled)  
    }
    ReturnedArray.map((ele , indx)=>{
        // console.log(`${ele} is ${ele.Input} which is stored in ${indx}....map`)
        UIofList(ele.Input , indx+1)
    });
   
    }
    window.onload = RecalllValue


   




    //! Event listner on the Add Button to add Task
    ADD_btn.addEventListener("click" , (e)=>{
    InputValues()
    StoreTask(Task)
    CallStoredValues()

 


    e.preventDefault()
    })



