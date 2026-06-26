# Frontend Mentor - Typing Speed Test Solution

This is my solution to the Frontend Mentor Typing Speed Test challenge.
I completed this project to improve my HTML, CSS, and JavaScript skills and to get more comfortable with building interactive, real-time web applications.

## Overview

### The challenge

Users should be able to:

* Start a test by clicking the start button or clicking the passage and typing
* Select a difficulty level — Easy, Medium, or Hard
* Switch between Timed (60s) mode and Passage mode
* See real-time WPM, accuracy, and time stats while typing
* See correct characters highlighted green and errors in red
* Use backspace to correct mistakes (errors still count against accuracy)
* View a results screen with WPM, accuracy, and character counts
* See a confetti celebration when beating their personal best
* Have their personal best saved and persist across sessions via localStorage
* View the optimal layout on both desktop and mobile screens

---

### Screenshot

![Project Screenshot](./screenshot.png)

---

### Links

* Live Site URL: https://Sri-Karthikeya.github.io/frontend_mentor_projects/typing-speed-test/

---

## My Process

### Built With

* HTML5
* CSS3
* Flexbox
* Vanilla JavaScript
* localStorage
* Responsive Design
* Mobile-first approach

---

## What I Learned

While building this project, I learned:

* How to build a character-by-character typing engine in JavaScript
* How to calculate WPM and accuracy in real time
* How to manage UI state using class toggling instead of direct style manipulation
* How to layer elements inside a flex container using `position: absolute` and `z-index`
* How to use `localStorage` to persist data across browser sessions
* How to build responsive controls — button groups on desktop, dropdowns on mobile

One thing I liked learning was locking controls during the test using a single class:

```css
#controls.test-active .btn1,
#controls.test-active .timed,
#controls.test-active .passage {
    pointer-events: none;
    opacity: 0.4;
}
```

It keeps the JS clean — just add or remove one class instead of disabling every element individually.

---

## Continued Development

In future projects, I want to improve:

* CSS animations and transitions
* More advanced JavaScript state management
* Backend integration for global leaderboards
* Accessibility and keyboard navigation
* Writing cleaner and more scalable CSS

---


## Author

* Frontend Mentor - [@Sri-Karthikeya](https://www.frontendmentor.io/profile/Sri-Karthikeya)
* GitHub - https://github.com/Sri-Karthikeya

---

## Acknowledgments

Thanks to Frontend Mentor for providing realistic projects that help developers practice real frontend skills.