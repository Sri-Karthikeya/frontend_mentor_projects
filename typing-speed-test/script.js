let passages = []
const startbutton = document.getElementById("start");
const para = document.getElementById("para");
const easybutton = document.getElementById("easy");
const mediumbutton = document.getElementById("medium")
const hardbutton = document.getElementById("hard");
const clickme = document.getElementById("clickme")
let currentdifficulty = "easy";
let currentIndex = 0;
let currentMode = "timed";
let timer = null;
let timeLeft = 60;
let testStarted = false;
let correctChars = 0;
let wrongChars = 0;
let startTime = null;
startbutton.disabled = true;
const timedBtn = document.getElementById("timed");
const passageBtn = document.getElementById("passage");
const restartBtn = document.getElementById("restarttest");
const goAgainBtn = document.getElementById("goagain");
const wpm = document.querySelector("#wpm p");
const accuracy = document.querySelector("#accuracy p");
const time = document.getElementById("time");
const difficultyButtons = [easybutton, mediumbutton, hardbutton];
const modeButtons = [timedBtn, passageBtn];
const difficultySelect = document.getElementById("difficulty");
const modeSelect = document.getElementById("modemob")

difficultySelect.addEventListener("change", (e) => {
    currentdifficulty = e.target.value;
    blurred();
})

modeSelect.addEventListener("change", (e) => {
    currentMode = e.target.value;

})
function selectButton(buttons, selctedBtn) {
    buttons.forEach(btn => btn.classList.remove("selected"));
    selctedBtn.classList.add("selected");
}

selectButton(difficultyButtons, easybutton);
selectButton(modeButtons, timedBtn);

async function loadPassaegs() {

    const responce = await fetch("./data.json");
    const data = await responce.json();
    passages = data;
    console.log(passages);
    startbutton.disabled = false
    blurred();
}
loadPassaegs()
loadPersonalBest()


function updateStats() {
    const result = calculateResults();
    wpm.textContent = result.wpm;
    accuracy.textContent = `${result.accuracy}%`;
}

easybutton.addEventListener("click", () => {
    currentdifficulty = "easy";
    selectButton(difficultyButtons, easybutton);
    blurred();
});

mediumbutton.addEventListener("click", () => {
    currentdifficulty = "medium";
    selectButton(difficultyButtons, mediumbutton);
    blurred();
});

hardbutton.addEventListener("click", () => {
    currentdifficulty = "hard";
    selectButton(difficultyButtons, hardbutton)
    blurred();
});

timedBtn.addEventListener("click", () => {
    currentMode = "timed";
    selectButton(modeButtons, timedBtn);
})

passageBtn.addEventListener("click", () => {
    currentMode = "passage";
    selectButton(modeButtons, passageBtn);
})

startbutton.addEventListener("click", start);
para.addEventListener("click", start);

restartBtn.addEventListener("click", resetTest);
goAgainBtn.addEventListener("click", goAgain);



function blurred() {
    const filteredpassages = passages[currentdifficulty];

    const randomIndex = Math.floor(
        Math.random() * filteredpassages.length
    )

    const selctedpassage = filteredpassages[randomIndex];

    para.innerHTML = "";
    selctedpassage.text.split("").forEach(char => {
        const span = document.createElement("span");
        span.innerHTML = char;
        para.appendChild(span);
    });
    currentIndex = 0;
    const spans = para.querySelectorAll("span");
    if (spans.length > 0) {
        spans[0].classList.add("active");
    }

}

function start() {

    document.getElementById("controls").classList.add("test-active");
    if (testStarted) {
        return;
    }
    correctChars = 0;
    wrongChars = 0;
    startTime = Date.now();

    testStarted = true;
    para.classList.remove("blur");
    startbutton.style.display = "none";
    clickme.style.display = "none";
    if (currentMode === "timed") {
        startTimer();
    }

}


document.addEventListener("keydown", handleTyping);

