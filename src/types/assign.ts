export type DnD = {
    lanes: DnDColumnData[];
}
export type DnDColumnData = {
    id: string,
    title: string,
    label?: string;
    cards: DnDCardItem[]
};

export type DnDCardItem = {
    id: number | string,
    title: string,
    label?: string;
    description?: string;
    draggable?: boolean;
    metadata?: { sha: string; }
}