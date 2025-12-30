export interface IReportResponseDto {
    targetDate: string; // ISO date string
    sumIncomes: number;
    sumExpenses: number;
    sumTaxes: number;
    amountEP: number; // Єдиний податок
    amountESV: number; // ЄСВ
    amountPDV: number; // ПДВ
    dtFrom: string; // ISO date string
    dtTo: string; // ISO date string
    sExpenses: string | null;
    sumFlatTax: string; // строка з комою як роздільник
    id: string | null;
    userID: string;
    amountMilitaryTax: number; // Військовий збір
}

// Квартальний звіт з податками
export interface IReportRequestDto {
    id: string;
    date: string; // Дата у форматі YYYY-MM-DD
    incomes: number;
    expenses: number;
    ssp: number; // ЄСВ
    flatTax: number; // Єдиний податок
    flatTaxQ: number; // Квартальний єдиний податок
    vat: number; // ПДВ
    militaryTax: number; // Військовий збір
}

export interface IDetailedResponseDto {
    date: string; // Рік у форматі YYYY
    quarter: number; // Номер кварталу (1-4)
    data: number[]; // Масив числових значень (можливо, денні дані за квартал)
}

export interface IRemoveReportRequestDto {
    repID: string;
}
