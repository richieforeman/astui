export enum ComponentType {
    PARAGRAPH,
    LIST,
    LIST_ITEM,
    TEXT,
    IMAGE,
}

export interface UIImage extends UIComponent {
    type: ComponentType.IMAGE;
    src: string;
}

export interface UIText extends UIComponent {
    type: ComponentType.TEXT;
    literal: string;
}

export interface UIParagraph extends UIComponent {
    type: ComponentType.PARAGRAPH;
}

export interface UIList extends UIComponent {
    type: ComponentType.LIST;
}

export interface UIListItem extends UIComponent {
    type: ComponentType.LIST_ITEM;
    literal: string;
}

export interface UIComponent {
    type: ComponentType;
}

export type UIComponentTypes = UIParagraph | UIList | UIListItem | UIText | UIImage;

export interface ComponentNode<T = UIComponentTypes, C = UIComponentTypes> {
    item: T;
    children?: ComponentNode<C>[];
}