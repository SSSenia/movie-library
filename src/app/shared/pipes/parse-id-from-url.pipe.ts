import { Pipe, PipeTransform } from "@angular/core";
import { ICharacter } from "../interfaces/characters";
import { IPlanet } from "../interfaces/others";

@Pipe({
    name: 'parseIdFromUrl'
})
export class ParseIdFromUrlPipe implements PipeTransform {
    transform(character: ICharacter | IPlanet): string{
        return character.url.split('/').slice(-2)[0];
    }
}