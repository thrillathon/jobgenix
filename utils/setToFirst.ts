export function prioritizeById<T extends { jobId: string }>(items: T[], id: string): T[] {
    const index = items.findIndex(item => item.jobId === id);
    if (index === -1) return items; // Return original array if id not found

    return [items[index], ...items.slice(0, index), ...items.slice(index + 1)];
}
