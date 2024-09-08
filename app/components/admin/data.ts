export interface CategoryOptions {
    readonly value: string;
    readonly label: string;
}

export const categoryOptions: readonly CategoryOptions[] = [
    { value: 'mobile', label: 'Mobil' },
    { value: 'computer', label: 'Komputer' },
];