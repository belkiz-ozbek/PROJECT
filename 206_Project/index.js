/////////////////////// ERVA ////////////////////////
// Csv file içindeki data ları arraylere okuyoruz
//var classroom={room:null,capacity:null,avaliable:0};
//var busy = {instructor:null,day:null,time:null};
// var service ={code:null,day:null,time:null};
//var courses = {code:null,courseName:null,year:null,credit:null,c_e_state:null,d_c_state:null,num_of_Students:null,instructor:null};

var arrClassroom = [];
var arrBusy = [];
var arrService = [];
var arrCourses = [];
var i, k, j, a, temp;

const DaysOfWeek = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
};

const TimePeriod = {
  morning: 1,
  afternon: 2,
};

fetch("./classroom.csv")
  .then((response) => response.text())
  .then((data) => {
    // Split the CSV data into rows
    const rows = data.trim().split("\n");
    let i = 0;
    // Loop over the rows and split each one into cells
    rows.forEach((row) => {
      let classroom = { room: null, capacity: null, avaliable: 0 };
      const cells = row.split(";");
      classroom.room = cells[0];
      classroom.capacity = cells[1];
      classroom.avaliable = [[]];
      arrClassroom[i] = classroom;
      i++;
    });
    console.log(arrClassroom);
  });

for (i = 0; i < arrClassroom.length; i++) {
  //Sorulacak!!!!!!!!!!!
  for (j = 0; j < arrClassroom.length - i - 1; j++) {
    if (arrClassroom[j].capacity > arrClassroom[j + 1].capacity) {
      temp = arrClassroom[j];
      arrClassroom[j] = arrClassroom[j + 1];
      arrClassroom[j + 1] = temp;
    }
  }
}

//
fetch("./busy.csv")
  .then((response) => response.text())
  .then((data) => {
    const rows = data.trim().split("\n");
    i = 0;
    rows.forEach((row) => {
      let busy = { instructor: null, day: null, time: null };
      const cells = row.split(";");
      busy.instructor = cells[0];
      busy.day = cells[1];
      busy.time = cells[2];
      arrBusy[i] = busy;
      i++;
    });

    console.log(arrBusy);
  });
//
fetch("./service.csv")
  .then((response) => response.text())
  .then((data) => {
    const rows = data.trim().split("\n");
    i = 0;
    rows.forEach((row) => {
      let service = { code: null, day: null, time: null };
      const cells = row.split(";");
      service.code = cells[0];
      service.day = cells[1];
      service.time = cells[2];
      arrService[i] = service;
      i++;
    });

    console.log(arrService);
  });
//
fetch("./Courses.csv")
  .then((response) => response.text())
  .then((data) => {
    const rows = data.trim().split("\n");
    i = 0;
    rows.forEach((row) => {
      let courses = {
        code: null,
        courseName: null,
        year: null,
        credit: null,
        c_e_state: null,
        d_c_state: null,
        num_of_Students: null,
        instructor: null,
      };
      const cells = row.split(";");
      courses.code = cells[0];
      courses.courseName = cells[1];
      courses.year = cells[2];
      courses.credit = cells[3];
      courses.c_e_state = cells[4];
      courses.d_c_state = cells[5];
      courses.num_of_Students = cells[6];
      courses.instructor = cells[7];
      arrCourses[i] = courses;
      i++;
    });

    console.log(arrCourses);
  });

for (k = 0; k < arrService.length; k++) {
  //zorunlu ders yerleştirme
  for (i = 0; i < arrCourses.length; i++) {
    if (arrService[k].code == arrCourses[i].code) {
      //var index=(DaysOfWeek.arrService[k].day)*(TimePeriod.arrService[i].time)-1;

      for (j = 0; j < arrClassroom.length; j++) {
        if (arrClassroom[j].capacity > arrCourses[i].capacity) {
          arrClassroom[j].avaliable[DaysOfWeek.arrService[k].day][
            TimePeriod.arrService[i].time
          ] = arrCourses[i];
        }
      }

      for (j = i; j < arrCourses.length; j++) {
        arrCourses[j] = arrCourses[j + 1];
      }
    }
  }
}

var arrBusyDay = [];
var arrBusyTime = [];
var indexBusy = 0;

