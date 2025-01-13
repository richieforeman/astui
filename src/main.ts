import {
  Component,
  Type,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {ComponentNode, ComponentType} from './types';
import { ImageImpl, ListImpl, ListItemImpl, ParagraphImpl, TextImpl } from './elements';
import { COMPONENT_MAP, AstNode } from './node';
import { ListImpl2, ListItemImpl2, ParagraphImpl2 } from './elements_2';

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
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Cathedral_Rock_-_Sedona_AZ-1.jpg/300px-Cathedral_Rock_-_Sedona_AZ-1.jpg',
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
 * Mapping used when dynamically rendering components.  These values could be swapped out depending upon the installation
 */
const COMPONENT_MAP_APP_1_VALUE: Record<ComponentType, Type<{}>> = {
  [ComponentType.LIST]: ListImpl,
  [ComponentType.LIST_ITEM]: ListItemImpl,
  [ComponentType.TEXT]: TextImpl,
  [ComponentType.PARAGRAPH]: ParagraphImpl,
  [ComponentType.IMAGE]: ImageImpl,
};

@Component({
  selector: 'app-1',
  template: `  <h2>App1</h2><ui-node [node]="MY_TREE">`,
    // PRoviders can be swapped wwith whatever
    providers: [{ provide: COMPONENT_MAP, useValue: COMPONENT_MAP_APP_1_VALUE }],
    imports: [AstNode],
})
export class App1 {
  readonly MY_TREE = COMPONENT_AST_TREE;
}

/**
 * Mapping used when dynamically rendering components.  Some of these values are swapped out for a special case
 */
const COMPONENT_MAP_APP_2_VALUE: Record<ComponentType, Type<{}>> = {
  [ComponentType.LIST]: ListImpl2, // Override specific components
  [ComponentType.LIST_ITEM]: ListItemImpl2,
  [ComponentType.TEXT]: TextImpl, // Some basic elements can be shared
  [ComponentType.PARAGRAPH]: ParagraphImpl2,
  [ComponentType.IMAGE]: ImageImpl,
};

@Component({
  selector: 'app-2',
  template: `<h2>App2</h2>
  <ui-node [node]="MY_TREE">`,
    // PRoviders can be swapped wwith whatever
    providers: [{ provide: COMPONENT_MAP, useValue: COMPONENT_MAP_APP_2_VALUE }],
    imports: [AstNode],
})
export class App2 {
  readonly MY_TREE = COMPONENT_AST_TREE;
}

@Component({
  selector: 'app-root',
  template: `
    <app-1></app-1>
    <app-2></app-2>
  `,
  imports: [AstNode, App1, App2],
})
export class App {
}

bootstrapApplication(App);
