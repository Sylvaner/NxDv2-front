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
