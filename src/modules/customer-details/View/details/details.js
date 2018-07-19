import React, {Fragment} from 'react';
import './details.css';

//images & icons
import edit_profile from '../../../../resources/images/Edit_Profile.svg';

const LocationInfoDomestic = (props) => (
  <div className="locationInfo">
    <div className="col1">
      <div>
        <div className="custdet-detail-label">Address Line 1</div>
        <div className="custdet-detail-value">{props.profileData.cust_dom_address1}</div>
      </div>
      <div>
        <div className="custdet-detail-label">City</div>
        <div className="custdet-detail-value">{props.profileData.cust_dom_city}</div>
      </div>
    </div>

    <div className="col2">
      <div>
        <div className="custdet-detail-label">Address Line 2</div>
        <div className="custdet-detail-value">{props.profileData.cust_dom_address2}</div>
      </div>  
      <div className="state-zip">
        <div>
          <div className="custdet-detail-label">State</div>
          <div className="custdet-detail-value">{props.profileData.cust_dom_state}</div>
        </div>
        <div>
          <div className="custdet-detail-label">Zip</div>
          <div className="custdet-detail-value">{props.profileData.cust_dom_zip}</div>
        </div>
      </div>  
    </div>  
  </div>
)

const LocationInfoInternational = (props) => (
  <div className="locationInfo">
    <div className="col1">
      <div>
        <div className="custdet-detail-label">Address Line 1</div>
        <div className="custdet-detail-value">{props.profileData.cust_dom_address1}</div>
      </div>
      <div>
        <div className="custdet-detail-label">City</div>
        <div className="custdet-detail-value">{props.profileData.cust_dom_city}</div>
      </div>
      <div>
        <div className="custdet-detail-label">Country</div>
        <div className="custdet-detail-value">{props.profileData.cust_dom_country}</div>
      </div>
    </div>

    <div className="col2">
      <div>
        <div className="custdet-detail-label">Address Line 2</div>
        <div className="custdet-detail-value">{props.profileData.cust_dom_address2}</div>
      </div>  
      <div>
        <div className="custdet-detail-label">Province</div>
        <div className="custdet-detail-value">{props.profileData.cust_dom_province}</div>
      </div>
      <div>
        <div className="custdet-detail-label">Postal Code</div>
        <div className="custdet-detail-value">{props.profileData.cust_dom_zip}</div>
      </div>  
    </div>
  </div>  
)

const ContactInfo = (props) => (
  <Fragment>
    <div className="details contactInfo">
      <div className="mobilephone-txt">
        <div className="custdet-detail-label">Mobile Phone</div>
        <div className="custdet-detail-value">{props.profileData.cust_dom_mobile}</div>
      </div>
      <div>
          <div className="custdet-detail-label">Other Phone</div>
          <div className="custdet-detail-value">{props.profileData.cust_dom_otherMobile}</div>
      </div>
      <div>
          <div className="custdet-detail-label">Email Address</div>
          <div className="custdet-detail-value">{props.profileData.cust_dom_email}</div>
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
const View = (props) => {
  let Residence = <LocationInfoInternational profileData={props.profileData} />
  if(props.profileData.cust_dom_country == 'UNITED STATES' || props.profileData.cust_dom_country == "" || props.profileData.cust_dom_country == null || props.profileData.cust_dom_country == undefined) {
  Residence = <LocationInfoDomestic profileData={props.profileData} />
  }

  return (
    <div className="details">
      {Residence}
      <ContactInfo profileData={props.profileData} navigateToViewEditCustomer={props.navigateToViewEditCustomer} />
    </div>
  )  
}

export default (props) => {
  return <View profileData={props.profileData} navigateToViewEditCustomer={props.navigateToViewEditCustomer}/>
}

