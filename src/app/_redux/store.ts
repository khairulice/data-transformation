import { UPDATE_NAME } from './actions';

export interface IAppState {
    userName:String;
}
export const INITIAL_STATE: IAppState = {
    userName:'Khairul',
}
export function rootReducer(state, action) {
    switch (action.type) {
        case UPDATE_NAME:            
            return Object.assign({}, state, {
                userName: action.userName
            })           
    }
    return state;
}