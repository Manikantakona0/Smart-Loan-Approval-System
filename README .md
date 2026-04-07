# 🏦 SecureBank — AI-Powered Credit Risk & Loan Approval System

![Academic Project](https://img.shields.io/badge/Type-Academic%20Project-blue)
![HTML CSS JS](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JavaScript-orange)
![Status](https://img.shields.io/badge/Status-Complete-green)

> An AI-powered loan eligibility and credit risk assessment system built with vanilla HTML, CSS, and JavaScript. Designed for Indian banking context with support for 5 major banks.

---

## 📸 Features

- 🏛️ **Bank Selection** — Choose from SBI, HDFC, ICICI, Axis Bank, and Union Bank of India
- 📋 **Detailed Loan Application Form** — Personal info, financial details, PAN, Aadhaar, contact info
- 🤖 **AI Risk Assessment Engine** — Evaluates credit score, debt-to-income ratio, repayment history, employment status, and more
- 📊 **Visual Results Dashboard** — Approval probability bar, credit score gauge, risk factor breakdown
- 💰 **EMI Calculator** — Auto-calculates monthly EMI based on loan amount, tenure, and bank-specific interest rate
- 🏦 **Bank EMI Comparison Table** — Compare EMIs across all 5 banks side by side
- ⚡ **Instant Decision** — Approved / Conditional / Rejected with explanation
- 🔄 **Multi-Page SPA Flow** — Smooth page transitions without any framework

---

## 🚀 Getting Started

### Prerequisites
No installations required. Just a modern web browser.

### Run Locally

```bash
git clone https://github.com/your-username/securebank-loan-assessment.git
cd securebank-loan-assessment
```

Then open `index.html` in your browser — or use Live Server in VS Code.

---

## 📁 Project Structure

```
securebank-loan-assessment/
│
├── index.html       # Main HTML — all 3 pages (Dashboard, Form, Results)
├── styles.css       # All styling, responsive layout, animations
├── script.js        # Risk logic, form validation, page navigation
└── README.md        # Project documentation
```

---

## 🧠 Risk Assessment Logic

The system evaluates loan applications based on these weighted factors:

| Factor | Risk Impact |
|---|---|
| Credit Score < 450 | Auto-reject |
| Poor repayment history | +30 points |
| Debt-to-income ratio > 50% | +25 points |
| Unemployed | +40 points |
| Monthly income < ₹15,000 | +20 points |
| More than 3 existing loans | +15 points |
| Age > 60 | +10 points |

**Decision thresholds:**
- Score < 40 → ✅ **Approved**
- Score 40–69 → ⚠️ **Conditional**
- Score ≥ 70 or credit score < 450 → ❌ **Rejected**

---

## 💳 Bank Interest Rates

| Bank | Base Rate |
|---|---|
| State Bank of India | 8.2% p.a. |
| Union Bank of India | 8.5% p.a. |
| HDFC Bank | 8.8% p.a. |
| ICICI Bank | 9.0% p.a. |
| Axis Bank | 9.2% p.a. |

Rates are adjusted by +2% for Medium risk and +5% for High risk profiles.

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Page structure, semantic markup |
| CSS3 | Styling, animations, responsive design |
| Vanilla JavaScript | Risk logic, DOM manipulation, form validation |

No frameworks. No libraries. No build tools.

---

## 📋 Form Validations

- ✅ PAN format: `ABCDE1234F` (5 letters + 4 digits + 1 letter)
- ✅ Aadhaar: exactly 12 digits
- ✅ Phone: exactly 10 digits
- ✅ Age: minimum 18 years
- ✅ Credit score: between 300–900
- ✅ All required fields enforced with inline error messages

---

## ⚠️ Disclaimer

> This is an **academic project built for educational purposes only**. It does not connect to any real banking system, financial database, or credit bureau. All assessments are simulated based on a rule-based algorithm. Do not use this for actual financial decisions.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
