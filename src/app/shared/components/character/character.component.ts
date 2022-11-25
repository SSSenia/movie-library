import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICharacter } from '../../interfaces/characters';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterComponent {

  @Input() character!: ICharacter;

  public imagesUrl: string = environment.imagesUrl;

  constructor() { }
}