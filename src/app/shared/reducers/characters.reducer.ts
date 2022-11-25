import { createReducer, on } from "@ngrx/store";
import { charactersActions } from "../actions/characters.actions";
import { ICharacter } from "../interfaces/characters";

export interface CharactersState {
    parsedArray: ICharacter[];
    currentList: ICharacter[];
    currentListKey: string;
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
    request: '',
    currentListKey: ''
};

export const CharactersReducer = createReducer(
    initialState,
    on(charactersActions.setItem, (state, { char }) => ({
        ...state,
        parsedArray: (!state.parsedArray.find(item => item.id == char.id)) ? state.parsedArray.concat([char]) : state.parsedArray
    })),
    on(charactersActions.loadedCount, (state, { count, characters }) => ({
        ...state,
        count: count,
        parsedArray: characters
    })),
    on(charactersActions.loadCurrentListFromRange, (state, { from, to, key }) => ({
        ...state,
        currentList: [],
        loadedNeed: (to > state.count ? state.count : to) - from + 1,
        loadedNow: 0,
        currentListKey: key
    })),
    on(charactersActions.loadCurrentListFromArray, (state, { request, key }) => ({
        ...state,
        currentList: [],
        loadedNeed: request.length,
        loadedNow: 0,
        currentListKey: key
    })),
    on(charactersActions.loadedCharacterToCurrentList, (state, { char, key }) => key != state.currentListKey ? state : ({
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
    on(charactersActions.setRequest, (state, { request }) => ({
        ...state,
        request: request
    }))
);