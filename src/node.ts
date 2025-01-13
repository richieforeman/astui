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
    readonly type = computed(() => this.COMPONENT_MAP[this.node().item.type]);
}