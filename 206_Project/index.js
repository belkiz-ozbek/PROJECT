/////////////////////// ERVA ////////////////////////
// Csv file içindeki data ları arraylere okuyoruz
const classroom=[];
const busy = [];
const service = [];
const courses = [];

fetch('./classroom.csv')
  .then(response => response.text())
  .then(data => {
    // Split the CSV data into rows
    const rows = data.trim().split('\n');
    
    // Loop over the rows and split each one into cells
    rows.forEach(row => {
      const cells = row.split(';');
      classroom.push(cells);
    });
    
    console.log(classroom);     //console log olsa da olur olmasa da olur (sanırım)
  });
//
  fetch('./busy.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.trim().split('\n');
    
    rows.forEach(row => {
      const cells = row.split(';');
      busy.push(cells);
    });
    
    console.log(busy);
  });
//
  fetch('./service.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.trim().split('\n');
    
    rows.forEach(row => {
      const cells = row.split(';');
      service.push(cells);
    });
    
    console.log(service);
  });
//
  fetch('./Courses.csv')
  .then(response => response.text())
  .then(data => {
    
    const rows = data.trim().split('\n');
    
    rows.forEach(row => {
      const cells = row.split(';');
      courses.push(cells);
    });
    
    console.log(courses);
  });

///////////////////////////////////////
