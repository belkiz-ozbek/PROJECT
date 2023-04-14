/////////////////////// ERVA ////////////////////////
// Csv file içindeki data ları arraylere okuyoruz
const classroom={room:null,capacity:null,avaliable:0};
const busy = {instructor:null,day:null,time:null};
const service ={code:null,day:null,time:null};
const courses = {code:null,courseName:null,year:null,credit:null,c_e_state:null,d_c_state:null,num_of_Students:null,instructor:null};

var arrClassroom=[];
var arrBusy=[];
var arrService=[];
var arrCourses=[];

const DaysOfWeek = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
};

const TimePeriod= {
  morning: 1,
  afternon: 2,
};


fetch('./classroom.csv')
  .then(response => response.text())
  .then(data => {
    // Split the CSV data into rows
    const rows = data.trim().split('\n');
    let i=0;
    // Loop over the rows and split each one into cells
    rows.forEach(row => {

      const cells = row.split(';');
      classroom.room=cells[0];
      classroom.capacity=cells [1];
      classroom.avaliable=[];
      arrClassroom[i]=classroom;
      i++;
      
    });
    console.log(arrClassroom); 
        //console log olsa da olur olmasa da olur (sanırım)
  });
//
  fetch('./busy.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.trim().split('\n');
    i=0;
    rows.forEach(row => {
      const cells = row.split(';');
      busy.instructor=cells[0];
      busy.day=cells[1];
      busy.time=cells[2];
      arrBusy[i]=busy;
      i++;
    });
    
    console.log(arrBusy);
  });
//
  fetch('./service.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.trim().split('\n');
    i=0;
    rows.forEach(row => {
      const cells = row.split(';');
      service.code=cells[0];
      service.day=cells[1];
      service.time=cells[2];
      arrService[i]=service;
      i++;


    });
    
    console.log(arrService);
  });
//
  fetch('./Courses.csv')
  .then(response => response.text())
  .then(data => {
    
    const rows = data.trim().split('\n');
    i=0;
    rows.forEach(row => {
      const cells = row.split(';');
      courses.code=cells[0];
      courses.courseName=cells[1];
      courses.year=cells[2];
      courses.credit=cells[3];
      courses.c_e_state=cells[4];
      courses.d_c_state=cells[5];
      courses.num_of_Students=cells[6];
      courses.instructor=cells[7];
      arrCourses[i]=courses;
      i++;
    });
    
    console.log(arrCourses);
  });


function service(){


for(i=0;i<arrService.length;i++){
let index=DaysOfWeek.arrService[i].day*TimePeriod.arrService[i].time;




}

return ;

}







///////////////////////////////////////
