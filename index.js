//elements
const showData = document.querySelector('.hiddenData'),
      add = document.querySelector("#vector"),
      store = document.querySelector("#store"),
      cancel = document.querySelector("#cancel");     

const footerHide = document.querySelector('#hideFooter'); 
const head = document.querySelector('.address');
const bool = document.querySelector('.status');
const fatherDiv = document.querySelector('.list');

//Get The Data Using Ajax
let req = new XMLHttpRequest();
req.onreadystatechange = () => {
    if (req.readyState === 4 && req.status === 200) {
        JSON.parse(req.response);
        const tasks = JSON.parse(req.response);
        console.table(tasks);
        for(const item in tasks){
            fatherDiv.appendChild(getTheCards(tasks[item]['title'],tasks[item]['completed']));
        }
    }
}

// api link and method
req.open("GET", "https://jsonplaceholder.typicode.com/todos");
req.send();


// Create a new element to store the data brought by ajax
function getTheCards (inputOne, inputTwo){
    const task = document.createElement('div');
    task.classList.add("task");
    task.innerHTML = `
    <h2 class="address">${inputOne}</h2>
    <p class="bool">${inputTwo}</p>
    `
    return task;
}


// Event on store icon to post data by using fetch
store.addEventListener('click', () => {
    const title= head.value;
    const completed = bool.value;
    if (title == "" && completed == "") {
       window.alert("Enter Data");
    }else{
        fetch("https://jsonplaceholder.typicode.com/todos", {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                completed: completed
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
        }).then(
            fatherDiv.appendChild(getTheCards(title, completed)),
            window.scrollTo(0, document.body.scrollHeight),
            footerHide.style = 'display: flex',
            showData.style = 'display: none',
            head.value = null,
            bool.value = null
        ).catch((error) => {
            console.log(error);
        });
    }
});

// Event on add icon
add.addEventListener('click', () => {
    footerHide.style = 'display: none';
    showData.style = 'display: block';
    fatherDiv.style = 'padding-bottom: 0px;';
    window.scrollTo(0, 0)
});


let x = window.screenLeft;
let y = window.screenTop;

cancel.addEventListener('click', () => {
    footerHide.style = 'display: flex';
    showData.style = 'display: none';
    window.screen(y); 
});

