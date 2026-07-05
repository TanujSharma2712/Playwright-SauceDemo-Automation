# Playwright Automation Testing - SauceDemo

## Project Overview

This project is an end-to-end automation testing framework developed using **Playwright** and **JavaScript** for the SauceDemo web application.

The project demonstrates how automated UI testing can be used to validate various functionalities of a web application including login, shopping cart, checkout, logout, sorting, and negative scenarios.

The framework has been organized into multiple test files following industry-standard practices.

---

# Technologies Used

- Playwright
- JavaScript
- Node.js
- Visual Studio Code
- Git
- GitHub

---

# Website Tested

https://www.saucedemo.com/

---

# Project Structure

```
AI-Testing
│
├── tests
│   ├── login.spec.js
│   ├── cart.spec.js
│   ├── checkout.spec.js
│   ├── logout.spec.js
│   ├── sorting.spec.js
│   └── negative.spec.js
│
├── playwright.config.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

---

# Test Modules

## 1. Login Module

Covered Scenarios:

- Valid Login
- Invalid Username
- Invalid Password
- Blank Username
- Blank Password
- Locked User
- Login using Enter Key
- Password Masking
- Login Button Visibility

---

## 2. Cart Module

Covered Scenarios:

- Add Single Product
- Add Multiple Products
- Remove Product
- Verify Cart Badge
- Continue Shopping
- Verify Cart Contents

---

## 3. Checkout Module

Covered Scenarios:

- Successful Checkout
- Missing First Name
- Missing Last Name
- Missing Postal Code
- Blank Fields
- Cancel Checkout
- Verify Overview Page
- Verify Order Confirmation

---

## 4. Logout Module

Covered Scenarios

- Successful Logout
- Redirect to Login Page
- Access Inventory After Logout
- Login Again

---

## 5. Sorting Module

Covered Scenarios

- Name A → Z
- Name Z → A
- Price Low → High
- Price High → Low
- Verify Dropdown
- Verify Default Sorting

---

## 6. Negative Testing

Covered Scenarios

- Invalid Login
- Invalid Password
- Unauthorized Inventory Access
- Invalid URL
- Checkout Edge Cases

---

# Total Test Cases

| Module | Test Cases |
|---------|-----------|
| Login | 12 |
| Cart | 10 |
| Checkout | 10 |
| Logout | 5 |
| Sorting | 8 |
| Negative | 8 |
| **Total** | **53** |

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Go inside project

```bash
cd AI-Testing
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install
```

---

# Run All Tests

```bash
npx playwright test
```

---

# Run Chromium Only

```bash
npx playwright test --project=chromium
```

---

# Run Specific Test File

Example

```bash
npx playwright test tests/login.spec.js
```

---

# Generate HTML Report

```bash
npx playwright show-report
```

---

# Features

- Modular Test Design
- HTML Reports
- Screenshots
- Video Recording
- Trace Viewer
- Cross Browser Support
- Parallel Execution
- Playwright Assertions

---

# Future Improvements

- Page Object Model (POM)
- Data Driven Testing
- CI/CD using GitHub Actions
- Jenkins Integration
- Excel Data Provider
- API Testing Integration

---

# Author

Tanuj Sharma
B.Tech, IIT Gandhinagar
Automation Testing using Playwright