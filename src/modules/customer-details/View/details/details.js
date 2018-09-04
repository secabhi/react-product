import React, {Fragment} from 'react';
import './details.css';

//images & icons
import edit_profile from '../../../../resources/images/Edit_Profile.svg';

const LocationInfoDomestic = (props) => (
  <div className="locationInfo">
    <div className="col1">
      <div>
        <div className="custdet-detail-label">Address Line 1</div>
        <div className="custdet-detail-value">{props.customerDetails.selectedAddress.Addr1}</div>
      </div>
      <div>
        <div className="custdet-detail-label">City</div>
        <div className="custdet-detail-value">{props.customerDetails.selectedAddress.City}</div>
      </div>
    </div>

    <div className="col2">
      <div>
        <div className="custdet-detail-label">Address Line 2</div>
        <div className="custdet-detail-value">{props.customerDetails.selectedAddress.Addr2}</div>
      </div>  
      <div className="state-zip">
        <div>
          <div className="custdet-detail-label">State</div>
          <div className="custdet-detail-value">{props.customerDetails.selectedAddress.State}</div>
        </div>
        <div>
          <div className="custdet-detail-label">Zip</div>
          <div className="custdet-detail-value">{props.customerDetails.selectedAddress.Zip}</div>
        </div>
      </div>  
    </div>  
  </div>
)

const LocationInfoInternational = (props) => {

  return (
    <div className="locationInfo">
      <div className="col1">
        <div>
          <div className="custdet-detail-label">Address Line 1</div>
          <div className="custdet-detail-value">{props.customerDetails.selectedAddress.Addr1}</div>
        </div>
        <div>
          <div className="custdet-detail-label">City</div>
          <div className="custdet-detail-value">{props.customerDetails.selectedAddress.City}</div>
        </div>
        <div>
          <div className="custdet-detail-label">Country</div>
          <div className="custdet-detail-value">{props.customerDetails.selectedAddress.Country}</div>
        </div>
      </div>

      <div className="col2">
        <div>
          <div className="custdet-detail-label">Address Line 2</div>
          <div className="custdet-detail-value">{props.customerDetails.selectedAddress.Addr2}</div>
        </div>  
        <div>
          <div className="custdet-detail-label">Province</div>
          <div className="custdet-detail-value">{props.customerDetails.selectedAddress.City}</div>
        </div>
        <div>
          <div className="custdet-detail-label">Postal Code</div>
          <div className="custdet-detail-value">{props.customerDetails.selectedAddress.Zip}</div>
        </div>  
      </div>
    </div> 
  ) 
}

const ContactInfo = (props) => {
  return (
    <Fragment>
      <div className="details contactInfo">
        <div className="mobilephone-txt">
          <div className="custdet-detail-label">Mobile Phone</div>
          <div className="custdet-detail-value">{props.customerDetails.selectedAddress.PhoneNumbers[0] ? props.customerDetails.selectedAddress.PhoneNumbers[0].phoneNumber : ""}</div>
        </div>
        <div>
            <div className="custdet-detail-label">Other Phone</div>
            <div className="custdet-detail-value">{props.customerDetails.selectedAddress.PhoneNumbers[1] ? props.customerDetails.selectedAddress.PhoneNumbers[1].phoneNumber : ""}</div>
        </div>
        <div>
            <div className="custdet-detail-label">Email Address</div>
            <div className="custdet-detail-value">{props.customerDetails.emailAddress}</div>
        </div>
      </div>
      <div className="edit-section">
        <button className="editCls">
          <img src={edit_profile} alt="edit icon" className="editicon" onClick={props.navigateToViewEditCustomer} />
          <span className="edit-profile-button-label" onClick={props.navigateToViewEditCustomer}>EDIT PROFILE</span>
        </button>
      </div>
    </Fragment>
  ) 
}

const View = (props) => {
  let Residence = <LocationInfoInternational customerDetails={props.customerDetails} />

  if(props.customerDetails.selectedAddress.international === '0') {
    Residence = <LocationInfoDomestic customerDetails={props.customerDetails} />
  }

  return (
    <div className="details">
      {Residence}
      <ContactInfo customerDetails={props.customerDetails} navigateToViewEditCustomer={props.navigateToViewEditCustomer} />
    </div>
  )  

}

export default (props) => {
  return <View customerDetails={props.customerDetails} navigateToViewEditCustomer={props.navigateToViewEditCustomer}/>
}

