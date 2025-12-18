# FOP Help - Comprehensive Test Plan

## Application Overview

FOP Help (фінансова платформа для ФОП) is a Ukrainian financial management system designed for individual entrepreneurs (ФОП - фізичних осіб-підприємців). The platform provides comprehensive tools for managing incomes, expenses, taxes, and generating compliance reports for Ukrainian tax authorities. Key features include income and expense tracking, automatic tax calculations (ЄП, ЄСВ, ВП, ПДВ), quarterly tax reporting, and support for multiple currencies. The system operates in demo mode for unauthenticated users and requires authentication for real data access. It supports both light and dark themes.

## Test Scenarios

### 1. Authentication & Account Management

**Seed:** `tests/seed.spec.ts`

#### 1.1. User Registration with Valid Data

**File:** `tests/authentication/registration-valid.spec.ts`

**Steps:**
  1. Navigate to https://new.fophelp.pro/
  2. Click the 'Реєстрація' (Registration) button
  3. Enter a valid email address (e.g., testuser@example.com)
  4. Enter a password meeting all requirements (minimum 8 characters, uppercase, lowercase, digit, special character)
  5. Confirm the password in the confirmation field
  6. Select a FOP group from the dropdown (Група 1-4)
  7. Optionally check 'Платник ПДВ' (VAT Payer) checkbox
  8. Optionally check 'ФОП на загальній системі оподаткування' (General Taxation System) checkbox
  9. Click 'Зареєструватися' (Register) button
  10. Verify successful account creation and redirect to dashboard or verification prompt

**Expected Results:**
  - All password requirement indicators should turn green as criteria are met
  - Register button should become enabled when all requirements are satisfied
  - User account should be created successfully
  - System should confirm successful registration with appropriate message or redirect

#### 1.2. User Registration with Weak Password

**File:** `tests/authentication/registration-weak-password.spec.ts`

**Steps:**
  1. Navigate to https://new.fophelp.pro/
  2. Click the 'Реєстрація' (Registration) button
  3. Enter a valid email address
  4. Enter a weak password (e.g., 'password123' - missing special character)
  5. Enter the same weak password in confirmation field
  6. Observe password requirement indicators
  7. Attempt to click 'Зареєструватися' button
  8. Verify error handling

**Expected Results:**
  - Password requirement indicators should show which criteria are not met
  - Register button should remain disabled until all requirements are satisfied
  - Error message should clearly indicate missing password requirements

#### 1.3. User Login with Valid Credentials

**File:** `tests/authentication/login-valid.spec.ts`

**Steps:**
  1. Navigate to https://new.fophelp.pro/
  2. Click the 'Увійти' (Login) button
  3. Enter registered email address
  4. Enter correct password
  5. Click 'Увійти' button
  6. Verify successful login and dashboard access

**Expected Results:**
  - Login modal should appear with email and password fields
  - User should be authenticated and redirected to main dashboard
  - Authenticated user data should load
  - Navigation should show user-specific content instead of demo data

#### 1.4. User Login with Invalid Credentials

**File:** `tests/authentication/login-invalid.spec.ts`

**Steps:**
  1. Navigate to https://new.fophelp.pro/
  2. Click the 'Увійти' (Login) button
  3. Enter incorrect email address
  4. Enter incorrect password
  5. Click 'Увійти' button
  6. Observe error message

**Expected Results:**
  - System should display error message for invalid credentials
  - User should remain on login page
  - No authentication should occur

#### 1.5. Forgot Password Functionality

**File:** `tests/authentication/forgot-password.spec.ts`

**Steps:**
  1. Navigate to https://new.fophelp.pro/
  2. Click the 'Увійти' (Login) button
  3. Click 'Забули пароль?' (Forgot Password) link
  4. Enter registered email address
  5. Click password reset button
  6. Verify reset email sent confirmation

**Expected Results:**
  - Password reset modal or page should appear
  - System should confirm password reset link sent to email
  - User should receive password reset instructions via email

#### 1.6. Switch Between Login and Registration Forms

**File:** `tests/authentication/switch-forms.spec.ts`

**Steps:**
  1. Navigate to https://new.fophelp.pro/
  2. Click 'Реєстрація' (Registration) button
  3. Verify registration form is displayed
  4. Click 'Увійти' (Login) link in registration form
  5. Verify login form is displayed
  6. Click 'Зареєструватися' (Register) link in login form
  7. Verify registration form is displayed again

**Expected Results:**
  - Forms should switch seamlessly between login and registration
  - Each form should display appropriate fields and labels
  - Links should allow smooth navigation between forms

### 2. Income Management

**Seed:** `tests/seed.spec.ts`

#### 2.1. View Income List in Demo Mode

**File:** `tests/incomes/view-income-list.spec.ts`

