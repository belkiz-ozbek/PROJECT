const first_year = [
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
];

const second_year = [
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
];

const third_year = [
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
];

const fourth_year = [
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
  { lecture: "", class: "", name: "", inst: "", akts: "" },
];

var arrClassroom = [];
var arrBusy = [];
var arrService = [];
var arrCourses = [];
var i, k, j, a, temp, d, n, m;

var arrBusyDay = [];
var arrBusyTime = [];
var indexBusy = 0;
var arrCompare = [];

const DaysOfWeek = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
};

const TimePeriod = {
  Morning: 0,
  Afternoon: 1,
};

fetch("./classroom.csv")
  .then((response) => response.text())
  .then((data) => {
    // Split the CSV data into rows
    const rows = data.trim().split("\r\n");
    let i = 0;
    // Loop over the rows and split each one into cells
    rows.forEach((row) => {
      let classroom = { room: null, capacity: null, avaliable: 0 };
      const cells = row.split(";");
      classroom.room = cells[0];
      classroom.capacity = cells[1];
      classroom.avaliable = [
        [undefined, undefined],
        [undefined, undefined],
        [undefined, undefined],
        [undefined, undefined],
        [undefined, undefined],
      ];
      arrClassroom[i] = classroom;
      i++;
    });
    for (i = 0; i < arrClassroom.length; i++) {
      for (j = 0; j < arrClassroom.length - i - 1; j++) {
        if (
          parseInt(arrClassroom[j].capacity) >
          parseInt(arrClassroom[j + 1].capacity)
        ) {
          temp = arrClassroom[j];
          arrClassroom[j] = arrClassroom[j + 1];
          arrClassroom[j + 1] = temp;
        }
      }
    }
  });

//
fetch("./busy.csv")
  .then((response) => response.text())
  .then((data) => {
    const rows = data.trim().split("\r\n");
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
  });
//
fetch("./service.csv")
  .then((response) => response.text())
  .then((data) => {
    const rows = data.trim().split("\r\n");
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
  });
