const form = document.getElementById('mortageForm');
const clearBtn = document.getElementById('clear-btn');

const amountInput = document.getElementById('amount');
const termInput = document.getElementById('term');
const rateInput = document.getElementById('rate');
const typeInputs = document.querySelectorAll('[name="mortgageType"]');

const fieldAmount = document.getElementById('field-amount');
const fieldTerm = document.getElementById('field-term');
const fieldRate = document.getElementById('field-rate');
const fieldType = document.getElementById('field-type');

const resultsEmpty = document.getElementById('resultsEmpty');
const resultsFilled = document.getElementById('resultsFilled');
const monthlyResult = document.getElementById('monthlyResult');
const totalResult = document.getElementById('totalResult');



function setError(fieldEl) {
    fieldEl.classList.add('has-error');
}

function clearError(fieldEl) {
    fieldEl.classList.remove('has-error');
}

function validateForm() {
    let isValid = true;

    if (!amountInput.value || Number(amountInput.value) <= 0) {
        setError(fieldAmount);
        isValid = false;
    } else {
        clearError(fieldAmount);
    }

    if (!termInput.value || Number(termInput.value) <= 0) {
        setError(fieldTerm);
        isValid = false;
    } else {
        clearError(fieldTerm);
    }

    if (!rateInput.value || Number(rateInput.value) <= 0) {
        setError(fieldRate);
        isValid = false;
    } else {
        clearError(fieldRate);
    }

    const typeChecked = [...typeInputs].some(input => input.checked);
    if (!typeChecked) {
        setError(fieldType);
        isValid = false;
    } else {
        clearError(fieldType);
    }

    return isValid;
}

amountInput.addEventListener('input', () => clearError(fieldAmount));
termInput.addEventListener('input', () => clearError(fieldTerm));
rateInput.addEventListener('input', () => clearError(fieldRate));
typeInputs.forEach(input => {
    input.addEventListener('change', () => clearError(fieldType));
});


form.addEventListener('submit', function (event) {
    event.preventDefault();   

    if (!validateForm()) {
        return;   
    }

    calculate();
});


function calcRepayment(principal, annualRate, years) {
    const r = annualRate / 100 / 12;     
    const n = years * 12;                 

    if (r === 0) {
        return principal / n;
    }

    const monthly = principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return monthly;
}


function calcInterestOnly(principal, annualRate) {
    const r = annualRate / 100 / 12;
    return principal * r;
}

function formatCurrency(number) {
    return '£' + number.toLocaleString('en-GB', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


function calculate() {
    const principal = Number(amountInput.value);
    const years = Number(termInput.value);
    const annualRate = Number(rateInput.value);
    const type = [...typeInputs].find(input => input.checked).value;

    let monthly;
    if (type === 'repayment') {
        monthly = calcRepayment(principal, annualRate, years);
    } else {
        monthly = calcInterestOnly(principal, annualRate);
    }

    const total = monthly * years * 12;

    monthlyResult.textContent = formatCurrency(monthly);
    totalResult.textContent = formatCurrency(total);


    resultsEmpty.hidden = true;
    resultsFilled.hidden = false;

    resultsFilled.classList.add('results-filled--visible');
}


clearBtn.addEventListener('click', function () {
    form.reset();

    [fieldAmount, fieldTerm, fieldRate, fieldType].forEach(clearError);

    resultsEmpty.hidden = false;
    resultsFilled.hidden = true;
});