**Steps:**
  1. Navigate to https://new.fophelp.pro/
  2. Click 'Прибутки' (Incomes) link in navigation
  3. Observe the income list display
  4. Note the demo mode message at the top
  5. Verify income records are grouped by month
  6. Check summary statistics for total income

**Expected Results:**
  - Income page should load successfully
  - Demo mode banner should display with message about real data requiring login
  - Demo incomes should be displayed in table format
  - Income records should be grouped by month (e.g., 'червень 2025 р.')
  - Currency-specific totals should be displayed (UAH, USD, EUR)
  - Total count and amount per month should be visible

#### 2.2. Filter Income by Year and Month

**File:** `tests/incomes/filter-income.spec.ts`

**Steps:**
  1. Navigate to Incomes page
  2. Click 'Всі роки' (All Years) dropdown
  3. Select a specific year (e.g., 2024)
  4. Verify income list updates to show only selected year
  5. Click 'Всі місяці' (All Months) dropdown
  6. Select a specific month
  7. Verify income list updates accordingly

**Expected Results:**
  - Year filter should reduce displayed incomes to selected year
  - Month filter should further narrow results to selected month
  - Summary statistics should update based on applied filters
  - Table should display filtered results correctly

#### 2.3. View Income Details

**File:** `tests/incomes/view-income-details.spec.ts`

**Steps:**
  1. Navigate to Incomes page
  2. Locate an income record in the table
  3. Verify income record displays: date, amount, currency, payment method, comment
  4. Observe action buttons (edit and delete) for each record
  5. Verify pagination or load-more functionality if many records exist

**Expected Results:**
  - Each income record should display complete information
  - Income columns should show: Date, Amount, Currency, Payment Method (cash/card), Comment
  - Edit (✏️) and delete (🗑️) buttons should be visible for each record
  - Records should be sortable by month within grouped view

#### 2.4. Add New Income Entry

**File:** `tests/incomes/add-income.spec.ts`

**Steps:**
  1. Navigate to Incomes page
  2. Click '+ Додати прибуток' (Add Income) button
  3. Fill in income details: date, amount, currency, payment method, comment
  4. Click save button
  5. Verify new income appears in the list
  6. Verify totals are updated

**Expected Results:**
  - Add income modal or form should appear
  - All required fields should be fillable
  - New income should be added to the appropriate month section
  - Summary totals should reflect the new income amount

#### 2.5. Edit Existing Income Entry

**File:** `tests/incomes/edit-income.spec.ts`

**Steps:**
  1. Navigate to Incomes page
  2. Click edit button (✏️) on an existing income record
  3. Modify income details (amount, comment, etc.)
  4. Click save button
  5. Verify changes are reflected in the list

**Expected Results:**
  - Income edit modal should open with current values populated
  - All fields should be editable
  - Changes should be saved and reflected immediately in the list
  - Summary totals should update accordingly

#### 2.6. Delete Income Entry

**File:** `tests/incomes/delete-income.spec.ts`

**Steps:**
  1. Navigate to Incomes page
  2. Note the income total before deletion
  3. Click delete button (🗑️) on an income record
  4. Confirm deletion if prompt appears
  5. Verify record is removed from list
  6. Verify totals are updated

**Expected Results:**
  - Confirmation dialog should appear before deletion
  - Income record should be removed from the list
  - Summary totals should decrease by the deleted amount

#### 2.7. Income Summary Statistics Display

**File:** `tests/incomes/income-summary.spec.ts`

**Steps:**
  1. Navigate to Incomes page
  2. Locate summary statistics section showing currency totals
  3. Verify display of UAH, USD, EUR amounts
  4. Apply different filters and verify totals update
  5. Check month-specific summaries at bottom of each month section

**Expected Results:**
  - Main summary should display total income by currency
  - Each month section should display monthly total
  - Record count should be displayed per month
  - Totals should update when filters are applied
  - All currency conversions should use consistent rates

### 3. Expense Management

**Seed:** `tests/seed.spec.ts`

#### 3.1. View Expense List in Demo Mode

**File:** `tests/expenses/view-expense-list.spec.ts`

**Steps:**
  1. Navigate to https://new.fophelp.pro/
  2. Click 'Витрати' (Expenses) link in navigation
  3. Observe the expense list display
  4. Verify expenses are grouped by month
  5. Check summary statistics for total expenses

**Expected Results:**
  - Expenses page should load successfully
  - Demo mode banner should display
  - Demo expenses should be displayed in table format
  - Expense records should be grouped by month
  - Total expense amount per month should be visible

#### 3.2. Filter Expenses by Year and Month

**File:** `tests/expenses/filter-expenses.spec.ts`

