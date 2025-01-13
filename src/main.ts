import {
  Component,
  input,
  computed,
  inject,
  InjectionToken,
  Type,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

export const COMPONENT_MAP = new InjectionToken<
  Record<ComponentType, Type<{}>>
>('componentMap');

enum ComponentType {
  PARAGRAPH,
  LIST,
  LIST_ITEM,
  TEXT,
  IMAGE,
}

interface UIImage extends UIComponent {
  type: ComponentType.IMAGE;
  src: string;
}

interface UIText extends UIComponent {
  type: ComponentType.TEXT;
  literal: string;
}

interface UIParagraph extends UIComponent {
  type: ComponentType.PARAGRAPH;
}

interface UIList extends UIComponent {
  type: ComponentType.LIST;
}

interface UIListItem extends UIComponent {
  type: ComponentType.LIST_ITEM;
  literal: string;
}

interface UIComponent {
  type: ComponentType;
}

type UIComponentTypes = UIParagraph | UIList | UIListItem | UIText | UIImage;

interface ComponentNode<T = UIComponentTypes, C = UIComponentTypes> {
  item: T;
  children?: ComponentNode<C>[];
}

@Component({
  template: '{{node().item.literal}}',
})
export class TextImpl {
  readonly node = input.required<ComponentNode<UIText>>();
}

@Component({
  selector: 'ui-node',
  template: `
    <ng-container *ngComponentOutlet="type(); inputs: {node: node()}"></ng-container>
  `,
  imports: [NgComponentOutlet],
})
export class Node {
  private readonly COMPONENT_MAP = inject(COMPONENT_MAP);
  protected readonly ComponentType = ComponentType;
  readonly node = input.required<ComponentNode>();
  readonly type = computed(() => this.COMPONENT_MAP[this.node().item.type]);
}

@Component({
  template: `
    <li>{{node().item.literal}}</li>
  `,
})
export class ListItemImpl {
  readonly node = input.required<ComponentNode<UIListItem>>();
}

@Component({
  template: `
    <img [src]="node().item.src" />
  `,
})
export class ImageImpl {
  readonly node = input.required<ComponentNode<UIImage>>();
}

@Component({
  template: `
    @let n = node();
    <p>
      @for (c of n.children; track c) {
        <ui-node [node]="c" />
      }
    </p>
  `,
  imports: [Node],
})
export class ParagraphImpl {
  readonly node = input.required<ComponentNode>();
}

@Component({
  template: `
    @let n = node();
    <ul>
      @for (c of n.children; track c) {
        <ui-node [node]="c" />
      }
    </ul>
  `,
  imports: [Node],
})
export class ListImpl {
  readonly node = input.required<ComponentNode>();
}

const COMPONENT_MAP_VALUE: Record<ComponentType, Type<{}>> = {
  [ComponentType.LIST]: ListImpl,
  [ComponentType.LIST_ITEM]: ListItemImpl,
  [ComponentType.TEXT]: TextImpl,
  [ComponentType.PARAGRAPH]: ParagraphImpl,
  [ComponentType.IMAGE]: ImageImpl,
};

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
            literal: 'HI',
          },
        },
        {
          item: {
            type: ComponentType.LIST_ITEM,
            literal: 'BYE',
          },
        },
      ],
    },
  ],
};

@Component({
  selector: 'app-root',
  template: `
    <ui-node [node]="MY_TREE">
  `,
  // PRoviders can be swapped wwith whatever
  providers: [{ provide: COMPONENT_MAP, useValue: COMPONENT_MAP_VALUE }],
  imports: [Node],
})
export class App {
  name = 'Angular';

  readonly MY_TREE = COMPONENT_AST_TREE;
}

bootstrapApplication(App);
