export interface HierarchyItem {
    shortName: string,
    name: string,
    id: string,
    isAttribute: boolean
};

export const products: HierarchyItem[] = [
    {shortName: "CT", name: "Category", id: 'product-1', isAttribute: false},
    {shortName: "SC", name: "Subcategory", id: 'product-2', isAttribute: false},
    {shortName: "SE", name: "Segment", id: 'product-3', isAttribute: false},
    {shortName: "PD", name: "Product", id: 'product-4', isAttribute: false},
    {shortName: "BR", name: "Brand", id: 'product-5', isAttribute: true},
];

export interface DndColumn {
    columnId: string,
    title: string,
    itemIds: string[]
};

export const columns: DndColumn[] = [
    {
        columnId: 'column-1',
        title: "Column 1",
        itemIds: ['product-3', 'product-4', 'product-5'], 
    },
    {
        columnId: 'column-2',
        title: "Column 2",
        itemIds: ['product-1', 'product-2'], 
    },
];