**Steps:**
  1. Navigate to Expenses page
  2. Click 'Всі роки' (All Years) dropdown and select a year
  3. Click 'Всі місяці' (All Months) dropdown and select a month
  4. Verify expense list updates with filters applied

**Expected Results:**
  - Expense filters should work similarly to income filters
  - Summary statistics should update based on filter selections
  - Only expenses from selected period should be displayed

#### 3.3. View Expense Categories

**File:** `tests/expenses/view-categories.spec.ts`

**Steps:**
  1. Navigate to Expenses page
  2. Review different expense records
  3. Identify expense categories (office rent, utilities, software, insurance, etc.)
  4. Apply grouping filter if available (По категоріям)

**Expected Results:**
  - Expenses should be categorized appropriately
  - Comments should clearly indicate expense type/category
  - System should support various business expense types

#### 3.4. Add New Expense Entry

**File:** `tests/expenses/add-expense.spec.ts`

**Steps:**
  1. Navigate to Expenses page
  2. Click '+ Додати витрату' (Add Expense) button
  3. Fill in expense details: date, amount, currency, payment method, comment
  4. Click save button
  5. Verify new expense appears in the list

**Expected Results:**
  - Add expense modal should appear
  - New expense should be added to appropriate month section
  - Summary totals should reflect new expense

#### 3.5. Edit Existing Expense Entry

**File:** `tests/expenses/edit-expense.spec.ts`

**Steps:**
  1. Navigate to Expenses page
  2. Click edit button (✏️) on an expense record
  3. Modify expense details
  4. Save changes
  5. Verify changes appear in the list

**Expected Results:**
  - Expense edit modal should open with current values
  - Changes should be saved and reflected immediately

#### 3.6. Delete Expense Entry

**File:** `tests/expenses/delete-expense.spec.ts`

**Steps:**
  1. Navigate to Expenses page
  2. Note total expenses before deletion
  3. Click delete button (🗑️) on an expense record
  4. Confirm deletion
  5. Verify record is removed and totals updated

**Expected Results:**
  - Confirmation dialog should appear
  - Record should be removed from list
  - Summary totals should decrease accordingly

#### 3.7. Expense vs Income Ratio Analysis

**File:** `tests/expenses/expense-income-ratio.spec.ts`

**Steps:**
  1. Navigate to Expenses page
  2. Note total expenses amount
  3. Navigate to Incomes page
  4. Note total incomes amount
  5. Calculate profit/loss margin mentally
  6. Navigate back to Expenses and verify consistency with Taxes page calculations

**Expected Results:**
  - Totals should remain consistent across pages
  - Profit calculations should be based on accurate income and expense data
  - System should properly calculate tax bases on income-expense differences

### 4. Tax Management

**Seed:** `tests/seed.spec.ts`

#### 4.1. View All Taxes Overview

**File:** `tests/taxes/view-all-taxes.spec.ts`

**Steps:**
  1. Navigate to https://new.fophelp.pro/
  2. Click 'Податки' (Taxes) dropdown in navigation
  3. Click 'Усі' (All) option
  4. Observe tax overview page
  5. Verify quarterly tax breakdown is displayed
  6. Check tax type columns: ЄП (Unified Tax), ЄСВ (Unified Social Contribution), ВП (Personal Income Tax), ПДВ (VAT)

**Expected Results:**
  - Taxes page should display overview of all taxes
  - Data should be organized by quarter
  - Each quarter should show month-by-month breakdown
  - Tax types should be clearly labeled with Ukrainian abbreviations
  - Totals should be calculated correctly per quarter

#### 4.2. View Pending Taxes

**File:** `tests/taxes/view-pending-taxes.spec.ts`

**Steps:**
  1. Navigate to Taxes section
  2. Click 'Несплачені' (Pending/Unpaid) option
  3. Observe list of unpaid tax obligations
  4. Verify payment status indicators
  5. Check payment deadlines

**Expected Results:**
  - Pending taxes tab should display only unpaid obligations
  - Payment deadlines should be clearly displayed
  - Total pending amount should be calculated
  - Status indicators should show unpaid items

#### 4.3. View Paid Taxes

**File:** `tests/taxes/view-paid-taxes.spec.ts`

**Steps:**
  1. Navigate to Taxes section
  2. Click 'Сплачені' (Paid) option
  3. Observe list of paid tax obligations
  4. Verify payment confirmation indicators
  5. Check payment dates

**Expected Results:**
  - Paid taxes tab should display only paid obligations
  - Payment dates and confirmation should be visible
  - Completed status should be clearly marked

#### 4.4. Filter Taxes by Quarter and Year

**File:** `tests/taxes/filter-taxes.spec.ts`

**Steps:**
  1. Navigate to Taxes page
  2. Click 'Всі роки' (All Years) dropdown and select specific year
  3. Click 'Всі квартали' (All Quarters) dropdown and select quarter
  4. Verify tax calculations for selected period

