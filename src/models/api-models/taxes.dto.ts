// Response DTO для податкового запису
// export interface ITaxItemDto {
//     id: string;
//     dt: string;
//     amount: number;
//     payDate: string | null;
//     taxType: string;
//     quarter: number;
//     year: number;
//     userID: string;
// }

// Response DTO для списку податків по кварталах
// export interface ITaxesResponseDto {
//     [quarterKey: string]: ITaxItemDto[];
// }

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

// // Response DTO для списку розрахунків податків
// export interface ITaxCalculationsResponseDto extends Array<ITaxCalculationDto> {}
