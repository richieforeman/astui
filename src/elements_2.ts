import {
    Component,
    input,
} from '@angular/core';
import { ComponentNode, UIImage, UIListItem, UIText } from './types';
import { AstNode } from './node';


@Component({
    template: `
      <li style="color:blue;">{{node().item.literal}}</li>
    `,
})
export class ListItemImpl2 {
    readonly node = input.required<ComponentNode<UIListItem>>();
}

@Component({
    template: `
      @let n = node();
      <p style="border: 4px solid red;padding:4px;">
        @for (c of n.children; track c) {
          <ui-node [node]="c" />
        }
      </p>
    `,
    imports: [AstNode],
})
export class ParagraphImpl2 {
    readonly node = input.required<ComponentNode>();
}

@Component({
    template: `
      @let n = node();
      <ul style="background-color: grey">
        @for (c of n.children; track c) {
          <ui-node [node]="c" />
        }
      </ul>
    `,
    imports: [AstNode],
})
export class ListImpl2 {
    readonly node = input.required<ComponentNode>();
}