**Expected Results:**
  - Filter should reduce display to selected period
  - Totals should recalculate for selected quarter
  - All tax types should be shown for selected period

#### 4.5. Tax Calculation Accuracy

**File:** `tests/taxes/tax-calculation.spec.ts`

**Steps:**
  1. Navigate to Incomes page and note income for specific month
  2. Navigate to Expenses page and note expenses for same month
  3. Navigate to Taxes page
  4. Verify tax calculations for that month
  5. Confirm: ЄП (Unified Tax) calculation is correct
  6. Confirm: ЄСВ (Unified Social Contribution) calculation is correct
  7. Confirm: ВП (Personal Income Tax) calculation is correct

**Expected Results:**
  - Tax amounts should be calculated based on income and expense data
  - Each tax type should follow Ukrainian tax law calculations
  - ЄП should be approximately 5% of income or 3% depending on FOP group
  - ЄСВ should match statutory rates
  - Calculations should be transparent and verifiable

#### 4.6. Mark Tax as Paid

**File:** `tests/taxes/mark-tax-paid.spec.ts`

**Steps:**
  1. Navigate to Taxes page
  2. Locate a pending tax obligation
  3. Click payment confirmation button (💳)
  4. Enter payment date if prompted
  5. Save payment record
  6. Verify tax moves to 'Paid' tab

**Expected Results:**
  - Tax status should update from unpaid to paid
  - Record should appear in 'Paid' taxes tab
  - Payment date should be recorded
  - Status indicator should change visually

#### 4.7. Undo Paid Tax Mark

**File:** `tests/taxes/undo-mark-paid.spec.ts`

**Steps:**
  1. Navigate to Taxes page and view paid taxes
  2. Locate a paid tax record
  3. Click undo button (↩️) if available
  4. Confirm action
  5. Verify record returns to pending status

**Expected Results:**
  - Undo action should reverse payment status
  - Record should reappear in pending taxes
  - All related data should remain intact

#### 4.8. Tax Summary Statistics

**File:** `tests/taxes/tax-summary.spec.ts`

**Steps:**
  1. Navigate to Taxes page
  2. Observe summary statistics at top: Income, Expenses, Taxes total
  3. Apply different year/quarter filters
  4. Verify statistics update correctly
  5. Check quarterly totals at bottom of each section

**Expected Results:**
  - Summary should show total income, expenses, and tax amount
  - Statistics should update when filters are applied
  - All calculations should be consistent and accurate

### 5. Reports & Compliance

**Seed:** `tests/seed.spec.ts`

#### 5.1. View All Reports Overview

**File:** `tests/reports/view-all-reports.spec.ts`

**Steps:**
  1. Navigate to https://new.fophelp.pro/
  2. Click 'Звіти' (Reports) dropdown in navigation
  3. Click 'Усі' (All) option
  4. Observe reports overview page
  5. Verify quarterly reports are displayed
  6. Check report status indicators

**Expected Results:**
  - Reports page should load successfully
  - Quarterly reports should be displayed in table format
  - Report columns should show: Quarter, Income, Expenses, Tax amounts, Filing Deadline, Status
  - Status indicators should show submission status (Submitted, Pending, Overdue)

#### 5.2. View Current Reports

**File:** `tests/reports/view-current-reports.spec.ts`

**Steps:**
  1. Navigate to Reports section
  2. Click 'Поточні' (Current) option
  3. Observe reports that are due soon or pending submission
  4. Check filing deadlines
  5. Verify urgent items are highlighted

**Expected Results:**
  - Current reports tab should display reports due for submission
  - Deadlines should be clearly visible
  - Overdue reports should be highlighted/marked

#### 5.3. View Submitted Reports

**File:** `tests/reports/view-submitted-reports.spec.ts`

**Steps:**
  1. Navigate to Reports section
  2. Click 'Подані' (Submitted) option
  3. Observe list of previously submitted reports
  4. Check submission dates
  5. Verify archival reports are accessible

**Expected Results:**
  - Submitted reports tab should display completed filings
  - Submission dates should be recorded
  - Historical reports should be available for reference

#### 5.4. Filter Reports by Year and Quarter

**File:** `tests/reports/filter-reports.spec.ts`

**Steps:**
  1. Navigate to Reports page
  2. Click 'Всі роки' (All Years) and select specific year
  3. Click 'Всі квартали' (All Quarters) and select quarter
  4. Verify report display updates accordingly

**Expected Results:**
  - Filters should narrow report display to selected period
  - Summary statistics should update
  - Only relevant reports should be shown

#### 5.5. View Report Details

**File:** `tests/reports/view-report-details.spec.ts`

