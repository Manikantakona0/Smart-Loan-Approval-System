// Risk Assessment Logic
let selectedBank = {
  name: '',
  logo: ''
};
function assessLoanRisk(application) {
  const riskFactors = [];
  let riskScore = 0;

  if (application.age < 18) {
    if (application.age < 18) {
      return {
        decision: 'Rejected',
        riskLevel: 'High',
        approvalProbability: 0,
        explanation: 'Applicant must be at least 18 years old.',
        riskFactors: ['Applicant below 18 years'],
        interestRate: 0,
        emi: 0
      };
   }
  }

  if (application.creditScore < 300) {
    riskFactors.push('Extremely low credit score');
    riskScore += 50;
  } else if (application.creditScore < 550) {
    riskFactors.push('Poor credit score (below 550)');
    riskScore += 40;
  } else if (application.creditScore < 650) {
    riskFactors.push('Fair credit score (550-650)');
    riskScore += 25;
  } else if (application.creditScore < 750) {
    riskScore += 10;
  }

  if (application.repaymentHistory === 'Poor') {
    riskFactors.push('Poor loan repayment history');
    riskScore += 30;
  } else if (application.repaymentHistory === 'Fair') {
    riskFactors.push('Fair repayment history');
    riskScore += 15;
  }

  const debtToIncomeRatio = (application.loanAmount / 12) / application.monthlyIncome;
  if (debtToIncomeRatio > 0.5) {
    riskFactors.push('High debt-to-income ratio (loan EMI exceeds 50% of monthly income)');
    riskScore += 25;
  } else if (debtToIncomeRatio > 0.4) {
    riskFactors.push('Moderate debt-to-income ratio (loan EMI 40-50% of monthly income)');
    riskScore += 15;
  }

  if (application.monthlyIncome < 15000) {
    riskFactors.push('Low monthly income (below ₹15,000)');
    riskScore += 20;
  }

  if (application.existingLoans > 3) {
    riskFactors.push('Multiple existing loans (more than 3)');
    riskScore += 15;
  } else if (application.existingLoans > 1) {
    riskFactors.push('Has existing loans');
    riskScore += 5;
  }

  if (application.employmentStatus === 'Unemployed') {
    riskFactors.push('Currently unemployed');
    riskScore += 40;
  } else if (application.employmentStatus === 'Self-Employed') {
    riskScore += 5;
  }

  if (application.age > 60) {
    riskFactors.push('Age above 60 years');
    riskScore += 10;
  }

  let decision, riskLevel, approvalProbability, explanation;

  if (riskScore >= 70 || application.creditScore < 450) {
    decision = 'Rejected';
    riskLevel = 'High';
    approvalProbability = Math.max(0, 30 - riskScore / 3);
    explanation = 'Application rejected due to high credit risk. Multiple risk factors indicate significant likelihood of default. We recommend improving credit score and financial stability before reapplying.';
  } else if (riskScore >= 40) {
    decision = 'Conditional';
    riskLevel = 'Medium';
    approvalProbability = Math.min(75, 80 - riskScore);
    explanation = 'Application requires additional review. Loan may be approved with conditions such as higher interest rate, collateral requirement, or co-signer. Please contact our loan officer for further discussion.';
  } else {
    decision = 'Approved';
    riskLevel = riskScore > 20 ? 'Medium' : 'Low';
    approvalProbability = Math.min(95, 100 - riskScore);
    explanation = 'Congratulations! Your loan application has been approved. You meet our credit requirements and demonstrate good financial stability. Our loan officer will contact you within 2-3 business days to proceed with documentation.';
  }

  let baseRate = 0;

  // Bank-based base rates
  if (selectedBank.name === "State Bank of India") baseRate = 8.2;
  else if (selectedBank.name === "HDFC Bank") baseRate = 8.8;
  else if (selectedBank.name === "ICICI Bank") baseRate = 9.0;
  else if (selectedBank.name === "Axis Bank") baseRate = 9.2;
  else if (selectedBank.name === "Union Bank of India") baseRate = 8.5;
  else baseRate = 9.5;

  let interestRate;

  // Risk adjustment
  if (riskLevel === "Low") interestRate = baseRate;
  else if (riskLevel === "Medium") interestRate = baseRate + 2;
  else interestRate = baseRate + 5;

  const principal = application.loanAmount;
  const monthlyRate = interestRate / 12 / 100;
  const months = application.loanTenure * 12;

  let emi = 0;

  if (months > 0) {
    emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
  }

  if (riskFactors.length === 0) {
    riskFactors.push('No significant risk factors identified');
  }

  return {
   decision,
   riskLevel,
   approvalProbability: Math.round(approvalProbability),
   explanation,
   riskFactors,
   interestRate,
   emi: Math.round(emi)
  };
}

