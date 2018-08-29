import giftCard from '../../../resources/images/Gift_Card_image_test.svg';
// multiple line items from cart are combined to form one index entry that are with related items.
export default (cartOld, productImages)=> {
    //need a copy of array we may not to send unformatted cart back if we dont have all images
    let cart = cartOld.slice();
    console.log('****salesCart', cart, productImages);
    //we will assume we have all images until proven guilty.(see reformatObject)
    productImages.updated = true;
    let  formattedCart = [];
    var formattedLineNumber = [];

    cart.forEach((object) => {
        let obj = reformatObject(object, productImages);
        let itemDesc = obj.itemDesc.trim();
        console.log("ITEM DESCRIPTION REFORMAT",itemDesc.toLowerCase().slice(0,12))
        if(!formattedLineNumber[0] || itemDesc === 'Alterations' || itemDesc === 'Gift Wrap' || itemDesc.toLowerCase().slice(0,12) === 'delivery fee' || itemDesc === 'NM Expss Card') {
           //create children property for main sku to keep track of its children that it needs line item details for
        /*    if(!formattedLineNumber[0]) {
                obj.children = [];
            } else {
                if(itemDesc === 'Alterations'){formattedLineNumber[0].children.push('A')}
                if(itemDesc === 'Gift Wrap'){formattedLineNumber[0].children.push('G')}
            } */

            formattedLineNumber.push(obj)
        } else {
            formattedCart.push(formattedLineNumber);
            formattedLineNumber = [obj]
        }
    });

    //flush out what ever is left in formattedLineNumber to the cart
    if(formattedLineNumber[0]) {
        formattedCart.push(formattedLineNumber)
    }
   
    if(productImages.updated === false){
        //we cant send back formated cart yet becuase we dont have all images
        console.log('returning an Unformatted cart images to verify:', cartOld);
        return [cartOld,productImages];
    }else {
        console.log('the new formatted cart:', formattedCart);
        return [formattedCart, productImages]
    }
}
    
const reformatObject = (object, productImages) => {
    //check to see if we have a main product object
    let itemDesc = object.itemDesc.trim();
    //image check should only be done if a product object
    if(itemDesc !== 'Alterations' && itemDesc !== 'Gift Wrap' && itemDesc.toLowerCase().slice(0,12) !== 'delivery fee' && itemDesc !='NM Expss Card'){
        
        if(productImages.imageUrls[object.pim_SKU_ID]){
            console.log('match found in productImage', productImages.imageUrls[object.pim_SKU_ID], object.imgLink)
            object.imgLink = productImages.imageUrls[object.pim_SKU_ID];
        } else {
            console.log('WAS TRIGGERED BY OBJECT', object);
            productImages.updated = false;
            //set blank for now will call a cxp action to give url value.
            productImages.imageUrls[object.pim_SKU_ID] = ''
        }
    }

    if(itemDesc == 'NM Expss Card') {
        object.imgLink = giftCard
    }
    

    if(object.color && (object.color.trim() === "NO")) {
        object.color = "NO COLOR"
    }

    if(object.size && object.size === "NO SI") {
        object.size = "NO SIZE"
    }

    return object;
}
