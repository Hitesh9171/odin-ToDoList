import search from "../images/search.svg";
import upcoming from "../images/upcoming.svg";
import today from "../images/today.svg";
import calendar from "../images/calender.svg";
import stickywall from "../images/sticky.svg";
import addlist from "../images/plus.svg";
import { getLists, saveList } from "../scripts/storage.js";
import loadCalendar from "./calendar.js";
import { format } from "date-fns";
import loadTasks from "./tasks.js";
import loadToday from "./loadToday.js";


function loadSidebar() {
    const sidebardiv = document.createElement("div");
    sidebardiv.classList.add("sidebar-div");
    sidebardiv.appendChild(createHeading());
    sidebardiv.appendChild(createTasks());
    sidebardiv.appendChild(createList());
    return sidebardiv;
    
}
//function to create heading
function createHeading() {
    const headingdiv=document.createElement("div");
    headingdiv.classList.add("heading-div");
    const heading=document.createElement("h2");
    heading.textContent="Menu";
    
    const searchwrapper=document.createElement("div");
    searchwrapper.classList.add("search-wrapper");
    const searchicon=document.createElement("img");
    searchicon.src=search;
    const searchtext=document.createElement("input");
    searchtext.type="text";
    searchtext.placeholder="Search(Under Construction Will do nothing for now)";
    searchwrapper.appendChild(searchicon);
    searchwrapper.appendChild(searchtext);

    headingdiv.appendChild(heading);
    headingdiv.appendChild(searchwrapper);
    return headingdiv;
}
//function to create tasks
function createTasks() {
    const taskswrapper=document.createElement("div");
    taskswrapper.classList.add("tasks-wrapper");
    const taskheading=document.createElement("h3");
    taskheading.textContent="TASKS";
    taskswrapper.appendChild(taskheading);
    const upcomingbtn=taskswrapper.appendChild(createItem(upcoming,"Upcoming(Under Development)"));
    const todaybtn=taskswrapper.appendChild(createItem(today,"Today"));
    const calendarbtn=taskswrapper.appendChild(createItem(calendar,"Calendar"));
    //loading calendarview
    calendarbtn.addEventListener('click',loadCalendar);
    todaybtn.addEventListener('click',loadToday);

    return taskswrapper;
}
//function to create list
function createList(){
    const listwrapper=document.createElement("div");
    listwrapper.classList.add("list-wrapper");
    const listheading=document.createElement("h3");
    listheading.textContent="LISTS(Under development)";
    listwrapper.appendChild(listheading);
    const listitems=document.createElement("div");
    listitems.classList.add("list-items");
    //add list items here
    listwrapper.appendChild(listitems);

    const addlistitem=createItem(addlist,"Add New List");
    listwrapper.appendChild(addlistitem);
    const dialog=document.createElement("dialog");
    dialog.classList.add("dialog");
    addlistitem.addEventListener('click',()=> {
        createdialog(dialog);
        dialog.showModal();
    });





    listwrapper.appendChild(dialog);
    const savedLists=getLists();
    savedLists.forEach(list=> {
        const item=createListItem(list.name,list.color);
        listitems.appendChild(item);
    })
    return listwrapper;
}






// helper functions
function createItem(image,textContent) {
    const itemdiv=document.createElement("div");
    itemdiv.classList.add("item-div");
    const icon=document.createElement("img");
    icon.src=image;
    const btn=document.createElement("button");
    btn.textContent=textContent;
    itemdiv.appendChild(icon);
    itemdiv.appendChild(btn);

    itemdiv.addEventListener('click',()=> {
        document.querySelectorAll(".item-div").forEach(item => {
            item.classList.remove("active");
            
        });
        itemdiv.classList.add("active");
    });

    return itemdiv;
}

function createdialog(dialog){
    dialog.innerHTML="";
    const dialogwrapper=document.createElement("div");
    dialogwrapper.classList.add("dialog-wrapper");
    const labeldiv=document.createElement("div");
    const form=document.createElement("form");
    form.classList.add("list-form");
    const label=document.createElement("label");
    label.textContent="Enter List Name";
    const input=document.createElement("input");
    input.type="text";
    input.placeholder="Enter name";
    labeldiv.appendChild(label);
    labeldiv.appendChild(input);
    const buttondiv=document.createElement("div");
    buttondiv.classList.add("button-div");
    const addbtn=document.createElement("button");
    addbtn.textContent="Add";
    const cancelbtn=document.createElement("button");
    cancelbtn.textContent="Cancel";
    buttondiv.appendChild(addbtn);
    buttondiv.appendChild(cancelbtn);
    //below code is when user clicks add we save the name of list locally and generate a random color 

    addbtn.addEventListener('click', ()=> {
        const listName=input.value.trim();
        if(!listName)return;
        const listcolor=generateRandomColor();
        saveList(listName,listcolor);
        const item=createListItem(listName,listcolor);
        document.querySelector(".list-items").appendChild(item);
        dialog.close();
    });





    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(buttondiv);
    dialogwrapper.appendChild(form);
    dialog.appendChild(dialogwrapper);

}
function createListItem(name, color) {
    const item=document.createElement("div");
    item.classList.add("list-item");
    const colordiv=document.createElement("div");
    colordiv.classList.add("color-div");
    colordiv.style.height="24px";
    colordiv.style.width="24px";
    colordiv.style.backgroundColor=color;
    item.appendChild(colordiv);
    const listbtn=document.createElement("button");
    listbtn.classList.add("list-btn");
    listbtn.textContent=name;
    item.appendChild(listbtn);
    //adding a delete button here 
    const deletebtn=document.createElement("button");
    deletebtn.textContent= "🗑️";
    deletebtn.style.marginLeft="auto";
    deletebtn.style.cursor="pointer";
    deletebtn.style.border="none";
    deletebtn.style.background="transparent";
    //deleting list from localstorage
    deletebtn.addEventListener('click',()=>{
        let alllists=getLists();
        alllists=alllists.filter(list=>list.name!==name);
        localStorage.setItem("lists",JSON.stringify(alllists));
        item.remove();
    });
    item.append(deletebtn);
    return item;
}
function generateRandomColor() {
    const letters='0123456789ABCDEF';
    let color='#';
    for(let i=0;i<6;i++){
        color +=letters[Math.floor(Math.random()*16)];
    }
    return color;
}
export default loadSidebar;