// Page Navigation
function showPage(pageId) {
  const pages = document.querySelectorAll('.page');

  pages.forEach(page => {
    page.classList.remove('active');
  });

  setTimeout(() => {
    document.getElementById(pageId).classList.add('active');

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, 100);
}

// Form Validation
function validateForm() {
  const form = document.getElementById('loanForm');
  const formData = new FormData(form);
  const errors = {};

  const fields = {
    fullName: 'Full name is required',
    age: 'Valid age is required',
    gender: 'Gender is required',
    maritalStatus: 'Marital status is required',
    employmentStatus: 'Employment status is required',
    monthlyIncome: 'Valid monthly income is required',
    existingLoans: 'Valid number of loans is required',
    repaymentHistory: 'Repayment history is required',
    creditScore: 'Credit score must be between 300-900',
    loanAmount: 'Valid loan amount is required',
    loanTenure: 'Valid loan tenure is required',
    loanPurpose: 'Loan purpose is required',
    pan: 'Valid PAN is required',
    aadhaar: 'Valid Aadhaar number is required',
    phone: 'Valid phone number is required',
    email: 'Valid email is required'
  };

  for (const [field, message] of Object.entries(fields)) {
    const value = formData.get(field);
    const errorEl = document.getElementById(`${field}Error`);
    const input = document.getElementById(field);

    if (!value || (field === 'age' && parseInt(value) <= 0) || (field === 'monthlyIncome' && parseInt(value) <= 0) || (field === 'existingLoans' && parseInt(value) < 0) || (field === 'loanAmount' && parseInt(value) <= 0) || (field === 'creditScore' && (parseInt(value) < 300 || parseInt(value) > 900)) || (field === 'loanTenure' && parseInt(value) <= 0)) {
      errors[field] = message;
      errorEl.textContent = message;
      input.classList.add('error');
    } else {
      errorEl.textContent = '';
      input.classList.remove('error');
    }
  }
  // 🔥 Custom validations

const panValue = formData.get('pan');
if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panValue)) {
  document.getElementById('panError').textContent = "Invalid PAN format";
}

const aadhaarValue = formData.get('aadhaar');
if (!/^\d{12}$/.test(aadhaarValue)) {
  document.getElementById('aadhaarError').textContent = "Aadhaar must be 12 digits";
}

const phoneValue = formData.get('phone');
if (!/^\d{10}$/.test(phoneValue)) {
  document.getElementById('phoneError').textContent = "Phone must be 10 digits";
}

  return Object.keys(errors).length === 0;
}