function handleTyping(e) {

    if (!testStarted) {
        return;
    }

    if (e.key.length > 1 && e.key != "Backspace") {
        return;
    }
    const spans = para.querySelectorAll("span");
    if (currentIndex >= spans.length) {
        return;
    }
    const currentspan = spans[currentIndex];

    if (e.key === "Backspace") {
        if (currentIndex <= 0) {
            return;
        }

        currentIndex--;
        spans.forEach(span => {
            span.classList.remove("active");
        });
        spans[currentIndex].classList.remove("correct");
        spans[currentIndex].classList.remove("wrong");
        spans[currentIndex].classList.add("active");
        return;
    }

    if (currentIndex >= spans.length) {
        return;
    }
    currentspan.classList.remove("active");
    if (e.key === currentspan.innerText) {
        currentspan.classList.add("correct");
        correctChars++;
        currentIndex++;
        updateStats();
        if (currentIndex < spans.length) {
            spans[currentIndex].classList.add("active")
        }
    }
    else {
        currentspan.classList.add("wrong");
        wrongChars++;
        currentIndex++;
        updateStats();
        if (currentIndex < spans.length) {
            spans[currentIndex].classList.add("active")
        }
    }
    if (currentMode == "passage" && currentIndex >= spans.length) {
        finishTest();
    }


}



function startTimer() {
    timeLeft = 60;
    time.textContent = `Time- ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        time.textContent = `Time-${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            finishTest();
        }
    }, 1000);
}

function finishTest() {
    clearInterval(timer);
    testStarted = false;
    const results = calculateResults();
    loadPersonalBest();

    // document.getElementById("header").style.display="none";

    document.getElementById("mainstats").style.display = "none";

    document.getElementById("data").style.display = "none";

    document.getElementById("retake").style.display = "none";

    document.getElementById("result").style.display = "flex";

    document.getElementById("resultWpm").textContent = results.wpm;
    document.getElementById("resultAccuracy").textContent = results.accuracy + "%";
    document.getElementById("resultCharacters").textContent = `${results.correctChars}/${results.wrongChars}`;
    const tag = document.getElementById("tag");
    const previousBest = JSON.parse(localStorage.getItem("personalBest")) || {
        wpm: 0,
        accuracy: 0
    }
    const newRecord = savePersonalBest(results.wpm, results.accuracy);

    if (previousBest.wpm == 0) {
        tag.textContent = "Base Line Established";
    }
    else if (newRecord) {
        tag.textContent = "High Score smashed";
    }
    else {
        tag.textContent = "Solid run. Keep pushing to beat your high score";
    }
}



function calculateResults() {
    const totalTyped = correctChars + wrongChars;
    const accuracy = totalTyped === 0 ? 0 : Math.round((correctChars / totalTyped) * 100);
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const elapsedMinutes = elapsedSeconds / 60;

    const wpm = elapsedMinutes > 0 ? Math.round((correctChars / 5) / elapsedMinutes) : 0;
    return {
        wpm,
        accuracy,
        correctChars,
        wrongChars
    };
}


function savePersonalBest(currentWpm, currentAccuracy) {
    console.log(currentAccuracy, currentWpm);

    const oldBest = JSON.parse(localStorage.getItem("personalBest")) || {
        wpm: 0,
        accuracy: 0
    }

    if (currentWpm > oldBest.wpm) {
        const newBest = {
            wpm: currentWpm,
            accuracy: currentAccuracy
        }
        localStorage.setItem("personalBest", JSON.stringify(newBest));
        console.log(localStorage.getItem("personalBest"));

        console.log(pastBest);
        console.log(pastBest.wpm);
        console.log(pastBest.accuracy);

        return true;
    }
    return false;

}

function loadPersonalBest() {
    const best = JSON.parse(localStorage.getItem("personalBest")) || {
        wpm: 0,
        accuracy: 0
    };

    console.log(best.wpm);
    document.getElementById("wpmscore").textContent = `${best.wpm} wpm`;
}


function resetTest() {
    document.getElementById("controls").classList.remove("test-active");
    startTime = null;
    clearInterval(timer);
    testStarted = false;
    timeLeft = 60;
    // timedBtn.textContent = "Timed(60s)";
    correctChars = 0;
    wrongChars = 0;
    startbutton.style.display = "block";
    clickme.style.display = "block";
    para.classList.add("blur");
    blurred();

}

function goAgain() {
    document.getElementById("result").style.display = "none";
    document.getElementById("mainstats").style.display = "flex";
    document.getElementById("data").style.display = "flex";
    document.getElementById("retake").style.display = "flex"
    resetTest();
}
