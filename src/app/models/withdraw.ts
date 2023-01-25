export class withdraw {
    withdrawId?: number
    Date?: Date
    image?: string
    totalPrice?: string
    withholdMoney?: number
    status?: string
    withdrawType: string = '';

    affiliate: withdrawAffiliate = new withdrawAffiliate();
    store: storeAffiliate = new storeAffiliate();
}

export class withdrawAffiliate {
    bankName: string = '';
    bankNameAccount: string = '';
    bankNumber: string = '';
}

export class storeAffiliate {
    bankName: string = '';
    bankNameAccount: string = '';
    bankNumber: string = '';
    store: string = '';
}