const slotsData = [
  "9:00AM",
  "9:30AM",
  "10:00AM",
  "10:30AM",
  "11:00AM",
  "11:30AM",
  "12:00PM",
  "12:30PM",
  "1:00PM",
  "1:30PM",
  "2:00PM",
  "2:30PM",
];
localStorage.clear();
let slots = document.getElementById("slots-section");
slotsData.forEach((ele) => {
  let btn = document.createElement("button");
  btn.textContent = ele;
  slots.appendChild(btn);
  btn.className = "btn-styles";
});

let btn = slots.querySelectorAll("button");
let booked_section = document.getElementById("booked-section");
let del_btn = document.getElementById("delete");

btn.forEach((ele) => {
  ele.addEventListener("click", () => {
    let ask = confirm("Are you sure you want to book the slot?");
    if (ask) {
      if (!booked_section.querySelector("ol")) {
        booked_section.textContent = "";
        let text = document.createElement("h2");
        text.textContent = "Booked seats are ";
        booked_section.appendChild(text);
        let ol = document.createElement("ol");
        booked_section.appendChild(ol);
        let list = document.createElement("li");
        list.textContent = `you book the slot at ${ele.textContent}`;
        ol.appendChild(list);
        console.log(ele);
      } else {
        let get_ol = booked_section.querySelector("ol");
        let list = document.createElement("li");
        list.textContent = `you book the slot at ${ele.textContent}`;
        get_ol.appendChild(list);
      }

      ele.disabled = true;
      ele.style.backgroundColor = "gray";
      ele.title = "There is no longer available";

      const status = "Booked";
      const time = ele.textContent;

      let booked_slots = localStorage.getItem("booked_slots");

      if (booked_slots) {
        let get_data = localStorage.getItem("booked_slots");
        let arr = JSON.parse(get_data);
        let data = {};
        data.Time = time;
        data.Status = status;
        arr.push(data);
        let updated_arr = JSON.stringify(arr);
        localStorage.setItem("booked_slots", updated_arr);
      } else {
        let booked_slots = [];
        let data = {};
        data.Time = time;
        data.Status = status;
        booked_slots.push(data);
        localStorage.setItem("booked_slots", JSON.stringify(booked_slots));
      }
    } else {
    }
  });
});

del_btn.addEventListener("click", () => {
  booked_section.textContent = "";
  let text = document.createElement("h3");
  text.textContent = "No slots are booked yet";
  booked_section.appendChild(text);

  btn.forEach((ele) => {
    ele.disabled = false;
    ele.style.backgroundColor = "blue";
  });
  localStorage.clear();
});


