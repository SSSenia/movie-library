import { Pipe, PipeTransform } from "@angular/core";
import { ICharacter } from "../interfaces/characters";

@Pipe({
    name: 'sortingCharacters'
})
export class SortingPipe implements PipeTransform {
    public transform(characters: ICharacter[]): ICharacter[] {
        return characters.slice().sort((a, b) => a.id - b.id);
    }
}