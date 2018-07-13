import { GET_CSR_HISTORY } from '../common/constants/type';



const initial = [
  // {
  //   vendor: 'Lexy',
  //   url: 'https://www.neimanmarcus.com/product_assets/T/C/S/7/B/NMTCS7B_mk.jpg',
  //   proddesc: 'LEXANDA_Mason Top',
  // },
  // {
  //   vendor: 'Morgan J',
  //   url: 'https://neimanmarcus.scene7.com/is/image/NeimanMarcus/NMTW7LU_01_m?&amp;wid=400&amp;height=500',
  //   proddesc: 'CS PERFECT SWIM T',
  // },
  // {
  //   vendor: 'Vango',
  //   url: 'https://neimanmarcus.scene7.com/is/image/NeimanMarcus/NMTW7LU_10_m?&amp;wid=400&amp;height=500',
  //   proddesc: 'CS PERFECT SWIM T',
  // },
  // {
  //   vendor: 'Hers',
  //   url: 'https://neimanmarcus.scene7.com/is/image/NeimanMarcus/NMTC29D_8T_m?&amp;wid=400&amp;height=500',
  //   proddesc: 'LS 1PC, UPF 50',
  // },
  // {
  //   vendor: 'His',
  //   url: 'https://www.neimanmarcus.com/product_assets/X/2/W/J/W/NMX2WJW_mk.jpg',
  //   proddesc: 'LS EYELET BLOUSE / WHITE',
  // },
  // {
  //   vendor: 'Mine',
  //   url: 'https://www.neimanmarcus.com/product_assets/T/C/S/7/B/NMTCS7B_mk.jpg',
  //   proddesc: 'Espadrillas Suede Ot Pltfm E',
  // },
  // {
  //   vendor: 'More Money',
  //   url: 'https://www.neimanmarcus.com/product_assets/T/B/K/N/F/NMTBKNF_mk.jpg',
  //   proddesc: 'MLT STRP WTSN SKRT',
  // },
  // {
  //   vendor: 'M&M',
  //   url: 'https://www.lastcall.com/product_assets/T/C/0/7/X/LCTC07X_mk.jpg',
  //   proddesc: 'PNT DENM STRECH SKNY P',
  // },
  // {
  //   vendor: 'J Fields',
  //   url: 'https://www.lastcall.com/product_assets/T/C/0/8/Z/LCTC08Z_mk.jpg',
  //   proddesc: 'SHRT DSRT MRG STRP',
  // },

];

var initialState = {
  isProfileDataLoaded: false,
  profileData: null
}

export function CustomerDetailsReducer(state = {}, action) {
  console.log('action',action)
  switch (action.type) {
    case 'GET_CSR_HISTORY':
      console.log('setting state as ', { ...action.payload, test: initial });
      return { ...state,...action.payload, test: initial, isProfileDataLoaded: false }
    case 'NAVIGATE_TO_DOMESTIC_CUSTOMER': {
      return {
        ...state,
        isProfileDataLoaded: true,
        profileData: action.payload
      };
    }
    
    case 'GET_SALES_SUMMARY': {
      console.log('get sales reducer',action.payload)
      return {
        ...state,
        isProfileDataLoaded: false,
        salesSummary :action.payload
      };
    }

    case 'CLEAR_CUSTOMER_DETAILS':{
      return{
          isProfileDataLoaded: false,
          profileData: null,
          salesSummary :null,
          cssId :''
      }

    }

    default:
      return {
        ...state,
        isProfileDataLoaded: false
      }
  }
}