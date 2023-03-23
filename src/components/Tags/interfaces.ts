import { Flag } from '../../interfaces/shared';

export const tagColorOptionsArray = <const>[
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

export type TagColorOption = typeof tagColorOptionsArray[number];

export interface ITagsProps {
  flags?: Flag[];
}
