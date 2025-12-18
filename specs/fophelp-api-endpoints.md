# FOP Help - API Endpoints Documentation

## Base URL

https://new.fophelp.pro/api

## Authentication APIs

### Register User

- **Endpoint:** POST /api/auth/register
- **Description:** Create new user account
- **Request Body:**
    - email (string, required)
    - password (string, required) - min 8 chars, uppercase, lowercase, digit, special char
    - password_confirm (string, required)
    - fop_group (string, required) - Група 1, 2, 3, or 4
    - is_vat_payer (boolean, optional)
    - is_general_system (boolean, optional)

### Login

- **Endpoint:** POST /api/auth/login
- **Description:** Authenticate user
- **Request Body:**
    - email (string, required)
    - password (string, required)

### Forgot Password

- **Endpoint:** POST /api/auth/forgot-password
- **Description:** Request password reset
- **Request Body:**
    - email (string, required)

### Verify Authentication

- **Endpoint:** GET /api/auth/verify
- **Description:** Check if user is authenticated

---

## Income APIs

### Get All Incomes

- **Endpoint:** GET /api/incomes
- **Query Parameters:**
    - year (optional) - Filter by year (YYYY)
    - month (optional) - Filter by month (1-12)
- **Response:** Array of income records grouped by month

### Get Incomes (Filtered)

- **Endpoint:** GET /api/incomes?year=YYYY&month=MM
- **Description:** Fetch incomes for specific period

### Create Income

- **Endpoint:** POST /api/incomes
- **Request Body:**
    - date (string, required) - DD.MM.YYYY
    - amount (number, required)
    - currency (string, required) - UAH, USD, EUR
    - is_cash (boolean, required) - True for cash, false for card
    - comment (string, optional)

### Update Income

- **Endpoint:** PUT /api/incomes/:id
- **Request Body:** Same as POST

### Delete Income

- **Endpoint:** DELETE /api/incomes/:id
- **Description:** Remove income record

---

## Expense APIs

### Get All Expenses

- **Endpoint:** GET /api/expenses
- **Query Parameters:**
    - year (optional)
    - month (optional)
- **Response:** Array of expense records grouped by month

### Get Expenses (Filtered)

- **Endpoint:** GET /api/expenses?year=YYYY&month=MM

### Create Expense

- **Endpoint:** POST /api/expenses
- **Request Body:**
    - date (string, required) - DD.MM.YYYY
    - amount (number, required)
    - currency (string, required) - UAH, USD, EUR
    - is_cash (boolean, required)
    - comment (string, optional)

### Update Expense

- **Endpoint:** PUT /api/expenses/:id
- **Request Body:** Same as POST

### Delete Expense

- **Endpoint:** DELETE /api/expenses/:id

---

## Tax APIs

### Get All Taxes

- **Endpoint:** GET /api/taxes
- **Description:** Fetch taxes organized by quarter and month
- **Query Parameters:**
    - year (optional)
    - quarter (optional) - Q1, Q2, Q3, Q4

### Get Pending Taxes

- **Endpoint:** GET /api/taxes/pending
- **Description:** Fetch unpaid tax obligations

### Get Paid Taxes

- **Endpoint:** GET /api/taxes/paid
- **Description:** Fetch paid tax obligations

### Get Taxes (Filtered)

- **Endpoint:** GET /api/taxes?year=YYYY&quarter=Q

### Mark Tax as Paid

- **Endpoint:** POST /api/taxes/:id/mark-paid
- **Request Body:**
    - payment_date (string, optional) - DD.MM.YYYY
- **Description:** Update tax status to paid

### Undo Tax Payment

- **Endpoint:** POST /api/taxes/:id/undo-paid
- **Description:** Revert tax from paid to pending status

---

## Report APIs

### Get All Reports

- **Endpoint:** GET /api/reports
- **Description:** Fetch quarterly reports
- **Query Parameters:**
    - year (optional)
    - quarter (optional)
- **Response:** Array of reports organized by year and quarter

### Get Current Reports

- **Endpoint:** GET /api/reports/current
- **Description:** Fetch reports due for submission

### Get Submitted Reports

- **Endpoint:** GET /api/reports/submitted
- **Description:** Fetch already submitted reports

### View Report Details

- **Endpoint:** GET /api/reports/:id
- **Description:** Get specific report with all calculations

### Submit Report

- **Endpoint:** POST /api/reports/:id/submit
- **Request Body:**
    - submission_date (string, optional) - DD.MM.YYYY
- **Description:** Mark report as submitted

### Undo Report Submission

- **Endpoint:** POST /api/reports/:id/undo-submission
- **Description:** Revert report from submitted to pending

### Export Report

- **Endpoint:** GET /api/reports/:id/export
- **Query Parameters:**
    - format (optional) - pdf, excel, csv
- **Description:** Download report in specified format

---

## User Profile APIs

### Get User Profile

- **Endpoint:** GET /api/user/profile
- **Description:** Retrieve user profile information

### Update User Profile

- **Endpoint:** PUT /api/user/profile
- **Request Body:**
    - fop_group (optional)
    - is_vat_payer (optional)
    - is_general_system (optional)

### Get User Settings

- **Endpoint:** GET /api/user/settings
- **Description:** Get user preferences (theme, language, etc.)

### Update User Settings

- **Endpoint:** PUT /api/user/settings
- **Request Body:**
    - theme (optional) - light, dark
    - language (optional) - uk, en

---

## Exchange Rate APIs

### Get Exchange Rates

- **Endpoint:** GET /api/exchange-rates
- **Description:** Fetch current exchange rates for currency conversion
- **Response:**
    - uah_to_usd (number)
    - uah_to_eur (number)
    - usd_to_uah (number)
    - eur_to_uah (number)

---

## Demo Mode API

### Get Demo Data

- **Endpoint:** GET /api/demo/data
- **Description:** Fetch demo mode data (accessible without authentication)
- **Response:** Sample income, expense, tax, and report data

---

## HTTP Status Codes

- **200** - OK - Request succeeded
- **201** - Created - Resource successfully created
- **400** - Bad Request - Invalid parameters
- **401** - Unauthorized - Authentication required or failed
- **404** - Not Found - Resource not found
- **422** - Unprocessable Entity - Validation error
- **500** - Internal Server Error - Server error

---

## Error Response Format

```json
{
    "error": "Error message",
    "code": "ERROR_CODE",
    "details": {}
}
```
