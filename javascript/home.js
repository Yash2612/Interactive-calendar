var dateObj = new Date();
month=dateObj.getMonth(),
            year=dateObj.getFullYear(),
            date=dateObj.getDate()
/*Building calender*/
monthName = {
            full: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            mmm: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        //name of the days
        dayName = {
            full: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            d: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            dd: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            ddd: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        };
function getCalendar() {

        var
            dateString,
            result = {},
            idx;
        result.year = year;
        result.month = month;
        result.date = date;

        //today
        result.today = {};
        dateString = dateObj.toString().split(" ");

        idx = dayName.ddd.indexOf(dateString[0]);
        result.today.dayIndex = idx;
        result.today.dayName = dateString[0];
        result.today.dayFullName = dayName.full[idx];

        idx = monthName.mmm.indexOf(dateString[1]);
        result.today.monthIndex = idx;
        result.today.monthName = dateString[1];
        result.today.monthNameFull = monthName.full[idx];

        result.today.date = dateObj.getDate();

        result.today.year = dateString[3];

        //get month-year first day
        dateObj.setDate(1);
        dateObj.setMonth(month);
        dateObj.setFullYear(year);
        dateString = dateObj.toString().split(" ");

        idx = dayName.ddd.indexOf(dateString[0]);
        result.firstDayIndex = idx;
        result.firstDayName = dateString[0];
        result.firstDayFullName = dayName.full[idx];

        idx = monthName.mmm.indexOf(dateString[1]);
        result.monthIndex = idx;
        result.monthName = dateString[1];
        result.monthNameFull = monthName.full[idx];

        //get total days for the month-year
        dateObj.setFullYear(year);
        dateObj.setMonth(month + 1);
        dateObj.setDate(0);
        result.totaldays = dateObj.getDate();

        return result;

    }
    function createMonthTable() {
        var
            table, tr, td,
            r, c, count
            ,data=getCalendar(),x;


            x=document.getElementById("month_name");
            x.innerHTML=data.monthNameFull;
            x=document.getElementById("year");
            x.innerHTML=data.year;
        count = 1;
        for(c=0;c<data.firstDayIndex;c=c+1)
        {
            var s="row1col"+c.toString();
            td = document.getElementById(s);
            td.setAttribute("class","day_inactive")
            td.innerHTML =" ";
        }
        for (c=data.firstDayIndex;c <= 6;c = c + 1) {
            var s="row1col"+c.toString();
            td = document.getElementById(s);
            td.innerHTML = count;
            td.setAttribute("class","day_active")
            if (data.today.date === count && data.today.monthIndex === data.monthIndex) {
                td.setAttribute("class", "day_selected");
            }
            count = count + 1;
        }
        for (r = 2; r <7; r = r + 1) {
            for (c = 0; c <= 6; c = c + 1) {
                var s="row"+r.toString()+"col"+c.toString();
                td = document.getElementById(s);
                if (count > data.totaldays) {
                    td.innerHTML=" ";
                    td.setAttribute("class","day_inactive")
                }
                else {
                    td.innerHTML = count;
                    td.setAttribute("class","day_active")
                    if (data.today.date === count && data.today.monthIndex === data.monthIndex) {
                    td.setAttribute("class", "day_selected");
                    }
                count = count + 1;}
            }
        }
    }
    createMonthTable();
var pr=document.getElementById("prev"),nx=document.getElementById("next");
pr.addEventListener("click",function()
{
    month = month - 1;
    if (month < 0) {
    year = year - 1;
    month = 11;
    date=1;
    }
    createMonthTable();
});
nx.addEventListener("click",function()
{
    month = month + 1;
    if (month > 11) {
    year = year + 1;
    month = 0;
    date=1;
    }
    createMonthTable();
});