//
fetch("./Courses.csv")
  .then((response) => response.text())
  .then((data) => {
    const rows = data.trim().split("\r\n");
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

    console.log(arrClassroom);

    //zorunlu ders yerleştirme
    for (k = 0; k < arrService.length; k++) {
      for (i = 0; i < arrCourses.length; i++) {
        if (arrService[k].code == arrCourses[i].code) {
          for (j = 0; j < arrClassroom.length; j++) {
            if (
              parseInt(arrClassroom[j].capacity) >
              parseInt(arrCourses[i].num_of_Students)
            ) {
              if (
                arrClassroom[j].avaliable[DaysOfWeek[arrService[k].day]][
                  TimePeriod[arrService[k].time]
                ] != undefined
              )
                alert("add class");
              else
                arrClassroom[j].avaliable[DaysOfWeek[arrService[k].day]][
                  TimePeriod[arrService[k].time]
                ] = arrCourses[i];

              if (i !== -1) arrCourses.splice(i, 1);
              break;
            }
          }
        }
      }
    }

    console.log(arrCourses);

    console.log(arrClassroom);

    for (m = 0; m < arrCourses.length; m++) {
      indexBusy = 0; // busy arraylarinin indexini sifirdan baslar
      arrBusyDay = []; //busy arraylerini bir sonraki islem icin bosalt
      arrBusyTime = [];
      console.log(m);
      console.log(arrCourses);

      for (j = 0; j < arrClassroom.length; j++) {
        console.log(parseInt(arrClassroom[j].capacity));
        console.log(parseInt(arrCourses[m].num_of_Students));
        if (
          parseInt(arrClassroom[j].capacity) >
          parseInt(arrCourses[m].num_of_Students)
        ) {
          console.log(arrCourses[m]);
          for (k = 0; k < arrBusy.length; k++) {
            /// is instructer busy
            console.log(arrBusy[k].instructor);
            console.log(arrCourses[m].instructor);

            if (arrBusy[k].instructor == arrCourses[m].instructor) {
              // hocanin mesgul oldugu gunleri ve zamanalari al

              arrBusyDay[indexBusy] = DaysOfWeek[arrBusy[k].day];
              arrBusyTime[indexBusy] = TimePeriod[arrBusy[k].time];
              indexBusy++;
            }
          } //atama islemini yap

          console.log(arrBusyDay);
          console.log(arrBusyTime);

          tempj = j;
          console.log(j); // class index

          while (tempj < arrClassroom.length) {
            if (classIsFull(tempj, m)) {
              break;
            }
            tempj++;
            if (tempj == arrClassroom.length) {
              alert("add class");
            }
          }

          break;
        }
      }

    }

    console.log(arrClassroom);

    function classIsFull(classIndex, courseIndex) {
      let avaibleDay = 0;
      let avaibleTime = 0;

      for (i = 0; i < 10; i++) {
        /// arrClassroom[classIndex].avaliable.length =10
        if (avaibleDay > 4) {
          avaibleDay = 0;
          avaibleTime = 1;
        } // bos gun ve bos zamani bulmak icin

        console.log(avaibleDay);
        console.log(avaibleTime);
        console.log(arrClassroom[classIndex]);

        if (
          arrClassroom[classIndex].avaliable[avaibleDay][avaibleTime] ==
          undefined
        ) {
          // clasin bos oldugu zamna ve bos oldugu gunu buluyoruz

          /* !!!!!*/ if (arrBusyDay.length !== 0) {
            for (day = 0; day < arrBusyDay.length; day++) {
              // mesgul olan gunu bulmak icin tum gunlere bakiyoruz
              console.log(arrBusyDay[day]);
              console.log(arrBusyTime[day]);
              if (
                (avaibleDay == arrBusyDay[day] &&
                  avaibleTime != arrBusyTime[day]) ||
                (avaibleDay != arrBusyDay[day] &&
                  avaibleTime == arrBusyTime[day]) ||
                (avaibleDay != arrBusyDay[day] &&
                  avaibleTime != arrBusyTime[day])
              ) {
                // bos gun vse zaman hocanin bos gun ve zamanina esit mi ona bakiyoruz

                for (a = 0; a < arrClassroom.length; a++) {
                  let counter = 0;
                  // diger claslari gez
                  if (
                    arrClassroom[a] != undefined &&
                    arrClassroom[a].avaliable[avaibleDay][avaibleTime] !=
                      undefined
                  ) {
                    if (
                      /* !!!!! arr clasroom tanimlimi kontrolu */ arrClassroom[
                        a
                      ].avaliable[avaibleDay][avaibleTime].instructor == // diger siniflarda o zaman diliminde hocanin dersi yoksa
                        arrCourses[courseIndex].instructor || //ve
                      parseInt(
                        arrClassroom[a].avaliable[avaibleDay][avaibleTime].year
                      ) == // diger siniflarda o zaman diliminde ayni sinifin dersi yoksa
                        parseInt(arrCourses[courseIndex].year)
                    ) {
                      counter++;
                    }
                    if (counter == 0) {
                      console.log(avaibleDay);
                      console.log(avaibleTime);
                      console.log(classIndex);
                      arrClassroom[classIndex].avaliable[avaibleDay][
                        avaibleTime
                      ] = arrCourses[courseIndex];

                      return 1;

                      /// atama
                    }
                  } else {
                    console.log(avaibleDay);
                    console.log(avaibleTime);
                    console.log(classIndex);
                    arrClassroom[classIndex].avaliable[avaibleDay][
                      avaibleTime
                    ] = arrCourses[courseIndex];

                    return 1;

                    /// atama
                  }
                }
              }
            }
          } else {
            for (a = 0; a < arrClassroom.length; a++) {
              let counter = 0;
              // diger claslari gez
              if (
                arrClassroom[a] != undefined &&
                arrClassroom[a].avaliable[avaibleDay][avaibleTime] != undefined
              ) {
                if (
                  /* !!!!! arr clasroom tanimlimi kontrolu */ arrClassroom[a]
                    .avaliable[avaibleDay][avaibleTime].instructor == // diger siniflarda o zaman diliminde hocanin dersi yoksa
                    arrCourses[courseIndex].instructor || //ve
                  parseInt(
                    arrClassroom[a].avaliable[avaibleDay][avaibleTime].year
                  ) == // diger siniflarda o zaman diliminde ayni sinifin dersi yoksa
                    parseInt(arrCourses[courseIndex].year)
                ) {
                  counter++;
                }
                if (counter == 0) {
                  console.log(avaibleDay);
                  console.log(avaibleTime);
                  console.log(classIndex);
                  arrClassroom[classIndex].avaliable[avaibleDay][avaibleTime] =
                    arrCourses[courseIndex];

                  return 1;

                  /// atama
                }
              } else {
                console.log(avaibleDay);
                console.log(avaibleTime);
                console.log(classIndex);
                arrClassroom[classIndex].avaliable[avaibleDay][avaibleTime] =
                  arrCourses[courseIndex];

                return 1;

                /// atama
              }
            }
          }
        }
        avaibleDay++;
      }

      return 0;
    }

    var yearday = 0;
    for (let oo = 0; oo < arrClassroom.length; oo++) {
      let olday = 0;
      let oltime = 0;

      for (i = 0; i < 10; i++) {
        if (olday > 4) {
          olday = 0;
          oltime = 1;
        } // bos gun ve bos zamani bulmak icin
        if (arrClassroom[oo].avaliable[olday][oltime] != undefined)
          if (arrClassroom[oo].avaliable[olday][oltime].year == 1) {
            first_year[yearday].lecture =
              arrClassroom[oo].avaliable[olday][oltime].code;
            first_year[yearday].name =
              arrClassroom[oo].avaliable[olday][oltime].courseName;
            first_year[yearday].akts =
              arrClassroom[oo].avaliable[olday][oltime].credit;
            first_year[yearday].inst =
              arrClassroom[oo].avaliable[olday][oltime].instructor;
            first_year[yearday].class = arrClassroom[oo].room;
            yearday++;
          }
        olday++;
      }
    }
    console.log(first_year);
    firstYear(first_year);

    yearday = 0;
    for (let oo = 0; oo < arrClassroom.length; oo++) {
      let olday = 0;
      let oltime = 0;

      for (i = 0; i < 10; i++) {
        if (olday > 4) {
          olday = 0;
          oltime = 1;
        } // bos gun ve bos zamani bulmak icin
        if (arrClassroom[oo].avaliable[olday][oltime] != undefined)
          if (arrClassroom[oo].avaliable[olday][oltime].year == 2) {
            second_year[yearday].lecture =
              arrClassroom[oo].avaliable[olday][oltime].code;
            second_year[yearday].akts =
              arrClassroom[oo].avaliable[olday][oltime].credit;
            second_year[yearday].name =
              arrClassroom[oo].avaliable[olday][oltime].courseName;
            second_year[yearday].inst =
              arrClassroom[oo].avaliable[olday][oltime].instructor;
            second_year[yearday].class = arrClassroom[oo].room;

            yearday++;
          }
        olday++;
      }
    }
    console.log(second_year);
    secondYear(second_year);

    yearday = 0;
    for (let oo = 0; oo < arrClassroom.length; oo++) {
      let olday = 0;
      let oltime = 0;

      for (i = 0; i < 10; i++) {
        if (olday > 4) {
          olday = 0;
          oltime = 1;
        } // bos gun ve bos zamani bulmak icin
        if (arrClassroom[oo].avaliable[olday][oltime] != undefined)
          if (arrClassroom[oo].avaliable[olday][oltime].year == 3) {
            third_year[yearday].lecture =
              arrClassroom[oo].avaliable[olday][oltime].code;
            third_year[yearday].akts =
              arrClassroom[oo].avaliable[olday][oltime].credit;
            third_year[yearday].name =
              arrClassroom[oo].avaliable[olday][oltime].courseName;
            third_year[yearday].inst =
              arrClassroom[oo].avaliable[olday][oltime].instructor;
            third_year[yearday].class = arrClassroom[oo].room;
            yearday++;
          }
        olday++;
      }
    }
    console.log(third_year);
    thirdYear(third_year);

    yearday = 0;
    for (let oo = 0; oo < arrClassroom.length; oo++) {
      let olday = 0;
      let oltime = 0;

      for (i = 0; i < 10; i++) {
        if (olday > 4) {
          olday = 0;
          oltime = 1;
        } // bos gun ve bos zamani bulmak icin
        if (arrClassroom[oo].avaliable[olday][oltime] != undefined)
          if (arrClassroom[oo].avaliable[olday][oltime].year == 4) {
            fourth_year[yearday].lecture =
              arrClassroom[oo].avaliable[olday][oltime].code;
            fourth_year[yearday].akts =
              arrClassroom[oo].avaliable[olday][oltime].credit;
            fourth_year[yearday].name =
              arrClassroom[oo].avaliable[olday][oltime].courseName;
            fourth_year[yearday].inst =
              arrClassroom[oo].avaliable[olday][oltime].instructor;
            fourth_year[yearday].class = arrClassroom[oo].room;
            yearday++;
          }
        olday++;
      }
    }
    console.log(fourth_year);
    fourthYear(fourth_year);

    for (er = 0; er < 10; er++) {
      if (first_year[er].lecture != "") {
        document.getElementsByTagName("div")[er + 2].style.zIndex = "5";
      }
      if (second_year[er].lecture != "") {
        document.getElementsByTagName("div")[er + 13].style.zIndex = "5";
      }
      if (third_year[er].lecture != "") {
        document.getElementsByTagName("div")[er + 24].style.zIndex = "5";
      }
      if (fourth_year[er].lecture != "") {
        document.getElementsByTagName("div")[er + 35].style.zIndex = "5";
      }
    }
  });

