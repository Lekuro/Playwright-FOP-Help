export interface IIncomeItemDto {
    id: string;
    dt: string;
    income: number;
    currency: string;
    comment: string;
    cash: boolean;
    userID: string;
}

export interface IIncomesResponseDto {
    [monthKey: string]: IIncomeItemDto[];
}
