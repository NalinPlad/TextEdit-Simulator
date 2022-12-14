// Window movement
const program_Window = document.querySelector(".notepad");
const program_TopBar = document.querySelector(".doc_Title");

// When we first touch mouse down
let downX = 0;
let downY = 0;

// Current mouse position after clicking
let currentX = 50;
let currentY = 50;

// Offset from the top corner of the window to add to the margin
let offsetX = 0;
let offsetY = 0;

// Are we currently dragging
let dragging = false;

program_TopBar.onmousedown = event => {
  
  offsetX = event.clientX - currentX;
  offsetY = event.clientY - currentY; 

  currentX = event.clientX - offsetX;
  currentY = event.clientY - offsetY;

  downX = event.clientX;
  downY = event.clientY;

  dragging = true;
}

program_TopBar.onmouseup = event => {
  dragging = false;

  currentX = event.clientX - offsetX;
  currentY = event.clientY - offsetY;
  console.log("Up")
}

document.onmousemove = event => {
  if (dragging) {
    program_Window.style.margin = `${currentY - (downY - event.clientY)}px ${currentX - (downX - event.clientX)}px`
    console.log(event.clientY)
  }
}