function firstYear(data) {
  var table = document.getElementById("first-year");

  {
    var row = `<tr>
    <td>Morning</td>
     <td> ${data[0].lecture}
        <div class="info">
            <p><i class="fa-solid fa-book-open"></i>: <span> ${data[0].name} </span></p>
            <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[0].inst}</span></p>
            <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[0].akts}</span></p>
        </div>
    </td>
    <td>${data[0].class}</td>
    <td> ${data[1].lecture}
        <div class="info">
            <p><i class="fa-solid fa-book-open"></i>: <span> ${data[1].name} </span></p>
            <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[1].inst}</span></p>
            <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[1].akts}</span></p>
        </div>
    </td>
    <td>${data[1].class}</td>
    <td> ${data[2].lecture}
        <div class="info">
            <p><i class="fa-solid fa-book-open"></i>: <span> ${data[2].name} </span></p>
            <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[2].inst}</span></p>
            <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[2].akts}</span></p>
        </div>
    </td>
    <td>${data[2].class}</td>
    <td> ${data[3].lecture}
        <div class="info">
            <p><i class="fa-solid fa-book-open"></i>: <span> ${data[3].name} </span></p>
            <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[3].inst}</span></p>
            <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[3].akts}</span></p>
        </div>
    </td>
    <td>${data[3].class}</td>
    <td> ${data[4].lecture}
        <div class="info">
          <p><i class="fa-solid fa-book-open"></i>: <span> ${data[4].name} </span></p>
          <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[4].inst}</span></p>
          <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[4].akts}</span></p>
        </div>
    </td>
    <td>${data[4].class}</td>
  </tr>
  <tr><td class="break" colspan="11">Break</td></tr>`;

    table.innerHTML += row;
  }

  {
    var row = `<tr>
    <td>Afternoon</td>
    <td> ${data[5].lecture}
    <div class="info">
        <p><i class="fa-solid fa-book-open"></i>: <span> ${data[5].name} </span></p>
        <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[5].inst}</span></p>
        <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[5].akts}</span></p>
    </div>
</td>
<td>${data[5].class}</td>
<td> ${data[6].lecture}
    <div class="info">
        <p><i class="fa-solid fa-book-open"></i>: <span> ${data[6].name} </span></p>
        <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[6].inst}</span></p>
        <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[6].akts}</span></p>
    </div>
</td>
<td>${data[6].class}</td>
<td> ${data[7].lecture}
    <div class="info">
        <p><i class="fa-solid fa-book-open"></i>: <span> ${data[7].name} </span></p>
        <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[7].inst}</span></p>
        <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[7].akts}</span></p>
    </div>
</td>
<td>${data[7].class}</td>
<td> ${data[8].lecture}
    <div class="info">
        <p><i class="fa-solid fa-book-open"></i>: <span> ${data[8].name} </span></p>
        <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[8].inst}</span></p>
        <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[8].akts}</span></p>
    </div>
</td>
<td>${data[8].class}</td>
<td> ${data[9].lecture}
    <div class="info">
      <p><i class="fa-solid fa-book-open"></i>: <span> ${data[9].name} </span></p>
      <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[9].inst}</span></p>
      <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[9].akts}</span></p>
    </div>
</td>
<td>${data[9].class}</td>
  </tr>`;

    table.innerHTML += row;
  }
}

