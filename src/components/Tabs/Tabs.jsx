import '../../styles/Tabs.css';

export function Tabs({ activeTab, onTabChange }) {
    const tabs = ['All', 'Open', 'Closed'];

    return (
        <div className="tabs">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={activeTab === tab ? 'active' : ''}
                    onClick={() => onTabChange(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}