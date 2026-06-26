# Frontend Mentor - Mortgage Repayment Calculator Solution

This is my solution to the Frontend Mentor Mortgage Repayment Calculator challenge.
I built this project using only HTML, CSS, and vanilla JavaScript to practice form validation, DOM manipulation, and financial math formulas.

## Overview

### The challenge

Users should be able to:

* Input mortgage information and see monthly repayment and total repayment amounts after submitting the form
* See form validation messages if any field is incomplete
* Complete the form only using their keyboard
* View the optimal layout depending on their device's screen size
* See hover and focus states for all interactive elements on the page


## Screenshot

![Mortgage Calculator Screenshot](./screenshot.jpg)


### Links

* Solution URL: https://Sri-Karthikeya.github.io/frontend_mentor_projects/mortgage-repayment-calculator/
* Live Site URL: https://Sri-Karthikeya.github.io/frontend_mentor_projects/mortgage-repayment-calculator/


## My process

### Built with

* Semantic HTML5 markup
* CSS custom properties
* Flexbox
* CSS Grid
* Responsive design
* Mobile-first workflow
* Vanilla JavaScript (no frameworks)


## What I learned

Through this project, I practiced and improved my understanding of:

* CSS custom properties (design tokens) for consistent theming
* CSS Grid for two-panel layouts and side-by-side fields
* Custom styled radio buttons using `appearance: none` and `::after` pseudo-elements
* The modern `:has()` selector to highlight a parent when its child is checked
* `:focus-within` to highlight an entire input wrapper when the inner input is focused
* `:focus-visible` for accessible keyboard focus rings without affecting mouse users
* Form validation in JavaScript without relying on the browser's built-in popups
* The EMI (mortgage repayment) formula using `Math.pow()`
* Converting a `NodeList` to an Array using spread syntax `[...nodeList]`
* The `hidden` HTML attribute for semantic show/hide
* `toLocaleString()` for formatting numbers as currency with commas

Example CSS I used for the `:has()` selector — highlights the whole radio row when selected:

```css
.radio-option:has(.radio-input:checked) {
  border-color: var(--lime);
  background-color: var(--lime-light);
}
```

Example JS for the repayment formula (EMI formula):

```js
function calcRepayment(principal, annualRate, years) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}
```

I also learned how to debug ID mismatches between HTML and JavaScript — the most common cause of `Cannot read properties of null` errors.

---

## Continued development

In future projects, I want to improve my skills in:

* CSS animations and transitions
* More advanced form UX patterns
* JavaScript ES modules and code organisation
* Accessibility (ARIA roles, screen reader testing)
* React and component-based architecture

---

## Useful resources

* Frontend Mentor
* MDN Web Docs
* CSS Tricks — Flexbox and Grid guides
* MDN: `:has()` selector
* MDN: `toLocaleString()`

---

## Author

* Name - Karthikeya
* GitHub - https://github.com/Sri-Karthikeya
* Frontend Mentor - https://www.frontendmentor.io/profile/Sri-Karthikeya

---

## Acknowledgments

Thanks to Frontend Mentor for providing beginner-friendly frontend challenges that help developers practice real-world UI development.