function secondYear(data) {
  var table = document.getElementById("second-year");

  {
    var row = `<tr>
    <td>Morning</td>
     <td> ${data[0].lecture}
        <div class="info">
            <p><i class="fa-solid fa-book-open"></i>: <span> ${data[0].name} </span></p>
            <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[0].inst}</span></p>
            <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[0].akts}</span></p>
        </div>
    </td>
    <td>${data[0].class}</td>
    <td> ${data[1].lecture}
        <div class="info">
            <p><i class="fa-solid fa-book-open"></i>: <span> ${data[1].name} </span></p>
            <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[1].inst}</span></p>
            <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[1].akts}</span></p>
        </div>
    </td>
    <td>${data[1].class}</td>
    <td> ${data[2].lecture}
        <div class="info">
            <p><i class="fa-solid fa-book-open"></i>: <span> ${data[2].name} </span></p>
            <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[2].inst}</span></p>
            <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[2].akts}</span></p>
        </div>
    </td>
    <td>${data[2].class}</td>
    <td> ${data[3].lecture}
        <div class="info">
            <p><i class="fa-solid fa-book-open"></i>: <span> ${data[3].name} </span></p>
            <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[3].inst}</span></p>
            <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[3].akts}</span></p>
        </div>
    </td>
    <td>${data[3].class}</td>
    <td> ${data[4].lecture}
        <div class="info">
          <p><i class="fa-solid fa-book-open"></i>: <span> ${data[4].name} </span></p>
          <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[4].inst}</span></p>
          <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[4].akts}</span></p>
        </div>
    </td>
    <td>${data[4].class}</td>
  </tr>
  <tr><td class="break" colspan="11">Break</td></tr>`;
    table.innerHTML += row;
  }

  {
    var row = `<tr>
    <td>Afternoon</td>
    <td> ${data[5].lecture}
    <div class="info">
        <p><i class="fa-solid fa-book-open"></i>: <span> ${data[5].name} </span></p>
        <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[5].inst}</span></p>
        <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[5].akts}</span></p>
    </div>
</td>
<td>${data[5].class}</td>
<td> ${data[6].lecture}
    <div class="info">
        <p><i class="fa-solid fa-book-open"></i>: <span> ${data[6].name} </span></p>
        <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[6].inst}</span></p>
        <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[6].akts}</span></p>
    </div>
</td>
<td>${data[6].class}</td>
<td> ${data[7].lecture}
    <div class="info">
        <p><i class="fa-solid fa-book-open"></i>: <span> ${data[7].name} </span></p>
        <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[7].inst}</span></p>
        <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[7].akts}</span></p>
    </div>
</td>
<td>${data[7].class}</td>
<td> ${data[8].lecture}
    <div class="info">
        <p><i class="fa-solid fa-book-open"></i>: <span> ${data[8].name} </span></p>
        <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[8].inst}</span></p>
        <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[8].akts}</span></p>
    </div>
</td>
<td>${data[8].class}</td>
<td> ${data[9].lecture}
    <div class="info">
      <p><i class="fa-solid fa-book-open"></i>: <span> ${data[9].name} </span></p>
      <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[9].inst}</span></p>
      <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[9].akts}</span></p>
    </div>
</td>
<td>${data[9].class}</td>
  </tr>`;

    table.innerHTML += row;
  }
}

