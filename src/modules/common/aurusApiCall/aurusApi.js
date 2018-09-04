export function aurusGetBalanceEnquiry(data){

  
        let cardToken = data.CardToken[0]
        console.log("Card Token Number", cardToken);
        console.log("Entered in aurusGetBalanceEnquiry");
        this.TransRequestJson.TransRequest.CardNumber = this.state.validCardNumber;
        this.TransRequestJson.TransRequest.CardToken =cardToken; 
        this.TransRequestJson.TransRequest.EntrySource = 'K';
        this.TransRequestJson.TransRequest.TransAmountDetails.ServicesTotalAmount ="0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.ProductTotalAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.TaxAmount ="0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.Discount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.EBTAmount =" 0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.FSAAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.DutyTotalAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.FreightTotalAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.AlternateTaxAmount =" 0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.TipAmount =" 0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.DonationAmount = "0.00";
        this.TransRequestJson.TransRequest.TransAmountDetails.TenderAmount = "0.00";
        //TransactionType must be 12 for balance enquiry
        this.TransRequestJson.TransRequest.TransactionType = 12;
        const params = json2xml(this.TransRequestJson);
        return params;
      
    
}
