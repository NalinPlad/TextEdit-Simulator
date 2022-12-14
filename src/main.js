// Window movement
const program_Window = document.querySelector(".notepad");
const program_TopBar = document.querySelector(".doc_Title");

// When we first touch mouse down
let downX = 0;
let downY = 0;

// Current mouse position after clicking
let currentX, currentY;

if(!localStorage.getItem('window_X') || !localStorage.getItem('window_Y')){
  currentX = 50;
  currentY = 50;

  // Do this so it doesent flicker when reloading
  program_Window.style.opacity = 1;
} else {
  currentX = localStorage.getItem('window_X');
  currentY = localStorage.getItem('window_Y');

  program_Window.style.margin = `${currentY}px ${currentX}px`
  program_Window.style.opacity = 1;
}

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

  localStorage.setItem('window_X', currentX);
  localStorage.setItem('window_Y', currentY);
}

document.onmousemove = event => {
  if (dragging) {
    program_Window.style.margin = `${currentY - (downY - event.clientY)}px ${currentX - (downX - event.clientX)}px`
    console.log(event.clientY)
  }
}

// Saving textarea contents
const textarea = document.querySelector(".text");

if(!localStorage.getItem('text_Content')) {
  (async () => {
    const text = await (await fetch("welcome.txt")).text();

    textarea.value = text.slice(0,-1);
  })();
  localStorage.setItem('text_Content', textarea.value);
} else {
  textarea.value = localStorage.getItem('text_Content');
}

// use oninput instead of onchange because onchange
// only changes when the textarea loses focus
textarea.oninput = _ => {
  localStorage.setItem('text_Content', textarea.value);
}

// Saving a file (adapted from https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link)
const save_Input = document.querySelector('.edited');

save_Input.onclick = _ => {
  // Create an invisible <a> tag
  const link = document.createElement("a");
  link.style.display = "none";

  // Create a text blob and Object URL for it
  const blob = new Blob([textarea.value], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  link.href = url;

  // Set download filename
  link.download = "Untitled.txt";

  // Start download by clicked on the link
  link.click();

  // Revoke Object URl
  window.URL.revokeObjectURL(url);
}
