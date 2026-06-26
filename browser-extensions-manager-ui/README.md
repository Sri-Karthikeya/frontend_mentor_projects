# Frontend Mentor - Browser extensions manager UI solution

This is my solution to the Frontend Mentor Browser Extensions Manager UI challenge.  
I built this project to practice React state management, filtering logic, and responsive UI design.

---

## Overview

### The challenge

Users should be able to:

- Toggle extensions between active and inactive states  
- Filter extensions (all / active / inactive)  
- Remove extensions from the list  
- Switch between light and dark themes  
- View an optimal layout depending on device screen size  
- See hover and focus states for interactive elements  

---

## Screenshot

![Browser Extensions Manager Screenshot](./screenshot.jpg)

---

## Links

- Solution URL: https://github.com/Karthikeya-JustForKnowing/browser-extensions-manager-ui  
- Live Site URL: https://karthikeya-justforknowing.github.io/browser-extensions-manager-ui  

---

## My process

### Built with

- Semantic HTML5 markup  
- CSS custom properties  
- Flexbox  
- CSS Grid  
- Responsive design  
- Mobile-first workflow  
- React (Vite)  
- JavaScript (ES6+)  

---

## What I learned

Through this project, I improved my understanding of:

- React state management for UI interactions  
- Filtering data dynamically (active / inactive / all)  
- Component-based architecture  
- Handling delete actions in lists  
- Theme switching (light/dark mode logic)  
- Responsive layouts using Flexbox and Grid  

Example code:

```js
const filteredExtensions = extensions.filter((ext) => {
  if (filter === "active") return ext.isActive;
  if (filter === "inactive") return !ext.isActive;
  return true;
});