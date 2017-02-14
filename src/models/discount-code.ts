export class DiscountCodeModel {
    title: string;
    code: string;
    serialNumber: string;
    startDate: string;
    endDate: string;

    constructor(public discountCode: any) {
        console.log(discountCode);
        this.title = discountCode.title[0].value;
        this.code = discountCode.field_discount_code[0].value;
        this.serialNumber = discountCode.field_serial_number[0] ? discountCode.field_serial_number[0].value : null;
        this.startDate = discountCode.field_start_date[0] ? discountCode.field_start_date[0].value : null;
        this.endDate = discountCode.field_end_date[0] ? discountCode.field_end_date[0].value : null;
    }
}