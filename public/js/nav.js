// activelink

let home = document.getElementById('home');
let about = document.getElementById('about');
let apply = document.getElementById('apply');
let status = document.getElementById('status');
let login = document.getElementById('login');

let url = window.location.href;
if(url.slice(21) === "/status"){
  home.classList.remove("activelink");
  about.classList.remove("activelink");
  apply.classList.remove("activelink");
  status.classList.add("activelink");
  login.classList.remove("activelink");
}else if(url.slice(21) === "/"){
  home.classList.add("activelink");
  about.classList.remove("activelink");
  apply.classList.remove("activelink");
  status.classList.remove("activelink");
  login.classList.remove("activelink");
}else if(url.slice(21) === "/about"){
  home.classList.remove("activelink");
  about.classList.add("activelink");
  apply.classList.remove("activelink");
  status.classList.remove("activelink");
  login.classList.remove("activelink");
}else if(url.slice(21) === "/apply"){
  home.classList.remove("activelink");
  about.classList.remove("activelink");
  apply.classList.add("activelink");
  status.classList.remove("activelink");
  login.classList.remove("activelink");
}

else{
  home.classList.remove("activelink");
  about.classList.remove("activelink");
  apply.classList.remove("activelink");
  status.classList.remove("activelink");
  login.classList.add("activelink");
}