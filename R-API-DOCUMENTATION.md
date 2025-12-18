# FOP Helper API Documentation

## Overview

The FOP Helper API is a RESTful API for managing freelance/self-employed (FOP - Фізична особа-підприємець) financial records, including income, expenses, tax calculations, and reporting for Ukrainian tax system.

**Base URL:** `https://your-domain.com/api`

**API Versions:**

- **v1** - Legacy endpoints at `/api/{controller}`
- **v2** - Current version at `/api/v2/{controller}` (recommended)

**Authentication:** JWT Bearer tokens via HTTP-only cookies

---

## Table of Contents

1. [Authentication](#authentication)
2. [API v2 Endpoints](#api-v2-endpoints)
    - [Expenses](#expenses-v2)
    - [Incomes](#incomes-v2)
    - [Reports](#reports-v2)
    - [Taxes](#taxes-v2)
    - [Government Sums (Admin)](#government-sums-v2)
3. [API v1 Endpoints](#api-v1-endpoints)
4. [Request/Response Models](#requestresponse-models)
5. [Error Handling](#error-handling)

---

## Authentication

### Overview

The API uses JWT (JSON Web Token) authentication with cookies. Tokens are stored in HTTP-only cookies for security.

**Cookie Names:**

- `X-Access-Token` - JWT access token (expires in 3 hours)
- `X-Username` - Username
- `X-Refresh-Token` - Refresh token (expires in 6 hours)
- `Session-User` - Session username

### Endpoints

#### POST `/api/react/authenticate/login`

Login and receive authentication tokens.

**Request Body:**

```json
{
    "username": "string",
    "password": "string"
}
```

**Response (200 OK):**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiration": "2025-12-16T15:30:00Z",
    "refreshToken": "refresh_token_string"
}
```

**Cookies Set:**

- `X-Access-Token` (HttpOnly, SameSite=Strict)
- `X-Username` (HttpOnly, SameSite=Strict)
- `X-Refresh-Token` (HttpOnly, SameSite=Strict)
---

#### POST `/api/react/authenticate/register`

Register a new user account.

**Request Body:**

```json
{
    "email": "user@example.com",
    "password": "SecurePassword123!",
    "fopVat": true,
    "fopGeneral": false,
    "fopGroup": 3
}
```

**Fields:**

- `email` (required) - Valid email address
- `password` (required) - Password
- `fopVat` - Whether user is VAT registered
- `fopGeneral` - Whether user uses general taxation
- `fopGroup` (required) - FOP group number (1-4)

**Response (200 OK):**

```json
{
    "status": "Success",
    "message": "User created successfully!",
    "userId": "user-guid-here",
    "hash": "confirmation-hash"
}
```

---

#### GET `/api/react/authenticate/confirm?userId={userId}&code={code}`

Confirm email address after registration.

**Query Parameters:**

- `userId` - User ID from registration response
- `code` - Confirmation code from email

**Response (200 OK):**

```json
{
    "status": "Success",
    "message": "Email confirmed successfully"
}
```

---

#### GET `/api/react/authenticate/refresh`

Refresh JWT token using refresh token from cookies.

**Authorization:** Requires valid `X-Refresh-Token` cookie

**Response:** Sets new authentication cookies with extended expiration

---

#### GET `/api/react/authenticate/logout`

Logout and clear authentication cookies.

**Authorization:** Required

**Response (200 OK):**

```json
{
    "message": "Logged out successfully"
}
```

---

#### GET `/api/react/authenticate/show`

Get current authenticated user information.

**Authorization:** Required

**Response (200 OK):**

```json
{
    "username": "user@example.com",
    "token": "current_jwt_token"
}
```

---

#### GET `/api/react/authenticate/checkadmin`

Check if current user has admin role.

**Authorization:** Required

**Response (200 OK):**

```json
true
```

---

#### DELETE `/api/react/authenticate/remove`

Delete current user account and all associated data.

**Authorization:** Required

**Response (200 OK):**

```json
{
    "status": "Success",
    "message": "User and all data deleted"
}
```

**Warning:** This action is irreversible and deletes all user data including incomes, expenses, taxes, and reports.

---

## API v2 Endpoints

API version 2 provides improved validation, service-based architecture, and better error handling compared to v1.

### Expenses (v2)

Base path: `/api/v2/expenses`

All endpoints require authentication.

---

#### GET `/api/v2/expenses`

Get all expenses for the authenticated user, grouped by year and month.

**Authorization:** Required

**Response (200 OK):**

```json
{
  "2025-12": [
    {
      "id": "expense-guid",
      "dt": "2025-12-15T10:30:00",
      "expense": 1500.00,
      "currency": "UAH",
      "comment": "Office supplies",
      "cash": false,
      "userID": "user-guid"
    }
  ],
  "2025-11": [...]
}
```

---

#### POST `/api/v2/expenses/add`

Create a new expense record.

**Authorization:** Required

**Request Body:**

```json
{
    "date": "2025-12-15",
    "expense": "1500.00",
    "currency": "UAH",
    "comment": "Office supplies",
    "cash": false
}
```

**Validation:**

- Date cannot be in a period where taxes are already paid
- User can only add expenses to their own account

**Response (200 OK):**

```json
{
    "status": "Success",
    "message": "Expense added with ID: expense-guid"
}
```

---

#### POST `/api/v2/expenses/update`

Update an existing expense record.

**Authorization:** Required

**Request Body:**

```json
{
    "id": "expense-guid",
    "date": "2025-12-15",
    "expense": "1600.00",
    "currency": "UAH",
    "comment": "Updated office supplies",
    "cash": false
}
```

**Validation:**

- User must own the expense
- Cannot edit expenses in periods with paid taxes
- Triggers tax recalculation

**Response (200 OK):**

```json
{
    "status": "Success",
    "message": "Expense updated"
}
```

---

#### POST `/api/v2/expenses/delete`

Delete an expense record.

**Authorization:** Required

**Request Body:**

```json
{
    "id": "expense-guid"
}
```

**Validation:**

- User must own the expense
- Cannot delete expenses in periods with paid taxes
- Triggers tax recalculation

**Response (200 OK):**

```json
{
    "status": "Success",
    "message": "Expense deleted"
}
```

---

### Incomes (v2)

Base path: `/api/v2/incomes`

All endpoints require authentication.

---

#### GET `/api/v2/incomes`

Get all incomes for the authenticated user, grouped by year and month.

**Authorization:** Required

**Response (200 OK):**

```json
{
  "2025-12": [
    {
      "id": "income-guid",
      "dt": "2025-12-15T10:30:00",
      "income": 15000.00,
      "currency": "UAH",
      "comment": "Consulting services",
      "cash": false,
      "userID": "user-guid"
    }
  ],
  "2025-11": [...]
}
```

---

#### POST `/api/v2/incomes/add`

Create a new income record.

**Authorization:** Required

**Request Body:**

```json
{
    "date": "2025-12-15",
    "income": "15000.00",
    "currency": "USD",
    "comment": "Consulting services",
    "cash": false
}
```

**Features:**

- Automatically converts foreign currency to UAH using NBU exchange rates
- Validates edit eligibility based on tax payment status
- Triggers tax calculation

**Response (200 OK):**

```json
{
    "status": "Success",
    "message": "Income added with ID: income-guid"
}
```

---

#### POST `/api/v2/incomes/update`

Update an existing income record.

**Authorization:** Required

**Request Body:**

```json
{
    "id": "income-guid",
    "date": "2025-12-15",
    "income": "16000.00",
    "currency": "USD",
    "comment": "Updated consulting services",
    "cash": false
}
```

**Validation:**

- User must own the income
- Cannot edit incomes in periods with paid taxes
- Triggers tax recalculation

**Response (200 OK):**

```json
{
    "status": "Success",
    "message": "Income updated"
}
```

---

#### POST `/api/v2/incomes/delete`

Delete an income record.

**Authorization:** Required

**Request Body:**

```json
{
    "id": "income-guid"
}
```

**Validation:**

- User must own the income
- Cannot delete incomes in periods with paid taxes
- Triggers tax recalculation

**Response (200 OK):**

```json
{
    "status": "Success",
    "message": "Income deleted"
}
```

---

### Reports (v2)

Base path: `/api/v2/reports`

All endpoints require authentication.

---

#### GET `/api/v2/reports?pending={true|false}`

Generate reports for current period(s).

**Authorization:** Required

**Query Parameters:**

- `pending` (optional, boolean) - Filter by pending status
    - `true` - Only unsent/pending reports
    - `false` - All reports

**Response (200 OK):**

```json
{
    "2025-Q4": {
        "id": "report-guid",
        "date": "2025-12-31T00:00:00",
        "quarter": 4,
        "incomes": 45000.0,
        "expenses": 12000.0,
        "flatTax": 2970.0,
        "flatTaxQ": 742.5,
        "ssp": 1760.0,
        "vat": 6750.0
    }
}
```

---

#### POST `/api/v2/reports/details`

Generate detailed report calculations.

**Authorization:** Required

**Request Body:**

```json
{
    "id": "report-guid",
    "date": "2025-12-31",
    "incomes": 45000.0,
    "expenses": 12000.0,
    "ssp": 1760.0,
    "flatTax": 2970.0,
    "flatTaxQ": 742.5,
    "vat": 6750.0,
    "militaryTax": 135.0
}
```

**Response (200 OK):**

```json
{
    "date": "2025-12-31",
    "quarter": 4,
    "data": [
        45000.0, // Index 0: Total incomes
        12000.0, // Index 1: Total expenses
        2970.0, // Index 2: Flat tax
        742.5, // Index 3: Quarterly flat tax
        1760.0, // Index 4: Social security (SSP/ESV)
        6750.0, // Index 5: VAT (PDV)
        135.0 // Index 6: Military tax
        // ... additional calculated fields
    ]
}
```

---

#### GET `/api/v2/reports/saved`

Get all saved/submitted reports.

**Authorization:** Required

**Response (200 OK):**

```json
{
    "2025-Q4": {
        "id": "report-guid",
        "date": "2025-12-31T00:00:00",
        "incomes": 45000.0,
        "expenses": 12000.0,
        "flatTax": 2970.0,
        "ssp": 1760.0,
        "vat": 6750.0,
        "submitted": true
    }
}
```

---

#### POST `/api/v2/reports/save`

Save/submit a report to database.

**Authorization:** Required

**Request Body:**

```json
{
    "id": "report-guid",
    "date": "2025-12-31T00:00:00",
    "incomes": 45000.0,
    "expenses": 12000.0,
    "flatTax": 2970.0,
    "flatTaxQ": 742.5,
    "ssp": 1760.0,
    "vat": 6750.0,
    "userID": "user-guid"
}
```

**Response (200 OK):**

```json
{
    "status": "Success",
    "message": "Report saved"
}
```

---

#### POST `/api/v2/reports/remove`

Delete a saved report.

**Authorization:** Required

**Request Body (as form data or query string):**

```
repID=report-guid
```

**Response (200 OK):**

```json
{
    "status": "Success",
    "message": "Report removed"
}
```

---

### Taxes (v2)

Base path: `/api/v2/taxes`

All endpoints require authentication.

---

#### GET `/api/v2/taxes`

Get all taxes (both pending and paid).

**Authorization:** Required

**Response (200 OK):**

```json
{
    "2025-Q4": [
        {
            "id": "tax-guid",
            "dt": "2025-12-31T00:00:00",
            "amount": 2970.0,
            "payDate": null,
            "taxType": "FlatTax",
            "quarter": 4,
            "year": 2025,
            "userID": "user-guid"
        }
    ]
}
```

---

#### GET `/api/v2/taxes/pending`

Get only pending (unpaid) taxes.

**Authorization:** Required

**Response (200 OK):**

```json
{
    "2025-Q4": [
        {
            "id": "tax-guid",
            "dt": "2025-12-31T00:00:00",
            "amount": 2970.0,
            "payDate": null,
            "taxType": "FlatTax",
            "quarter": 4,
            "year": 2025
        }
    ]
}
```

---

#### GET `/api/v2/taxes/payed`

Get only paid taxes.

**Authorization:** Required

**Response (200 OK):**

```json
{
    "2025-Q3": [
        {
            "id": "tax-guid",
            "dt": "2025-09-30T00:00:00",
            "amount": 2500.0,
            "payDate": "2025-10-15T00:00:00",
            "taxType": "FlatTax",
            "quarter": 3,
            "year": 2025
        }
    ]
}
```

---

#### POST `/api/v2/taxes/pay`

Mark a tax as paid.

**Authorization:** Required

**Request Body:**

```json
{
    "id": "tax-guid"
}
```

**Effect:**

- Sets the `payDate` to current date/time
- Prevents editing of incomes/expenses in that tax period

**Response (200 OK):**

```json
{
    "status": "Success",
    "message": "Tax marked as paid"
}
```

---

#### POST `/api/v2/taxes/remove`

Unpay a tax (mark as unpaid) and recalculate pending taxes.

**Authorization:** Required

**Request Body:**

```json
{
    "id": "tax-guid"
}
```

**Effect:**

- Removes the `payDate`
- Recalculates all pending taxes
- Allows editing of incomes/expenses in that period again

**Response (200 OK):**

```json
{
    "status": "Success",
    "message": "Tax unpaid and pending taxes recalculated"
}
```

---

### Government Sums (v2)

Base path: `/api/v2/govsums`

**All endpoints require Admin role.**

These endpoints manage government reference data like minimum salary, tax rates, and social security amounts used for tax calculations.

---

#### GET `/api/v2/govsums`

Get all government sums/rates.

**Authorization:** Required (Admin role)

**Response (200 OK):**

```json
[
    {
        "id": 1,
        "date": "2025-01-01T00:00:00",
        "minSalary": 8000.0,
        "flatTaxRate": 0.09,
        "sspRate": 0.22,
        "vatRate": 0.2,
        "militaryTaxRate": 0.015
    }
]
```

---

#### POST `/api/v2/govsums`

Add new government sum/rate record.

**Authorization:** Required (Admin role)

**Request Body:**

```json
{
    "date": "2025-01-01",
    "minSalary": 8000.0,
    "flatTaxRate": 0.09,
    "sspRate": 0.22,
    "vatRate": 0.2,
    "militaryTaxRate": 0.015
}
```

**Response (200 OK):**

```json
{
    "status": "Success",
    "message": "GovSum added with ID: 1"
}
```

---

#### POST `/api/v2/govsums/edit`

Edit existing government sum/rate record.

**Authorization:** Required (Admin role)

**Request Body:**

```json
{
    "id": 1,
    "date": "2025-01-01T00:00:00",
    "minSalary": 8500.0,
    "flatTaxRate": 0.09,
    "sspRate": 0.22,
    "vatRate": 0.2,
    "militaryTaxRate": 0.015
}
```

**Response (200 OK):**

```json
{
    "status": "Success",
    "message": "GovSum updated"
}
```

---

#### DELETE `/api/v2/govsums/delete?id={id}`

Delete government sum/rate record.

**Authorization:** Required (Admin role)

**Query Parameters:**

- `id` (integer) - ID of record to delete

**Response (204 No Content)**

---

## API v1 Endpoints

API v1 endpoints are available for backwards compatibility but v2 is recommended for new integrations.

### Key Differences from v2:

- No service layer abstraction
- Less validation
- Different route patterns
- Direct repository access

### Available v1 Controllers:

- **Expenses:** `/api/expenses` - Same methods as v2 but less validation
- **Incomes:** `/api/incomes` - Same methods as v2 but less validation
- **Reports:** `/api/reports` - Routes differ (`/all`, `/done` vs v2's query params)
- **Taxes:** `/api/taxes` - Similar functionality with less error handling

**Note:** Refer to v2 documentation above for request/response formats as they are largely compatible.

---

## Request/Response Models

### Authentication Models

#### LoginModel

```typescript
{
    username: string; // Required
    password: string; // Required
}
```

#### RegisterModel

```typescript
{
    email: string; // Required, valid email
    password: string; // Required
    fopVat: boolean; // VAT registration status
    fopGeneral: boolean; // General taxation flag
    fopGroup: number; // Required, 1-4
}
```

#### Response (Generic)

```typescript
{
  status: string;     // "Success" or "Error"
  message: string;    // Status message
  userId?: string;    // Optional user ID
  hash?: string;      // Optional confirmation hash
}
```

---

### Income/Expense Models

#### IncomeEdit

```typescript
{
  id?: string;         // Optional for add, required for update/delete
  date: string;        // Format: "YYYY-MM-DD"
  income: string;      // Decimal as string
  currency: string;    // "UAH", "USD", "EUR", etc.
  comment: string;     // Description
  cash: boolean;       // Cash vs electronic payment
}
```

#### ExpenseEdit

```typescript
{
  id?: string;         // Optional for add, required for update/delete
  date: string;        // Format: "YYYY-MM-DD"
  expense: string;     // Decimal as string
  currency: string;    // "UAH", "USD", "EUR", etc.
  comment: string;     // Description
  cash: boolean;       // Cash vs electronic payment
}
```

---

### Report Models

#### RepDetailsInModel (Request)

```typescript
{
    id: string;
    date: string;
    incomes: number; // decimal
    expenses: number; // decimal
    ssp: number; // Social security (ESV)
    flatTax: number; // EP (Єдиний податок)
    flatTaxQ: number; // Quarterly flat tax
    vat: number; // PDV (ПДВ)
    militaryTax: number; // Військовий збір
}
```

#### RepDetailsModel (Response)

```typescript
{
  date: string;
  quarter: number;      // 1-4
  data: number[];       // Array of 23+ calculated values
}
```

#### SaveRepModel / Report

```typescript
{
  id?: string;
  date: string;         // ISO date string
  incomes: number;
  expenses: number;
  flatTax: number;
  flatTaxQ: number;
  ssp: number;
  vat: number;
  userID: string;
}
```

---

### Tax Models

#### TaxPayEdit

```typescript
{
    id: string; // Tax record ID
}
```

#### Tax (Entity)

```typescript
{
    id: string;
    dt: string; // ISO date string
    amount: number; // decimal
    payDate: string | null; // ISO date string or null if unpaid
    taxType: string; // "FlatTax", "SSP", "VAT", etc.
    quarter: number; // 1-4
    year: number;
    userID: string;
}
```

---

### Government Models

#### GovsumsEditModel

```typescript
{
    date: string; // Format: "YYYY-MM-DD"
    minSalary: number; // Minimum wage amount
    flatTaxRate: number; // Rate as decimal (e.g., 0.09 for 9%)
    sspRate: number; // Social security rate
    vatRate: number; // VAT rate
    militaryTaxRate: number; // Military tax rate
}
```

#### GovSums (Entity)

```typescript
{
    id: number;
    date: string; // ISO date string
    minSalary: number;
    flatTaxRate: number;
    sspRate: number;
    vatRate: number;
    militaryTaxRate: number;
}
```

---

## Error Handling

### Standard Error Responses

#### 400 Bad Request

```json
{
    "status": "Error",
    "message": "Validation error description"
}
```

Common causes:

- Missing required fields
- Invalid data format
- Attempting to edit records in paid tax periods
- Ownership validation failure

---

#### 401 Unauthorized

```json
{
    "status": "Error",
    "message": "Unauthorized"
}
```

Causes:

- Missing or invalid JWT token
- Expired token (check `Token-Expired` response header)

---

#### 403 Forbidden

```json
{
    "status": "Error",
    "message": "Admin access required"
}
```

Causes:

- Attempting to access admin-only endpoints without admin role

---

#### 404 Not Found

```json
{
    "status": "Error",
    "message": "Resource not found"
}
```

---

#### 500 Internal Server Error

```json
{
    "status": "Error",
    "message": "Internal server error description"
}
```

---

## Testing & Usage Notes

### Authentication Flow for Testing

1. **Register:** POST to `/api/react/authenticate/register`
2. **Confirm Email:** GET to `/api/react/authenticate/confirm` with userId and code
3. **Login:** POST to `/api/react/authenticate/login`
4. **Use API:** Cookies are automatically sent with requests
5. **Refresh Token:** GET to `/api/react/authenticate/refresh` before expiration
6. **Logout:** GET to `/api/react/authenticate/logout`

### Cookie-Based Authentication

The API uses HTTP-only cookies for JWT tokens. For testing with tools like Postman or Insomnia:

1. Enable cookie jar / automatic cookie handling
2. After login, cookies are stored automatically
3. Subsequent requests include cookies automatically
4. No need to manually add Authorization headers

### Currency Conversion

When adding incomes in foreign currency:

- API automatically fetches NBU (National Bank of Ukraine) exchange rates
- Converts amount to UAH for tax calculations
- Original currency is preserved in records

### Tax Calculation

- Taxes are calculated automatically when incomes/expenses are added/modified
- Grouped by quarters (3-month periods)
- Cannot edit income/expense records after taxes for that period are paid
- Unpaying taxes allows editing of that period again

### Date Formats

- **Input (requests):** `"YYYY-MM-DD"` (e.g., `"2025-12-16"`)
- **Output (responses):** ISO 8601 format (e.g., `"2025-12-16T10:30:00Z"`)

---

## Support & Contact

For issues or questions about the API:

- Check application logs for detailed error messages
- Verify authentication cookies are being sent
- Ensure dates are in correct format
- Contact your instructor or administrator

---

**Last Updated:** December 2025
**API Version:** v2.0