function thirdYear(data) {
  var table = document.getElementById("third-year");

  {
    var row = `<tr>
    <td>Morning</td>
     <td> ${data[0].lecture}
        <div class="info">
            <p><i class="fa-solid fa-book-open"></i>: <span> ${data[0].name} </span></p>
            <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[0].inst}</span></p>
            <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[0].akts}</span></p>
        </div>
    </td>
    <td>${data[0].class}</td>
    <td> ${data[1].lecture}
        <div class="info">
            <p><i class="fa-solid fa-book-open"></i>: <span> ${data[1].name} </span></p>
            <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[1].inst}</span></p>
            <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[1].akts}</span></p>
        </div>
    </td>
    <td>${data[1].class}</td>
    <td> ${data[2].lecture}
        <div class="info">
            <p><i class="fa-solid fa-book-open"></i>: <span> ${data[2].name} </span></p>
            <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[2].inst}</span></p>
            <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[2].akts}</span></p>
        </div>
    </td>
    <td>${data[2].class}</td>
    <td> ${data[3].lecture}
        <div class="info">
            <p><i class="fa-solid fa-book-open"></i>: <span> ${data[3].name} </span></p>
            <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[3].inst}</span></p>
            <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[3].akts}</span></p>
        </div>
    </td>
    <td>${data[3].class}</td>
    <td> ${data[4].lecture}
        <div class="info">
          <p><i class="fa-solid fa-book-open"></i>: <span> ${data[4].name} </span></p>
          <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[4].inst}</span></p>
          <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[4].akts}</span></p>
        </div>
    </td>
    <td>${data[4].class}</td>
  </tr>
  <tr><td class="break" colspan="11">Break</td></tr>`;
    table.innerHTML += row;
  }

  {
    var row = `<tr>
    <td>Afternoon</td>
    <td> ${data[5].lecture}
    <div class="info">
        <p><i class="fa-solid fa-book-open"></i>: <span> ${data[5].name} </span></p>
        <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[5].inst}</span></p>
        <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[5].akts}</span></p>
    </div>
</td>
<td>${data[5].class}</td>
<td> ${data[6].lecture}
    <div class="info">
        <p><i class="fa-solid fa-book-open"></i>: <span> ${data[6].name} </span></p>
        <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[6].inst}</span></p>
        <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[6].akts}</span></p>
    </div>
</td>
<td>${data[6].class}</td>
<td> ${data[7].lecture}
    <div class="info">
        <p><i class="fa-solid fa-book-open"></i>: <span> ${data[7].name} </span></p>
        <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[7].inst}</span></p>
        <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[7].akts}</span></p>
    </div>
</td>
<td>${data[7].class}</td>
<td> ${data[8].lecture}
    <div class="info">
        <p><i class="fa-solid fa-book-open"></i>: <span> ${data[8].name} </span></p>
        <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[8].inst}</span></p>
        <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[8].akts}</span></p>
    </div>
</td>
<td>${data[8].class}</td>
<td> ${data[9].lecture}
    <div class="info">
      <p><i class="fa-solid fa-book-open"></i>: <span> ${data[9].name} </span></p>
      <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[9].inst}</span></p>
      <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[9].akts}</span></p>
    </div>
</td>
<td>${data[9].class}</td>
  </tr>`;

    table.innerHTML += row;
  }
}