**Steps:**
  1. Navigate to Reports page
  2. Click eye icon (👁️) on a report row
  3. Observe detailed report view
  4. Verify all report data is displayed
  5. Check data accuracy against tax and expense records

**Expected Results:**
  - Report details modal should open
  - All report data should be clearly displayed
  - Data should match corresponding tax calculations
  - Report should include all required fields for tax submission

#### 5.6. Mark Report as Submitted

**File:** `tests/reports/submit-report.spec.ts`

**Steps:**
  1. Navigate to Reports page with current/pending reports
  2. Click checkmark button (✓) on a pending report
  3. Confirm submission date if prompted
  4. Verify report status changes to 'Submitted'
  5. Check report appears in 'Submitted' tab

**Expected Results:**
  - Report status should update to submitted
  - Submission date should be recorded
  - Report should move to 'Submitted' tab
  - Status indicator should update visually

#### 5.7. Undo Report Submission

**File:** `tests/reports/undo-submission.spec.ts`

**Steps:**
  1. Navigate to Reports page and view submitted reports
  2. Click undo button (↩️) on a submitted report
  3. Confirm action
  4. Verify report status returns to pending

**Expected Results:**
  - Report should revert to unsubmitted status
  - Report should reappear in current/pending reports
  - All data should remain intact

#### 5.8. Report Filing Deadlines

**File:** `tests/reports/filing-deadlines.spec.ts`

**Steps:**
  1. Navigate to Reports page
  2. Review filing deadlines displayed for each quarter
  3. Verify deadlines match Ukrainian tax law (typically 14-20 days after quarter end)
  4. Check if system highlights overdue reports
  5. Verify deadline information matches tax authority requirements

**Expected Results:**
  - Filing deadlines should be accurately displayed
  - Deadlines should follow Ukrainian tax calendar
  - Q1: before 15.05, Q2: before 14.08, Q3: before 14.11, Q4: before 14.02 next year
  - System should highlight overdue filings

#### 5.9. Report Data Export

**File:** `tests/reports/export-report.spec.ts`

**Steps:**
  1. Navigate to Reports page
  2. Locate a report
  3. Look for export/download option if available
  4. Attempt to export report in available format (PDF, Excel, etc.)
  5. Verify exported file contains correct data

**Expected Results:**
  - Export function should be available for reports
  - Exported files should contain accurate data
  - Multiple export formats should be supported if applicable
  - Downloaded files should be properly formatted

### 6. User Interface & Navigation

**Seed:** `tests/seed.spec.ts`

#### 6.1. Theme Toggle Light to Dark

**File:** `tests/ui/theme-toggle-dark.spec.ts`

**Steps:**
  1. Navigate to https://new.fophelp.pro/
  2. Click theme toggle button (🌙 icon) in header
  3. Observe interface changes to dark theme
  4. Verify all pages remain readable in dark mode
  5. Navigate to different sections and verify theme consistency
  6. Check if preference is remembered on page reload

**Expected Results:**
  - Dark theme should be applied to entire interface
  - All text should remain readable with sufficient contrast
  - Tables, charts, and content should display correctly
  - Theme preference should be remembered across sessions
  - Button should change to show light mode option (☀️)

#### 6.2. Theme Toggle Dark to Light

**File:** `tests/ui/theme-toggle-light.spec.ts`

**Steps:**
  1. In dark mode, click theme toggle button
  2. Verify interface reverts to light theme
  3. Navigate sections and verify consistency
  4. Confirm button shows dark mode option (🌙) again

**Expected Results:**
  - Light theme should be restored
  - All interface elements should display correctly
  - Theme toggle should work smoothly without page reload

#### 6.3. Main Navigation Menu Functionality

**File:** `tests/ui/main-navigation.spec.ts`

**Steps:**
  1. Navigate to https://new.fophelp.pro/
  2. Click 'Прибутки' (Incomes) link
  3. Verify Incomes page loads
  4. Click 'Витрати' (Expenses) link
  5. Verify Expenses page loads
  6. Click 'Податки' dropdown
  7. Verify sub-menu items appear: 'Усі', 'Несплачені', 'Сплачені'
  8. Click 'Звіти' dropdown
  9. Verify sub-menu items appear: 'Усі', 'Поточні', 'Подані'

**Expected Results:**
  - All navigation links should work correctly
  - Correct pages should load when links are clicked
  - Dropdown menus should expand/collapse properly
  - Active page indicator should show current section

#### 6.4. Logo Click Returns to Home

**File:** `tests/ui/logo-navigation.spec.ts`

**Steps:**
  1. Navigate to any section (e.g., Incomes, Expenses, Taxes)
  2. Click FOP Help logo in header
  3. Verify home page loads
  4. Verify 'Ласкаво просимо до FOP Help' heading appears

