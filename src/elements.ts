import {
    Component,
    input,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { ComponentNode, ComponentType, UIImage, UIListItem, UIText } from './types';
import { AstNode } from './node';


@Component({
    template: '{{node().item.literal}}',
})
export class TextImpl {
    readonly node = input.required<ComponentNode<UIText>>();
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
    imports: [AstNode],
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
    imports: [AstNode],
})
export class ListImpl {
    readonly node = input.required<ComponentNode>();
}