function fourthYear(data) {
  var table = document.getElementById("fourth-year");

  {
    var row = `<tr>
    <td>Morning</td>
     <td> ${data[0].lecture}
        <div class="info">
            <p><i class="fa-solid fa-book-open"></i>: <span> ${data[0].name} </span></p>
            <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[0].inst}</span></p>
            <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[0].akts}</span></p>
        </div>
    </td>
    <td>${data[0].class}</td>
    <td> ${data[1].lecture}
        <div class="info">
            <p><i class="fa-solid fa-book-open"></i>: <span> ${data[1].name} </span></p>
            <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[1].inst}</span></p>
            <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[1].akts}</span></p>
        </div>
    </td>
    <td>${data[1].class}</td>
    <td> ${data[2].lecture}
        <div class="info">
            <p><i class="fa-solid fa-book-open"></i>: <span> ${data[2].name} </span></p>
            <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[2].inst}</span></p>
            <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[2].akts}</span></p>
        </div>
    </td>
    <td>${data[2].class}</td>
    <td> ${data[3].lecture}
        <div class="info">
            <p><i class="fa-solid fa-book-open"></i>: <span> ${data[3].name} </span></p>
            <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[3].inst}</span></p>
            <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[3].akts}</span></p>
        </div>
    </td>
    <td>${data[3].class}</td>
    <td> ${data[4].lecture}
        <div class="info">
          <p><i class="fa-solid fa-book-open"></i>: <span> ${data[4].name} </span></p>
          <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[4].inst}</span></p>
          <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[4].akts}</span></p>
        </div>
    </td>
    <td>${data[4].class}</td>
  </tr>
  <tr><td class="break" colspan="11">Break</td></tr>`;
    table.innerHTML += row;
  }
  {
    var row = `<tr>
    <td>Afternoon</td>
    <td> ${data[5].lecture}
    <div class="info">
        <p><i class="fa-solid fa-book-open"></i>: <span> ${data[5].name} </span></p>
        <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[5].inst}</span></p>
        <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[5].akts}</span></p>
    </div>
</td>
<td>${data[5].class}</td>
<td> ${data[6].lecture}
    <div class="info">
        <p><i class="fa-solid fa-book-open"></i>: <span> ${data[6].name} </span></p>
        <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[6].inst}</span></p>
        <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[6].akts}</span></p>
    </div>
</td>
<td>${data[6].class}</td>
<td> ${data[7].lecture}
    <div class="info">
        <p><i class="fa-solid fa-book-open"></i>: <span> ${data[7].name} </span></p>
        <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[7].inst}</span></p>
        <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[7].akts}</span></p>
    </div>
</td>
<td>${data[7].class}</td>
<td> ${data[8].lecture}
    <div class="info">
        <p><i class="fa-solid fa-book-open"></i>: <span> ${data[8].name} </span></p>
        <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[8].inst}</span></p>
        <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[8].akts}</span></p>
    </div>
</td>
<td>${data[8].class}</td>
<td> ${data[9].lecture}
    <div class="info">
      <p><i class="fa-solid fa-book-open"></i>: <span> ${data[9].name} </span></p>
      <p><i class="fa-solid fa-graduation-cap"></i>: <span>${data[9].inst}</span></p>
      <p><i class="fa-solid fa-coins"></i> Akts: <span>${data[9].akts}</span></p>
    </div>
</td>
<td>${data[9].class}</td>
  </tr>`;

    table.innerHTML += row;
  }
}
