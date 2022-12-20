import { OptionDto } from "./option.dto";


export class MultipleChoiceOptionsDto {
  title: string;
  options: OptionDto[];
  min: number;
  max: number;
}
