// CREATE income (POST)
export interface ICreateExpenseRequestDto {
    date: string;
    expense: string;
    currency: string;
    comment: string;
    cash: boolean;
}

// UPDATE income (PUT)
export interface IUpdateExpenseRequestDto {
    id: string;
    date: string;
    expense: string;
    currency: string;
    comment: string;
    cash: boolean;
}

// DELETE expense (DELETE)
export interface IDeleteExpenseRequestDto {
    id: string;
    date: string;
    expense: string;
    currency: string;
    cash: boolean;
}

// Response для отримання доходу
export interface IExpenseItemDto {
    id: string;
    dt: string;
    expense: number;
    currency: string;
    comment: string;
    cash: boolean;
    userID: string;
    type: string | null;
    taxPayed: boolean;
}

// Response для списку доходів
export interface IExpensesResponseDto {
    [monthKey: string]: IExpenseItemDto[];
}
