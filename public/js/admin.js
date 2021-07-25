
const table = document.querySelector("tbody");
for(const row of table.rows){
  // console.log(row);
  for(const cell of row.cells){
    // console.log(cell.innerText);
    if(cell.innerText ==="Selected"){
      row.style.backgroundColor = '#40B310';
      
    }else if(cell.innerText ==="Rejected"){
      row.style.backgroundColor = '#F33737';
      row.style.color ='white';
      
    // }else{
    //   // row.style.backgroundColor ='#F9E79C';
    // }
  }
  
}
}







