import { createReducer, on } from "@ngrx/store";
import { charactersActions } from "../actions/characters.actions";
import { ICharacter } from "../interfaces/characters";

export interface CharactersState {
    parsedArray: ICharacter[];
    currentList: ICharacter[];
    count: number;
    loadedNow: number;
    loadedNeed: number;
    isFound: boolean;
    request: string;
}

export const initialState: CharactersState = {
    parsedArray: [],
    currentList: [],
    loadedNow: 0,
    loadedNeed: 0,
    count: 0,
    isFound: true,
    request: ''
};

export const CharactersReducer = createReducer(
    initialState,
    on(charactersActions.setItem, (state, { character }) => ({
        ...state,
        parsedArray: (!state.parsedArray.find(item => item.id == character.id)) ? state.parsedArray.concat([character]) : state.parsedArray
    })),
    on(charactersActions.loadedCount, (state, { count }) => ({
        ...state,
        count: count
    })),
    on(charactersActions.loadCurrentRange, (state, range) => ({
        ...state,
        currentList: [],
        loadedNeed: (range.to > state.count ? state.count : range.to) - range.from + 1,
        loadedNow: 0
    })),
    on(charactersActions.loadedCurrentRange, (state, { char }) => ({
        ...state,
        currentList: char ? state.currentList.concat([char]) : state.currentList,
        loadedNow: state.loadedNow + 1
    })),
    on(charactersActions.found, (state) => ({
        ...state,
        isFound: true
    })),
    on(charactersActions.notFound, (state) => ({
        ...state,
        isFound: false
    })),
    on(charactersActions.setRequest, (state, {request})=>({
        ...state,
        request: request
    }))
);