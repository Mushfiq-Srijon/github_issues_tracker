export function filteredIssues(items, tab, search) {
    return items.filter(
        (i) =>
            (tab === 'All' ||
                i.status === tab ||
                (tab === 'Open' && i.status === 'In Progress')) &&
            i.title.toLowerCase().includes(search.toLowerCase())
    );
}