import { Pipe, PipeTransform } from "@angular/core";
import { ICharacter } from "../interfaces/characters";

@Pipe({
    name: 'searchCharacters'
})
export class SearchPipe implements PipeTransform {
    transform(characters: Array<ICharacter>, search = ''): Array<ICharacter> {
        if (!search.trim()) {
            return []
        }
        return characters.filter(character => {
            return character.name.toLowerCase().includes(search.toLowerCase())
        })
    }
}