**Expected Results:**
  - Logo click should navigate to home page from any section
  - Home page should load correctly with welcome content

#### 6.5. Responsive Layout on Mobile

**File:** `tests/ui/responsive-mobile.spec.ts`

**Steps:**
  1. Navigate to https://new.fophelp.pro/
  2. Resize browser to mobile width (375px)
  3. Verify navigation menu adapts for mobile
  4. Check if hamburger menu appears if needed
  5. Navigate to Incomes page on mobile
  6. Verify table displays correctly (horizontal scroll if needed)
  7. Test theme toggle on mobile
  8. Test authentication buttons on mobile

**Expected Results:**
  - Layout should adapt to mobile screen size
  - All content should remain accessible
  - Tables should be scrollable if needed
  - Touch targets should be appropriately sized
  - Navigation should be usable on mobile devices

#### 6.6. Responsive Layout on Tablet

**File:** `tests/ui/responsive-tablet.spec.ts`

**Steps:**
  1. Navigate to application on tablet-sized browser (768px)
  2. Verify layout adapts appropriately
  3. Navigate through different sections
  4. Verify tables and content display correctly
  5. Test touch interactions if applicable

**Expected Results:**
  - Tablet layout should be optimized for medium screens
  - All content should be readable and accessible
  - Navigation should work smoothly on tablet

#### 6.7. Page Loading and Error States

**File:** `tests/ui/loading-error-states.spec.ts`

**Steps:**
  1. Navigate to pages and observe loading behavior
  2. Verify loading indicators appear when data is fetched
  3. Attempt to access pages without authentication
  4. Observe demo mode messages and error handling
  5. Check console for any JavaScript errors
  6. Verify error messages are user-friendly

**Expected Results:**
  - Loading indicators should appear during data fetch
  - Demo mode banner should appear for unauthenticated users
  - Error messages should be clear and helpful
  - No critical JavaScript errors in console
  - System should gracefully handle missing or invalid data

#### 6.8. Accessibility - Keyboard Navigation

**File:** `tests/ui/keyboard-navigation.spec.ts`

**Steps:**
  1. Navigate to https://new.fophelp.pro/
  2. Use Tab key to navigate through interactive elements
  3. Verify focus indicators are visible
  4. Test Enter key on buttons
  5. Test Escape key to close modals
  6. Verify all buttons and links are keyboard accessible

**Expected Results:**
  - All interactive elements should be navigable via keyboard
  - Focus indicators should be clearly visible
  - Enter key should activate buttons
  - Escape key should close modals
  - Tab order should be logical and intuitive

#### 6.9. Form Input Validation Feedback

**File:** `tests/ui/form-validation.spec.ts`

**Steps:**
  1. Navigate to registration modal
  2. Test email field with invalid email
  3. Test password field with weak password
  4. Verify validation messages appear in real-time
  5. Verify requirement checklist updates as criteria are met
  6. Test form submission with incomplete data

**Expected Results:**
  - Validation errors should appear immediately or on blur
  - Error messages should be clear and helpful
  - Password requirements should update in real-time
  - Form submission should be prevented with invalid data

### 7. Data Consistency & Accuracy

**Seed:** `tests/seed.spec.ts`

#### 7.1. Income and Expense Data Consistency

**File:** `tests/data/income-expense-consistency.spec.ts`

**Steps:**
  1. Navigate to Incomes page and record total for a specific month
  2. Navigate to Expenses page and record total for same month
  3. Navigate to Taxes page and verify the month's data
  4. Confirm income and expense amounts match across pages
  5. Verify profit calculation (income - expenses) is consistent

**Expected Results:**
  - Income totals should match across Incomes page and Taxes page
  - Expense totals should match across Expenses page and Taxes page
  - Profit calculations should be consistent and accurate

#### 7.2. Tax Calculation Consistency

**File:** `tests/data/tax-consistency.spec.ts`

**Steps:**
  1. Navigate to Taxes page
  2. Review tax calculations for multiple quarters
  3. Verify calculations are consistent across all periods
  4. Check that tax base (income - expenses) is applied consistently
  5. Confirm tax rates are applied uniformly

**Expected Results:**
  - Tax calculations should follow consistent formulas
  - Same income and expense amounts should produce same tax
  - Rate changes should be properly reflected
  - All calculations should be mathematically accurate

#### 7.3. Report Data Accuracy

**File:** `tests/data/report-accuracy.spec.ts`

**Steps:**
  1. Navigate to Reports page
  2. View a detailed report
  3. Verify report data matches corresponding Incomes, Expenses, and Taxes pages
  4. Check calculations in report match system calculations
  5. Confirm all required data fields are present in report

**Expected Results:**
  - Report data should exactly match underlying transaction data
  - All calculations should be accurate and verifiable
  - Reports should include all required tax authority fields

