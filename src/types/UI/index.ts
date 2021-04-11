export interface CardTemplate {
    id: string;
    card: CardConfig;
    devices: string[];
    items: any[];
}

export interface CardConfig {
    position?: string,
    width?: string,
    height?: string,
    x?: string,
    y?: string
}

type RenderMode = 'fixed';

export interface RenderTemplate {
    mode: RenderMode,
    name: string,
    cards: CardTemplate[]    
}
