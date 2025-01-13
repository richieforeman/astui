import {
    Component,
    input,
    computed,
    inject,
    InjectionToken,
    Type,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { ComponentNode, ComponentType} from './types';

export const COMPONENT_MAP = new InjectionToken<
    Record<ComponentType, Type<{}>>
>('componentMap');


/**
 * Renders a node by mapping the node primitive type to an Angular component.
 * This allows nodes components to be dynamically defined.
 */
@Component({
    selector: 'ui-node',
    template: `
      <ng-container *ngComponentOutlet="type(); inputs: {node: node()}"></ng-container>
    `,
    imports: [NgComponentOutlet],
})
export class AstNode {
    private readonly COMPONENT_MAP = inject(COMPONENT_MAP);
    protected readonly ComponentType = ComponentType;
    readonly node = input.required<ComponentNode>();
    readonly type = computed<Type<{}>>(() => this.COMPONENT_MAP[this.node().item.type]);
}