#### 7.4. Currency Conversion Consistency

**File:** `tests/data/currency-consistency.spec.ts`

**Steps:**
  1. Add income in USD and EUR currencies
  2. Note the amounts in original currency
  3. Verify conversion to UAH is applied consistently
  4. Check if conversion rates are applied uniformly
  5. Verify currency totals are displayed separately and combined

**Expected Results:**
  - Currency conversions should use consistent exchange rates
  - Original currency amounts should be preserved
  - Converted amounts should be clearly labeled
  - Total should properly combine converted amounts

#### 7.5. Demo Data Consistency

**File:** `tests/data/demo-consistency.spec.ts`

**Steps:**
  1. Navigate through all pages in demo mode
  2. Verify demo data is consistent across all sections
  3. Check that same records appear in multiple places
  4. Verify totals are calculated correctly from demo data
  5. Note any realistic patterns in demo data

**Expected Results:**
  - Demo data should be realistic and representative
  - All calculations based on demo data should be accurate
  - Consistent data should appear across pages
  - Demo data should not contain errors or inconsistencies

### 8. Performance & Stability

**Seed:** `tests/seed.spec.ts`

#### 8.1. Page Load Performance

**File:** `tests/performance/page-load-speed.spec.ts`

**Steps:**
  1. Navigate to https://new.fophelp.pro/ and measure load time
  2. Navigate to Incomes page and measure load time
  3. Navigate to Expenses page and measure load time
  4. Navigate to Taxes page and measure load time
  5. Navigate to Reports page and measure load time
  6. Verify all pages load within acceptable time (< 3 seconds)

**Expected Results:**
  - Home page should load quickly
  - Data pages should load and display data smoothly
  - No significant performance degradation between pages
  - Large data sets should load without hanging

#### 8.2. Handling Large Data Sets

**File:** `tests/performance/large-data-handling.spec.ts`

**Steps:**
  1. Navigate to demo pages with multiple years of data
  2. Scroll through long tables of records
  3. Apply filters to large data sets
  4. Verify UI remains responsive
  5. Check for pagination or virtual scrolling

**Expected Results:**
  - Interface should remain responsive with large data
  - Scrolling should be smooth
  - Filtering should complete quickly
  - No lag or freezing should occur

#### 8.3. Browser Compatibility

**File:** `tests/performance/browser-compatibility.spec.ts`

**Steps:**
  1. Test in Chrome/Chromium
  2. Test in Firefox
  3. Test in Safari (if available)
  4. Verify functionality works in all browsers
  5. Check for browser-specific issues

**Expected Results:**
  - Application should work correctly in modern browsers
  - No significant visual or functional differences
  - All features should be accessible in all browsers

#### 8.4. Session Stability

**File:** `tests/performance/session-stability.spec.ts`

**Steps:**
  1. Log in to the application
  2. Navigate through multiple pages
  3. Remain on application for extended period
  4. Perform various actions (add, edit, delete records)
  5. Verify session remains active
  6. Verify no data loss occurs

**Expected Results:**
  - Session should remain active during normal use
  - Data should be preserved across navigation
  - No unexpected logouts should occur
  - User data should be secure and persistent

#### 8.5. Network Error Handling

**File:** `tests/performance/network-error.spec.ts`

**Steps:**
  1. Attempt operations with network connection interrupted
  2. Observe error handling and user feedback
  3. Restore connection
  4. Verify application recovers gracefully
  5. Check if data is preserved

**Expected Results:**
  - Application should display user-friendly error messages
  - No data should be lost due to network errors
  - System should attempt to recover automatically
  - User should be informed of connection status

### 9. Edge Cases & Negative Testing

**Seed:** `tests/seed.spec.ts`

#### 9.1. Boundary Values - Zero and Negative Amounts

**File:** `tests/edge-cases/boundary-amounts.spec.ts`

**Steps:**
  1. Attempt to enter zero amount for income/expense
  2. Attempt to enter negative amount
  3. Attempt to enter extremely large amount
  4. Verify system validation and error messages
  5. Verify calculations work correctly with valid amounts

**Expected Results:**
  - Zero amounts should be rejected or handled appropriately
  - Negative amounts should be rejected for income
  - System should define maximum allowed amounts
  - Clear validation messages should guide users

#### 9.2. Date Boundary Conditions

**File:** `tests/edge-cases/boundary-dates.spec.ts`

**Steps:**
  1. Enter transaction with date at month boundary
  2. Enter transaction with date at year boundary
  3. Enter transaction with future date
  4. Enter transaction with very old date
  5. Verify system correctly categorizes and calculates

**Expected Results:**
  - Month boundaries should be handled correctly
  - Year transitions should work properly
  - Future dates may be allowed or rejected based on business rules
  - Old dates should be allowed for historical data
  - Calculations should use correct period categorization

