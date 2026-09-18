export const seedIssues = [
    ['Fix Navigation Menu On Mobile Devices', 'High', 'Bug', 'Open'],
    ['Fix Navigation Menu On Mobile Devices', 'Medium', 'Bug', 'Open'],
    ['Fix Navigation Menu On Mobile Devices', 'Low', 'Bug', 'Closed'],
    ['Fix Navigation Menu On Mobile Devices', 'High', 'Bug', 'Open'],
    ['Improve dashboard accessibility', 'Medium', 'Enhancement', 'In Progress'],
    ['Fix broken image uploads', 'High', 'Bug', 'Closed'],
    ['Add keyboard shortcuts', 'Low', 'Feature', 'Open'],
    ['Update API documentation', 'Medium', 'Documentation', 'Open'],
    ['Improve mobile responsive layout', 'High', 'UI/UX', 'In Progress'],
    ['Add issue export', 'Low', 'Feature', 'Open'],
    ['Fix session timeout handling', 'Critical', 'Backend', 'In Progress'],
    ['Add empty state illustrations', 'Low', 'UI/UX', 'Closed'],
].map(
    ([title, priority, label, status], i) => ({
        id: i + 1,
        title,
        priority,
        label,
        status,
        author: i % 2 ? 'john.doe' : 'jhon.doe',
        date: '11/15/2024',
        description:
            'The navigation menu does not collapse properly on mobile devices. Need to fix the responsive behavior.',
    })
);