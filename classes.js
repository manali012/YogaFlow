function showSection(id){
    let sections = document.querySelectorAll(".section");
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function goBack(){
    showSection("mainSection");
}

function goToBook(){

    if(localStorage.getItem("isLoggedIn") === "true"){
        window.location.href = "booking.html";
    } else {
        alert("Please login first to book a class!");
        window.location.href = "login.html";
    }

}

// function goToBook(className, price){

//     if(localStorage.getItem("isLoggedIn") === "true"){

//         localStorage.setItem("selectedClass", className);
//         localStorage.setItem("selectedPrice", price);

//         window.location.href = "booking.html";

//     } else {
//         alert("Please login first to book a class!");
//         window.location.href = "login.html";
//     }
// }
function goToBook(className, price) {
    if(localStorage.getItem("isLoggedIn") === "true") {
        localStorage.setItem("selectedClass", className);
        localStorage.setItem("selectedPrice", price);
        window.location.href = "booking.html";
    } else {
        alert("Please login first to book a class!");
        window.location.href = "login.html";
    }
}

const API_URL = "http://localhost:3000/api/classes";

let allClasses = [];
let lastSection = "mainSection";

/* ================= LOAD ================= */
async function loadClasses(){
  try{
    const res = await fetch(API_URL);
    allClasses = await res.json();
    console.log("DATA:", allClasses);
  }catch(err){
    alert("Backend not connected!");
    console.error(err);
  }
}

/* ================= LEVEL 3 LOAD ================= */
function loadDetails(className){

  const c = allClasses.find(x => 
    x.name.toLowerCase() === className.toLowerCase()
  );

  if(!c){
    document.getElementById("classDetails").innerHTML =
      `<div class="empty">No details found 😕</div>`;
    showSection("classDetailsSection");
    return;
  }

  document.getElementById("classDetails").innerHTML = `
    <div class="level3-card">

      <div class="level3-image">
        <img src="${c.image}">
      </div>

      <div class="level3-content">
        <h2>${c.name}</h2>

        <p>${c.description || "No description available"}</p>

        <div class="class-details">
          <p><strong>Level:</strong> ${c.level}</p>
          <p><strong>Duration:</strong> ${c.duration}</p>
          <p><strong>Price:</strong> ₹${c.price}</p>

          <p>
            <strong>Slots:</strong>
            <select>
              ${(c.slots || []).map(s => `<option>${s}</option>`).join("")}
            </select>
          </p>
        </div>

        <button class="book-btn" onclick="goToBook('${c.name}', ${c.price})">
          Book Now
        </button>

      </div>

    </div>
  `;

  showSection("classDetailsSection");
}

/* ================= NAVIGATION ================= */
function showSection(id){
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");

  lastSection = id;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ================= BACK ================= */
function goBack(){
  showSection("mainSection");
}

function goBackToLevel2(){
  history.back(); // simple navigation
}

/* ================= BOOK ================= */
function goToBook(name, price){
  if(localStorage.getItem("isLoggedIn") === "true"){
    localStorage.setItem("selectedClass", name);
    localStorage.setItem("selectedPrice", price);
    window.location.href = "booking.html";
  } else {
    alert("Login first!");
    window.location.href = "login.html";
  }
}

/* ================= INIT ================= */
loadClasses();

