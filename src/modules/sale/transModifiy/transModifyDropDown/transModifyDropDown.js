  //dependencies
import React from 'react';

  //images
import DropDown from '../../../../UI/dropDown/dropDown';
import transModify from '../../../../resources/images/Trans_Modify.svg';
import transModify_selected from '../../../../resources/images/Trans_Modify_Selected.svg';

  //styles
import './transModifyDropDown.css';


//DropDown take two divs - the parent and the children
export default (props) => {
    console.log('Sweezey Transmodify DropDown', props.activeTransModify)
    return(
        <DropDown active={props.activeTransModify} >
            <Header
                activeTransModify={props.activeTransModify}
                active={props.activeTransModify}
                items={props.items}
            />
            <div className='trans-children'>
                <div 
                    className="trans-discount-child"
                    onClick={()=>{
                        props.disableOptionsMenu();
                        props.closeNav();
                        props.showAssociateDiscount();
                    }}
                ><div className={(props.CLickStyle == "TransAssociate")?"item-modify-click-style":""}>
                 Associate Trans</div>
                   
                </div>
                <div className="trans-discount-child" 
                onClick={()=>{
                    props.closeNav();
                    console.log("props", props.CLickStyle);
                    props.transGiftRegistry('transGiftregistry');
                }}
                ><div className={(props.CLickStyle == "TransRegistry")?"item-modify-click-style":""}>Gift Registry</div></div>
                <div className={props.disableGiftReceipt?"services-disabled-style":"trans-discount-child"}
                onClick={()=>{
                    props.closeNav();
                    console.log("props", props);
                    props.transGiftReceipt();
                }}
                ><div className={(props.CLickStyle == "TransReceipt")?"item-modify-click-style":""} style={props.disableGiftReceipt ? {marginLeft: '47px'}: {}} >Gift Receipt</div></div>
                    <div className="trans-discount-child" 
                     onClick={()=>{
                            // props.disableOptionsMenu();
                            props.closeNav();
                            console.log("props", props);
                            props.splitCommissionOpened('transmodifysplit');
                        }}
                    ><div className={(props.CLickStyle == "TransSplit")?"item-modify-click-style":""}>
                    Split Commission</div>
                    </div>
                <div className="trans-discount-child"
                    onClick={()=>{
                    console.log('onClick: props', props)
                    props.closeNav();
                    props.TransTaxExempt();
                    }}><div className={(props.CLickStyle == "TransExempt")?"item-modify-click-style":""}>
                    Tax Exempt</div></div>
                <div 
                    className="trans-discount-child"
                    onClick={()=>{
                    console.log('onClick: props', props)
                    props.disableOptionsMenu();
                    props.closeNav();
                    props.showTransDiscount();
                    }}
                ><div className={(props.CLickStyle == "TransDiscount")?"item-modify-click-style":""}>
                Trans Discount</div>
                    
                </div>
            </div>   
        </DropDown>    
    )
}

const Header = (props) => {
    console.log('Sweezey TransmodifyHeader props.activeTransModify ', props.activeTransModify)
    return (
        <div className='trans-discount-main-flex'>
            <img className={props.activeTransModify ? 'trans-discount-img' : 'trans-discount-img-disabled'} src={props.show ? transModify_selected : transModify} alt='transmodify icon' />
            <div className={props.activeTransModify ? 'parent-title' : 'parent-title-disabled'}>Trans Modify</div>
        </div>
    )
}


// const Header = (props) => (
//     // (props.currentItem !== '' || props.nonSKUSelection !== '') ? props.active = true : props.active = false} 
//     <div className={'trans-discount-main-flex'}>
//         <img className={
//             (props.active ? 'trans-discount-img' 
//             : 
//             props.active || props.currentItem !== '' || props.nonSkuSelection !== '') ? 'trans-discount-img-disabled'
//             : 'trans-discount-img'} 
//             src={props.show ? transModify_selected : transModify} alt='transmodify icon' />
//         <div className={(props.active || props.currentItem !== '' && props.nonSkuSelection !== '') ? 'parent-title' : 'parent-title-disabled'}>Trans Modify</div>
//     </div>
// )