// Display Results
function displayResults(application, assessment) {
  const decisionCard = document.getElementById('decisionCard');
  const decisionIcon = document.getElementById('decisionIcon');
  const decisionText = document.getElementById('decisionText');
  const riskBadge = document.getElementById('riskBadge');

  decisionCard.className = `decision-card ${assessment.decision.toLowerCase()}`;

  if (assessment.decision === 'Approved') {
    decisionIcon.textContent = '✓';
  } else if (assessment.decision === 'Rejected') {
    decisionIcon.textContent = '✕';
  } else {
    decisionIcon.textContent = '!';
  }

  decisionText.textContent = `Loan ${assessment.decision}`;
  document.getElementById('selectedBankLogo').src = selectedBank.logo;
  document.getElementById('selectedBankName').textContent = selectedBank.name;
  riskBadge.textContent = `${assessment.riskLevel} Risk`;
  riskBadge.className = `risk-badge ${assessment.riskLevel.toLowerCase()}`;

  document.getElementById('resultName').textContent = application.fullName;
  document.getElementById('resultAge').textContent = `${application.age} years`;
  document.getElementById('resultEmployment').textContent = application.employmentStatus;
  document.getElementById('resultIncome').textContent = `₹${application.monthlyIncome.toLocaleString()}`;
  document.getElementById('resultCreditScore').textContent = application.creditScore;
  document.getElementById('resultLoanAmount').textContent = `₹${application.loanAmount.toLocaleString()}`;
  document.getElementById('resultPurpose').textContent = application.loanPurpose;
  document.getElementById('resultInterest').textContent = assessment.interestRate + "%";
  document.getElementById('resultEMI').textContent = "₹" + assessment.emi.toLocaleString();
  document.getElementById("progressFill").style.width =
  assessment.approvalProbability + "%";

  const approvalPercentage = assessment.approvalProbability;
  document.getElementById('approvalPercentage').textContent = approvalPercentage;
  const probabilityBar = document.getElementById('probabilityBar');
  probabilityBar.style.width = `${approvalPercentage}%`;

  let probabilityClass = 'low';
  if (approvalPercentage >= 70) {
    probabilityClass = 'high';
  } else if (approvalPercentage >= 40) {
    probabilityClass = 'medium';
  }

  const probabilityNumber = document.querySelector('.probability-number');
  probabilityNumber.className = `probability-number ${probabilityClass}`;
  probabilityBar.className = `probability-bar ${probabilityClass}`;

  document.getElementById('assessmentExplanation').textContent = assessment.explanation;

  const gaugePointer = document.getElementById('gaugePointer');
  const creditScore = application.creditScore;
  const pointerPosition = ((creditScore - 300) / 600) * 100;
  gaugePointer.style.left = `${pointerPosition}%`;
  document.getElementById('pointerValue').textContent = creditScore;

  const riskFactorsList = document.getElementById('riskFactorsList');
  riskFactorsList.innerHTML = '';
  assessment.riskFactors.forEach((factor, index) => {
    const factorEl = document.createElement('div');
    factorEl.className = 'risk-factor';
    factorEl.innerHTML = `
      <div class="risk-factor-number">${index + 1}</div>
      <div class="risk-factor-text">${factor}</div>
    `;
    riskFactorsList.appendChild(factorEl);
  });
  // Bank Comparison Logic (MOVED INSIDE FUNCTION)
  const banks = [
    { name: "State Bank of India", rate: 8.2 },
    { name: "HDFC Bank", rate: 8.8 },
    { name: "ICICI Bank", rate: 9.0 },
    { name: "Axis Bank", rate: 9.2 },
    { name: "Union Bank of India", rate: 8.5 }
  ];

  const tableBody = document.getElementById('comparisonTableBody');
  tableBody.innerHTML = '';

  banks.forEach(bank => {
   const monthlyRate = bank.rate / 12 / 100;
   const months = application.loanTenure * 12;
   let emi = 0;

   if (months > 0) {
     emi =
       (application.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
       (Math.pow(1 + monthlyRate, months) - 1);
    }

   const row = document.createElement('tr');
   row.innerHTML = `
     <td>${bank.name}</td>
     <td>${bank.rate}%</td>
     <td>₹${Math.round(emi).toLocaleString()}</td>
   `;
   tableBody.appendChild(row);
 });
}



// Form Submission
document.getElementById('loanForm').addEventListener('submit', (e) => {
  e.preventDefault();

  // show loader
  document.getElementById("loadingScreen").classList.remove("hidden");

  if (!validateForm()) {
    document.getElementById("loadingScreen").classList.add("hidden");
    return;
  }

  const formData = new FormData(document.getElementById('loanForm'));
  const application = {
    fullName: formData.get('fullName'),
    age: parseInt(formData.get('age')),
    gender: formData.get('gender'),
    maritalStatus: formData.get('maritalStatus'),
    employmentStatus: formData.get('employmentStatus'),
    monthlyIncome: parseInt(formData.get('monthlyIncome')),
    existingLoans: parseInt(formData.get('existingLoans')),
    repaymentHistory: formData.get('repaymentHistory'),
    creditScore: parseInt(formData.get('creditScore')),
    loanAmount: parseInt(formData.get('loanAmount')),
    loanTenure: parseInt(formData.get('loanTenure')),
    loanPurpose: formData.get('loanPurpose'),
    pan: formData.get('pan'),
    aadhaar: formData.get('aadhaar'),
    phone: formData.get('phone'),
    email: formData.get('email')
  };

  const assessment = assessLoanRisk(application);

  // ONLY HERE result should happen
  setTimeout(() => {
    displayResults(application, assessment);
    showPage('resultsPage');
    document.getElementById("loadingScreen").classList.add("hidden");
  }, 1000);
});

// Navigation Events
document.getElementById('startAssessmentBtn').addEventListener('click', () => {

  if (!selectedBank.name) {
    alert("⚠ Please select a bank before starting the loan assessment.");
    return;
  }

  // 🔥 show loader
  document.getElementById("loadingScreen").classList.remove("hidden");

  setTimeout(() => {
    showPage('formPage');

    // 🔥 hide loader after page load
    document.getElementById("loadingScreen").classList.add("hidden");
  }, 800);
});
document.getElementById('backToDashboardBtn').addEventListener('click', () => {
  showPage('dashboardPage');
});

document.getElementById('backToFormBtn').addEventListener('click', () => {
  showPage('formPage');
});

document.getElementById('newAssessmentBtn').addEventListener('click', () => {
  selectedBank.name = '';
  selectedBank.logo = '';
  showPage('dashboardPage');
});

document.getElementById('assessNewBtn').addEventListener('click', () => {
  document.getElementById('loanForm').reset();
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
  document.querySelectorAll('input, select').forEach(el => el.classList.remove('error'));
  selectedBank.name = '';
  selectedBank.logo = '';
  showPage('dashboardPage');
});

// Bank Logo Click Event
document.querySelectorAll('.bank-logo-card').forEach(card => {
  card.addEventListener('click', () => {

    /* 🔥 REMOVE old selection
    document.querySelectorAll('.bank-logo-card')
      .forEach(c => c.classList.remove('selected'));*/

    // 🔥 ADD new selection
    card.classList.add('selected');

    // Existing code (DON'T CHANGE)
    const bankName = card.getAttribute('data-bank');
    const bankLogo = card.querySelector('img').src;

    selectedBank.name = bankName;
    selectedBank.logo = bankLogo;

    document.getElementById('formTitle').textContent = `Apply Loan for ${bankName}`;
    document.getElementById('startAssessmentBtn').textContent = `Apply Loan in ${bankName}`;

  });
});