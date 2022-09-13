export class orderList {
    orderListId: number = 0
    date?: string
    image?: string
    status?: string
    userId?: string
    fullName?: string
    tel?: string
    address?: string
    sub?: string
    district?: string
    province?: string
    postalCode?: string
    totalPrice?: string
    storeId?: string
    detail: orderDetail[] = new Array<orderDetail>()
    totalAmount: number = 0

}

export class orderDetail {
    orderDetailId: number = 0
    productId: number = 0
    productName?: string
    productPrice: number = 0
    amount: number = 0
    productTotal: number = 0
    orderListId: number = 0


}

