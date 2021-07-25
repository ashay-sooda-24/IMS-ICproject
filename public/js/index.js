
















var slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("pics");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    

  slides[slideIndex-1].style.display = "block"; 
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}


var check = function() {
  if (document.getElementById('password').value ==
    document.getElementById('cpassword').value) {
      document.getElementById('cpassword').classList.add('is-valid')
      document.getElementById('cpassword').classList.remove('is-invalid')
  } else {
    document.getElementById('cpassword').classList.remove('is-valid')
      document.getElementById('cpassword').classList.add('is-invalid')
  }
}



 





 



