// Request DTO для отримання конкретного податку по ID
export interface ITaxUuidRequestDto {
    id: string;
}

// Response DTO для розрахунку податків
export interface ITaxItemDto {
    id: string;
    userId: string;
    sumIncomes: number;
    sumExpenses: number;
    amountEP: number;
    amountPDV: number;
    amountESV: number;
    dtFrom: string;
    dtTo: string;
    comment: string;
    taxPayed: boolean;
    amountMilitaryTax: number;
}