#### 9.3. Special Characters in Text Fields

**File:** `tests/edge-cases/special-characters.spec.ts`

**Steps:**
  1. Enter comments with special characters (é, ñ, etc.)
  2. Enter comments with Unicode characters
  3. Enter comments with HTML-like tags
  4. Verify data is stored and displayed correctly

**Expected Results:**
  - Ukrainian text should display correctly
  - Special characters should be preserved
  - HTML tags should be escaped to prevent injection
  - All text should display correctly in reports

#### 9.4. Concurrent Operations

**File:** `tests/edge-cases/concurrent-operations.spec.ts`

**Steps:**
  1. Open application in two browser tabs
  2. Add transaction in tab 1
  3. Refresh tab 2 to see update
  4. Edit transaction in tab 2
  5. Verify changes in tab 1
  6. Verify no data corruption occurs

**Expected Results:**
  - Application should handle concurrent users
  - Data should be consistent across sessions
  - Last write should win or conflict resolution should be implemented
  - No data should be lost or corrupted

#### 9.5. Rapid Repeated Actions

**File:** `tests/edge-cases/rapid-actions.spec.ts`

**Steps:**
  1. Rapidly click add button multiple times
  2. Quickly navigate between pages
  3. Rapidly submit forms with quick clicks
  4. Verify system prevents double submissions
  5. Verify UI doesn't break or become unresponsive

**Expected Results:**
  - System should prevent duplicate submissions
  - UI should remain responsive and stable
  - Navigation should queue properly
  - No race conditions should occur

#### 9.6. Attempting Unauthorized Access

**File:** `tests/edge-cases/unauthorized-access.spec.ts`

**Steps:**
  1. Attempt to access authenticated-only pages without login
  2. Try to manually navigate to /dashboard or similar
  3. Verify redirect to demo mode or login
  4. Verify personal data is not exposed in demo mode
  5. Check that demo data is clearly marked as demo

**Expected Results:**
  - Unauthorized access should be prevented
  - Users should be redirected to login or demo mode
  - Demo data should never contain real user data
  - All data access should respect authentication

### 10. Help & Support Features

**Seed:** `tests/seed.spec.ts`

#### 10.1. Support Information Display

**File:** `tests/support/support-info.spec.ts`

**Steps:**
  1. Navigate to home page
  2. Scroll to 'Підтримка та допомога' (Support and Help) section
  3. Verify all support contact information is displayed
  4. Check email: support@fophelp.ua
  5. Check phone: +380 (44) 123-45-67
  6. Verify 24/7 online chat mention
  7. Look for knowledge base link

**Expected Results:**
  - Support section should be clearly visible on home page
  - All contact methods should be displayed
  - Email should be clickable and formatted correctly
  - Phone number should be formatted properly
  - Support hours should be clearly stated

#### 10.2. Important Information Display

**File:** `tests/support/important-info.spec.ts`

**Steps:**
  1. Navigate to home page
  2. Scroll to '⚠️ Податкові терміни' (Important Information) section
  3. Verify tax deadline information is displayed
  4. Check for Tax Declaration deadline: 31 березня
  5. Check for Monthly VAT report deadline: 20 of next month
  6. Check for Unified Tax report deadline: 20 of next month
  7. Check for Unified Social Contribution report deadline: 20 of next month

**Expected Results:**
  - Important tax dates should be prominently displayed
  - Deadlines should match Ukrainian tax calendar
  - Information should be clear and easy to understand
  - All statutory deadlines should be listed

#### 10.3. Getting Started Instructions

**File:** `tests/support/getting-started.spec.ts`

**Steps:**
  1. Navigate to home page
  2. Locate 'Як почати роботу' (Getting Started) section
  3. Verify 4 steps are clearly outlined
  4. Check Step 1: Profile Setup
  5. Check Step 2: Adding Transactions
  6. Check Step 3: Monitoring and Reporting
  7. Check Step 4: Filing Reports

**Expected Results:**
  - Getting started guide should be clear and comprehensive
  - All steps should be in logical order
  - Each step should explain what needs to be done
  - Guide should help new users understand system workflow

#### 10.4. Feature Highlights

**File:** `tests/support/features-highlighted.spec.ts`

**Steps:**
  1. Navigate to home page
  2. Review '4 основные особенности системы' section
  3. Verify features listed: Income/Expense Tracking, Tax Management, Auto Reports, Data Security
  4. Review 'Переваги використання' (Benefits) section
  5. Check for listed benefits: Time Savings, Accuracy, Analytics, Legal Compliance

**Expected Results:**
  - Key features should be prominently displayed
  - Benefits should be clearly articulated
  - System capabilities should be well explained to new users
  - Marketing copy should accurately reflect functionality
