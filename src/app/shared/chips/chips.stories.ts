import {type Meta, moduleMetadata, type StoryObj} from "@storybook/angular";
import {CommonModule} from "@angular/common";
import {ChipsComponent} from "./chips.component";

export default {
  title: 'Components/Chips',
  component: ChipsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ChipsComponent], // Importando o componente standalone
    }),
  ],
  argTypes: {
    color: {
      options: ['primary', 'secundary', 'warning', 'success', 'error'],
      control: {type: "select"}
    },
  },
} as Meta<ChipsComponent>;

type ChipsComponentsStory = StoryObj<ChipsComponent>;



export const Primary: ChipsComponentsStory = {
  args: {
    color: 'primary',
    label: 'Chip'
  },

  render: (args: any) => ({
    template: `

        <tgt-chips
        [color]="${args.color}"
        [label]="${args.label}"
         >teste</tgt-chips>
`
  }),

};
