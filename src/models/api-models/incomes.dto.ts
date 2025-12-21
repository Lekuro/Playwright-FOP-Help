// CREATE income (POST)
export interface ICreateIncomeRequestDto {
    date: string;
    income: string;
    currency: string;
    comment: string;
    cash: boolean;
}

// UPDATE income (PUT)
export interface IUpdateIncomeRequestDto {
    id: string;
    date: string;
    income: string;
    currency: string;
    comment: string;
    cash: boolean;
}

// DELETE income (DELETE)
export interface IDeleteIncomeRequestDto {
    id: string;
}

// Response для отримання доходу
export interface IIncomeItemDto {
    id: string;
    dt: string;
    income: number;
    currency: string;
    comment: string;
    cash: boolean;
    userID: string;
    type: string | null;
    taxPayed: boolean;
}

// Response для списку доходів
export interface IIncomesResponseDto {
    [monthKey: string]: IIncomeItemDto[];
}
