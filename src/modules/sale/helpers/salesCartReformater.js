
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
        if(!formattedLineNumber[0] || itemDesc === 'Alterations' || itemDesc === 'Gift Wrap' || itemDesc === 'delivery fee') {
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
    console.log(`********* OBJECT : ${JSON.stringify(object)}, productImages : ${JSON.stringify(productImages)}`);
    //check to see if we have a main product object
    let itemDesc = object.itemDesc.trim();
    //image check should only be done if a product object
    if(itemDesc !== 'Alterations' && itemDesc !== 'Gift Wrap' && itemDesc !== 'delivery fee'){
        
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

    if(object.color && (object.color.trim() === "NO")) {
        object.color = "NO COLOR"
    }

    if(object.size && object.size === "NO SI") {
        object.size = "NO SIZE"
    }

    return object;
}
