import {REMINDERS_SUCCESS, REMINDERS_INVALID,REMINDERS_GENERAL } from './constants';


const initialState = {
};

//hardcoded for response. Needs to be removed
/*
const reminderListSample =[{"eventNumber": 100030208,"longDesc": "REPLENISHMENT ","description": "SKU 106-70-4324-00219-7 DAZZLING MONKEY -ESTEE LAUDER INC ","endDate": "2018-07-22T00:00:00"},
{"eventNumber": 100040956,"longDesc": "ALTERATIONS PICKUP ","description": "SKU  BROWN CHINCHILLA COLLAR ","endDate": "2018-07-25T00:00:00"},
{"eventNumber": 100041696,"longDesc": "ALTERATIONS PICKUP ", "description": "SKU 298-03-8445-10052-5 CODE 2.5EDT -GIORGIO ARMANI PARFU ","endDate": "2018-07-15T00:00:00"}
] */

export function RemindersReducer(state = initialState, action) {
  console.log('action.type',action.type)
  switch (action.type) {
      case REMINDERS_SUCCESS:
        return {
          ...state,
          remindersList : action.payload.reminders
        }
        
      case REMINDERS_INVALID:
        return {
          ...state,
         
        }
       
      case REMINDERS_GENERAL:
        return {
          ...state,
         
        }
        

    default:
    return state;
  }
}
