import {
  Component,
  Type,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {ComponentNode, ComponentType, UIImage, UIListItem, UIText} from './types';
import { ImageImpl, ListImpl, ListItemImpl, ParagraphImpl, TextImpl } from './elements';
import { COMPONENT_MAP, AstNode } from './node';

const COMPONENT_AST_TREE: ComponentNode = {
  item: {
    type: ComponentType.PARAGRAPH,
  },
  children: [
    {
      item: {
        type: ComponentType.TEXT,
        literal: 'this is a test',
      },
    },
    {
      item: {
        type: ComponentType.IMAGE,
        src: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXJxa21sOXQ2dGxhNDI4MGFlZTVoeGhkNHdqbzJxOWRydHcwOGljNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/12ELmx0C4EFKcE/giphy.gif',
      },
    },
    {
      item: {
        type: ComponentType.LIST,
      },
      children: [
        {
          item: {
            type: ComponentType.LIST_ITEM,
            literal: 'Check check, is this thing on?',
          },
        },
        {
          item: {
            type: ComponentType.LIST_ITEM,
            literal: 'Check 1,2...',
          },
        },
      ],
    },
  ],
};

/**
 * Mapping used when dynamically rendering components.
 */
const COMPONENT_MAP_VALUE: Record<ComponentType, Type<{}>> = {
  [ComponentType.LIST]: ListImpl,
  [ComponentType.LIST_ITEM]: ListItemImpl,
  [ComponentType.TEXT]: TextImpl,
  [ComponentType.PARAGRAPH]: ParagraphImpl,
  [ComponentType.IMAGE]: ImageImpl,
};

@Component({
  selector: 'app-root',
  template: `
    <ui-node [node]="MY_TREE">
  `,
  // PRoviders can be swapped wwith whatever
  providers: [{ provide: COMPONENT_MAP, useValue: COMPONENT_MAP_VALUE }],
  imports: [AstNode],
})
export class App {
  name = 'Angular';

  readonly MY_TREE = COMPONENT_AST_TREE;
}

bootstrapApplication(App);
