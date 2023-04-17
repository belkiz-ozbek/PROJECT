/////////////////////// ERVA ////////////////////////
// Csv file içindeki data ları arraylere okuyoruz
//var classroom={room:null,capacity:null,avaliable:0};
//var busy = {instructor:null,day:null,time:null};
// var service ={code:null,day:null,time:null};
//var courses = {code:null,courseName:null,year:null,credit:null,c_e_state:null,d_c_state:null,num_of_Students:null,instructor:null};

var arrClassroom=[];
var arrBusy=[];
var arrService=[];
var arrCourses=[];
var i, k, j, a, temp;

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
      let classroom={room:null,capacity:null,avaliable:0};
      const cells = row.split(';');
      classroom.room=cells[0];
      classroom.capacity=cells [1];
      classroom.avaliable=[[]];
      arrClassroom[i]=classroom;
      i++;
    });console.log(arrClassroom);
  });
   
  for(i=0; i<arrClassroom.length; i++){                       //Sorulacak!!!!!!!!!!!
    for(j=0; j<arrClassroom.length-i-1; j++){
        if(arrClassroom[j].capacity>arrClassroom[j+1].capacity){
            temp=arrClassroom[j];
            arrClassroom[j]=arrClassroom[j+1];
            arrClassroom[j+1]=temp;
        }
    }
}

//
  fetch('./busy.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.trim().split('\n');
    i=0;
    rows.forEach(row => {
      let busy = {instructor:null,day:null,time:null};
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
      let service ={code:null,day:null,time:null};
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
      let courses = {code:null,courseName:null,year:null,credit:null,c_e_state:null,d_c_state:null,num_of_Students:null,instructor:null};
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


function services(){
  
    for(k=0; k<arrService.length; k++){     //zorunlu ders yerleştirme
      for(i=0; i<arrCourses.length; i++){
        if(arrService[k].code==arrCourses[i].code){
         //var index=(DaysOfWeek.arrService[k].day)*(TimePeriod.arrService[i].time)-1;
         
          for(j=0; j<arrClassroom.length; j++){
            if(arrClassroom[j].capacity>arrCourses[i].capacity){
              arrClassroom[j].avaliable[DaysOfWeek.arrService[k].day][TimePeriod.arrService[i].time]=arrCourses[i];
            }
          }

          for(j=i; j<arrCourses.length; j++){
            arrCourses[j]=arrCourses[j+1];
          }
        }
      }
    }

    // for(i=0; i<arrCourses.length; i++){
    //   for(j=0; j<)
    // }

    return ;
}


///Sıralama yapılamadı
///html e atama sorulacak
