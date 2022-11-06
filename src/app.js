
//login
const loginForm = document.querySelector(".login")
const loginInput = document.querySelector(".login-input")
const greeting = document.querySelector(".greeting")

//clock
const clock = document.querySelector("h2#clock");

const HIDDEN_CLASSNAME = "hidden"
const USERNAME_KEY = "username"


//clock
function getClock() {
  //Date obj생성
  const date = new Date();
  //호출할 당시 시간 출력
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}`;
}
getClock();
setInterval(getClock, 1000)


function handleToSubmit(e){
  e.preventDefault()
  loginForm.classList.add(HIDDEN_CLASSNAME)
  console.log(loginInput.value)
  const name = loginInput.value
  localStorage.setItem(USERNAME_KEY, name)
  paintGreeting(name)


}
//show the User
function paintGreeting(name) {
  greeting.innerText = `Hello ${name}`
  greeting.classList.remove(HIDDEN_CLASSNAME)
  clock.classList.remove(HIDDEN_CLASSNAME)
  toDoForm.classList.remove(HIDDEN_CLASSNAME)
}

//To-do list
const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");


const TODOS_KEY = "todos"

let toDos = []

function saveToDos() {
  //JSON.stringify() -> 괄호 안의 array, object or somethings 
  // string으로 바꿔줌
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)) //todos 값 중복가능 
}


function deleteToDo(event) {
  //event : click event에 대한 정보를 담고 있는 arguement
  //target : 클릭된 HTML element
  //parentElement : 클릭된 Element부모

  //console.log(event.target.parentElement);
  const li = event.target.parentElement
  li.remove()
  //console.log(event)
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
  
  
  //console.dir(event.target) <button>
  //console.dir(event.target.parentElement) <li>
  // PointEvent>path
  //이모지 : window + .
}

function paintToDo(newTodo) {
  const li = document.createElement("li")
  const span = document.createElement("span")
  //span에 arguement로 받아온 값을 할당
  // html의 li 내부요소로 추가
  const button = document.createElement("button")
  button.innerText = "👌"
  button.addEventListener("click", deleteToDo)
  //span을 li에 추가 (내부 요소로 만듦)
  li.appendChild(span)
  li.appendChild(button)
  span.innerText = newTodo
  toDoList.appendChild(li)
}


function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value
  toDoInput.value = ""
  toDos.push(newTodo)
  paintToDo(newTodo)
  saveToDos()
}

//weather 
// API call : https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// API KEY : 4aa8bd67abc0dab5acda952236656e8a
const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
const API_KEY = "4aa8bd67abc0dab5acda952236656e8a";




function onGeoOk(position) {
  const lat = position.coords.latitude
  const lon = position.coords.longitude
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}`
    })
}
function onGeoError() {
  alert("Can't find you. No weather for you.")
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)
//successcallback : 조건이 만족했을 때 실행되는 함수
//errorcallback : 만족 x -> 실행되는 함수


//API : 다른서버와 통신

//background
const images = ["0.jpg", "1.jpg", "2.webp"]


const chosenImage = images[Math.floor(Math.random() * images.length)]


// js에서 html 태그를 만듦
const bgImage = document.createElement("img")

//bgImage에서 src 클래스에 값을 할당
bgImage.src = `img/${chosenImage}`

//생성한 img를 body에 추가(맨 뒤)
document.body.appendChild(bgImage)

//prepend





const savedToDos = localStorage.getItem(TODOS_KEY)


// foreach : array 의 각 item들에 대해 함수를 실행

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos)
  toDos = parsedToDos
  parsedToDos.forEach(paintToDo)

  //console.log(parsedToDos);
  //arrow function 위 함수와 기능은 동일
  // parsedToDos.forEach((item) => console.log("this is the turn of ", item ));
  
  // function sayHello(item) {
  //   console.log("this is the turn of ", item)
  //}
}


const saveUserName = localStorage.getItem(USERNAME_KEY)

if (saveUserName === null) {
  loginForm.classList.remove(HIDDEN_CLASSNAME)
  loginForm.addEventListener("submit", handleToSubmit )
  // show the form
} else{
  paintGreeting(saveUserName)
  // show the greeting
}


loginForm.addEventListener("submit", handleToSubmit)
toDoForm.addEventListener("submit", handleToDoSubmit)