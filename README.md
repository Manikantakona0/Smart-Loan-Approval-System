# 🏦 SecureBank — AI-Powered Credit Risk & Loan Approval System

An intelligent, browser-based loan application assessment tool that evaluates credit risk in real-time using rule-based AI logic. Built with vanilla HTML, CSS, and JavaScript — no backend required.

---

## 📌 Project Overview

SecureBank simulates a real-world loan approval workflow. Users select a banking partner, fill in personal and financial details, and instantly receive an AI-driven credit risk assessment with approval probability, EMI calculation, and bank-wise comparison.

> **Note:** This is an academic project built for educational purposes only.

---

## ✨ Features

- 🏛️ **Bank Selection** — Choose from 5 major Indian banks (SBI, HDFC, ICICI, Axis, Union Bank)
- 📋 **Loan Application Form** — Collects personal info, financial data, KYC details (PAN, Aadhaar)
- 🤖 **AI Risk Engine** — Scores applicants based on credit score, income, employment, repayment history, debt ratio, and more
- ✅ **Instant Decision** — Approved / Conditional / Rejected with explanation
- 📊 **Approval Probability Bar** — Visual percentage indicator (Low / Medium / High)
- 📉 **Credit Score Gauge** — Color-coded scale from Poor (300) to Excellent (900)
- 💰 **EMI Calculator** — Monthly EMI computed using bank-specific interest rates
- 🏦 **Bank EMI Comparison Table** — Compare EMI across all 5 banks side-by-side
- ⚠️ **Risk Factors List** — Numbered list of all identified risk factors
- 🔄 **Multi-page Navigation** — Dashboard → Form → Results flow with smooth transitions
- ⏳ **Loading Animations** — Spinner shown during page transitions and assessment processing

---

## 🗂️ Project Structure

```
securebank/
├── index.html      # UI structure — 3 pages (Dashboard, Form, Results)
├── styles.css      # All styling, layout, animations
└── script.js       # Risk logic, form validation, DOM manipulation
```

---

## 🧠 Risk Assessment Logic

The AI engine calculates a `riskScore` based on the following factors:

| Factor | Impact |
|---|---|
| Credit Score < 550 | +25 to +50 points |
| Poor repayment history | +30 points |
| Debt-to-Income ratio > 50% | +25 points |
| Monthly income < ₹15,000 | +20 points |
| Unemployed | +40 points |
| Existing loans > 3 | +15 points |
| Age > 60 | +10 points |

**Decision thresholds:**

| Risk Score | Decision |
|---|---|
| < 40 | ✅ Approved |
| 40–69 | ⚠️ Conditional |
| ≥ 70 or Credit Score < 450 | ❌ Rejected |

---

## 💳 Interest Rates by Bank

| Bank | Base Rate |
|---|---|
| State Bank of India | 8.2% |
| Union Bank of India | 8.5% |
| HDFC Bank | 8.8% |
| ICICI Bank | 9.0% |
| Axis Bank | 9.2% |

> Risk surcharge: Low Risk → +0%, Medium Risk → +2%, High Risk → +5%

---

## 🛠️ How to Run

1. Clone or download this repository
2. Open `index.html` in any modern browser
3. No installation, no server, no dependencies required

```bash
git clone https://github.com/your-username/securebank.git
cd securebank
# Just open index.html in your browser
```

---

## ✅ Form Validations

- **PAN** — Must match format `ABCDE1234F` (5 letters + 4 digits + 1 letter)
- **Aadhaar** — Must be exactly 12 digits
- **Phone** — Must be exactly 10 digits
- **Credit Score** — Must be between 300 and 900
- **Age** — Must be 18 or above
- All fields are required before submission

---

## 📸 Pages

| Page | Description |
|---|---|
| **Dashboard** | Feature overview + bank selection + start button |
| **Form** | Full loan application with personal & financial details |
| **Results** | Decision card, probability bar, credit gauge, risk factors, EMI comparison |

---

## 🔒 Data Privacy

All data is processed **entirely in the browser**. No information is sent to any server or stored anywhere.

---

## 👨‍💻 Tech Stack

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)

---

## 📚 Academic Disclaimer

This project is developed for **educational and demonstration purposes only**. It does not represent actual banking decisions or real financial advice.