for (i = 0; i < arrCourses.length; i++) {
  
  for (n = 0; day < arrBusyDay.length; day++) {  //busy arraylerini bir sonraki islem icin bosalt
            arrBusyDay[n]= undefined; 
            arrBusyTime[n]=undefined; }
            indexBusy = 0;  // busy arraylarinin indexini sifirdan baslar

  for (j = 0; j < arrClassroom.length; j++) {
    if (arrClassroom[j].capacity > arrCourses[i].capacity) {

      for (k = 0; i < arrBusy.length; i++) {      /// is instructer busy
        if (arrBusy[k].instructor == arrCourses[i].instructor) { // hocanin mesgul oldugu gunleri ve zamanalari al
          arrBusyDay[indexBusy] = arrBusy[k].DaysOfWeek.day;
          arrBusyTime[indexBusy] = arrBusy[k].DaysOfWeek.time;
          indexBusy++;          
        }
      }//atama islemini yap
    tempj = j;
    while (!classIsFull(tempj,i)){  /// eger sinif doluysa ve ya uygun zamana yoksa ust sinifa cik ve orada atamayi dene 
      tempj++;
      if (tempj <  arrClassroom.length) {classIsFull(tempj , i  ); } 
      else {alert("add class ");  } // uygun sinif yoksa hata ver
    }
    }
  }
}






function classIsFull(classIndex, courseIndex ) {
  let avaibleDay = 0,
    avaibleTime = 0;
  for (i = 0; i < arrClassroom[classIndex].avaliable.length; i++) { /// 
    if (avaibleDay > 4) {  avaibleDay = 0;  avaibleTime++; }// bos gun ve bos zamani bulmak icin 

    if (arrClassroom[classIndex].avaliable[avaibleDay][avaibleTime] == undefined) { // clasin bos oldugu zamna ve bos oldugu gunu buluyoruz
      
      
      for (day = 0; day < arrBusyDay.length; day++) {   // mesgul olan gunu bulmak icin tum gunlere bakiyoruz
        for (time = 0; time < arrBusyTime.length; time++) { // zaman icin yapiyoruz
         
         
          if (avaibleDay != arrBusyDay[day] && avaibleTime != arrBusyTime[time]) { // bos gun ve zaman hocanin bos gun ve zamanina esit mi ona bakiyoruz
           
           
            for (a = 0; a < arrClassroom.length; a++) { // diger claslari gez
              if (  
                arrClassroom[a].avaliable[day][time].instructor !=  // diger siniflarda o zaman diliminde hocanin dersi yoksa 
                  arrCourses[courseIndex].instructor &&    //ve
                arrClassroom[a].avaliable[day][time].year  !=   // diger siniflarda o zaman diliminde ayni sinifin dersi yoksa 
                  arrCourses[courseIndex].year
              ) {
              
                arrClassroom[classIndex].avaliable[avaibleDay][avaibleTime] == arrCourses[courseIndex]; 
                return 1;
                
                /// atama 

              }
            }
          }
        }
      }
    }
    avaibleDay++;
  }
return 0;
}












/*



// random day ve time bul
function getRandomDay() {
  let random = Math.floor(Math.random() * 5);
  while ((random = DaysOfWeek.day)) random = Math.floor(Math.random() * 5);
  return random;
}

function getRandomTime() {
  let random = Math.floor(Math.random() * 2);
  while ((random = time)) random = Math.floor(Math.random() * 2);
  return random;
}

function atama(classIndex, courseIndex, day, time) {
  day = getRandomDay(day);
  time = getRandomTime(time);

  // avaible bos mu dolumu eklenecek
  for (a = 0; a < arrClassroom.length; a++) {
    while (
      arrClassroom[a].avaliable[day][time].instructor ==
        arrCourses[courseIndex].instructor ||
      arrClassroom[a].avaliable[day][time].year == arrCourses[courseIndex].year
    ) {
      let day = getRandomDay(day);
      let time = getRandomTime(time);
      a = -1;
    }
  }
  arrClassroom[classIndex].avaliable[day][time] = arrCourses[courseIndex];
}

*/

///Sıralama yapılamadı
///html e atama sorulacak
//arraydan silme
// cift boyutlu array
// indexleri sifirlama
