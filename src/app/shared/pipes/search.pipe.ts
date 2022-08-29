import { Pipe, PipeTransform } from "@angular/core";
import { ICharacter } from "../interfaces/characters";

@Pipe({
    name: 'searchCharacters'
})
export class SearchPipe implements PipeTransform {
    transform(characters: ICharacter[], search: string = ''): ICharacter[] {
        if (!search.trim()) {
            return []
        }
        return characters.filter((character: ICharacter) => {
            return character.name.toLowerCase().includes(search.toLowerCase())
        })
    }
}