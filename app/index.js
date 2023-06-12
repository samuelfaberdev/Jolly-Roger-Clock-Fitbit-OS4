import * as document from "document";
import * as simpleClock from "./simple/clock";
import * as simpleHRM from "./simple/hrm";
import * as simpleActivity from "./simple/activity";

// Element de la ClockFace
let txtHour = document.getElementById("txtHour");
let txtMin = document.getElementById("txtMin");
let txtDate = document.getElementById("txtDate");
let txtJour = document.getElementById("txtJour");
let txtHRM = document.getElementById("txtHRM");
let iconHRM = document.getElementById("iconHRM");
let imgHRM = iconHRM.getElementById("icon");
let statsCycle = document.getElementById("stats-cycle");
let statsCycleItems = statsCycle.getElementsByClassName("cycle-item");

/* --------- CLOCK ---------- */
function clockCallback(data) {
  txtHour.text = data.hour;
  txtMin.text = data.min;
  txtDate.text = data.date;
  txtJour.text = data.jour;
}
simpleClock.initialize("minutes", "shortDate", clockCallback);

/* -------- HRM ------------- */
function hrmCallback(data) {
  txtHRM.text = `${data.bpm}`;
  if (data.zone === "out-of-range") {
    imgHRM.href = "images/heart_open.png";
  } else {
    imgHRM.href = "images/heart_solid.png";
  }
  if (data.bpm !== "--") {
    iconHRM.animate("highlight");
  }
}
simpleHRM.initialize(hrmCallback);

/* ------- ACTIVITY --------- */
function activityCallback(data) {
  statsCycleItems.forEach((item, index) => {
    let img = item.firstChild;
    let txt = img.nextSibling;
    txt.text = data[Object.keys(data)[index]].pretty;
    // Repositionne l'icône d'activité à gauche da la variable textuel de l'activité
    img.x = txt.getBBox().x - txt.parent.getBBox().x - img.width - 7;
  });
}
simpleActivity.initialize("seconds", activityCallback);
