const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector('.days');
const prevNext = document.querySelectorAll(".icons span");

let date=new Date(),
currYear=date.getFullYear(),
currMonth=date.getMonth();

const months = ["January","February","March","April","May","June","July",
                    "August","September","Octorber","November","December"];

const renderCalendar=()=>{
    let firstDayofTheMonth = new Date(currYear,currMonth,1).getDay();//2.
    let lastDateofTheMonth = new Date(currYear,currMonth+1,0).getDate();//1.last date of current month
    let lastDayofTheMonth = new Date(currYear,currMonth,lastDateofTheMonth).getDay();//4.last day of current month
    let lastDateofLastMonth = new Date(currYear,currMonth,0).getDate();//3.last date of last month
    let liTag="";

    for(let i=firstDayofTheMonth;i>0;i--){ //2,3.li of previous months last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i+1}</li>`;
    }

    for(let i=1;i<=lastDateofTheMonth;i++){//1.li of all days of current month
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                    && currYear === new Date().getFullYear() ? "active": "";
        liTag += `<li class="${isToday}">${i}</li>`
    }

    for(let i=lastDayofTheMonth; i<6;i++){ // 4. li of next month first days
        liTag += `<li class="inactive">${i-lastDayofTheMonth +1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;

}

renderCalendar();

prevNext.forEach(icon =>{ 
    icon.addEventListener("click",()=>{
        currMonth = icon.id === "prev" ? currMonth-1:currMonth+1;

        if(currMonth < 0 || currMonth>11){
            //creating a new date of current year and month and passing it as date value
            date = new Date(currYear,currMonth);
            currYear = date.getFullYear();//update current year with new date year
            currMonth=date.getMonth();
        }else{ // else pass new date as date value
            date=new Date();
        }
        renderCalendar();
    })
})
