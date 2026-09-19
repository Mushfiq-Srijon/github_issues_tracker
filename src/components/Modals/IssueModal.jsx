import { useEffect, useState } from 'react';
import { Modal } from './Modal';

export function IssueModal({ issue, onClose, onUpdate, onDelete }) {
    const [editing, setEditing] = useState(false);

    const [form, setForm] = useState({
        title: issue.title,
        description: issue.description || '',
        priority: issue.priority,
        status: issue.status,
        label: issue.label,
    });

    useEffect(() => {
        setForm({
            title: issue.title,
            description: issue.description || '',
            priority: issue.priority,
            status: issue.status,
            label: issue.label,
        });
    }, [issue]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title.trim()) {
            return;
        }

        const success = await onUpdate(form);

        if (success) {
            setEditing(false);
        }
    };

    if (editing) {
        return (
            <Modal onClose={onClose} title="Edit issue">
                <form className="new-form" onSubmit={handleSubmit}>
                    <label>
                        Title
                        <input
                            name="title"
                            required
                            value={form.title}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Description
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        />
                    </label>

                    <div className="form-row">
                        <label>
                            Priority
                            <select
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                            >
                                {[
                                    'Low',
                                    'Medium',
                                    'High',
                                    'Critical',
                                ].map((value) => (
                                    <option key={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Status
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >
                                {[
                                    'Open',
                                    'In Progress',
                                    'Closed',
                                ].map((value) => (
                                    <option key={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            Label
                            <select
                                name="label"
                                value={form.label}
                                onChange={handleChange}
                            >
                                {[
                                    'Bug',
                                    'Feature',
                                    'Documentation',
                                    'UI/UX',
                                    'Backend',
                                    'Frontend',
                                ].map((value) => (
                                    <option key={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            onClick={() => setEditing(false)}
                        >
                            Cancel
                        </button>

                        <button className="primary">
                            Save Changes
                        </button>
                    </div>
                </form>
            </Modal>
        );
    }

    return (
        <Modal onClose={onClose}>
            <div className="modal-title">
                <h2>{issue.title}</h2>

                <span className="label green-label">
                    {issue.status}
                </span>

                <small>
                    ◉ Opened by{' '}
                    {issue.user?.name || 'Unknown User'} ·{' '}
                    {new Date(
                        issue.created_at
                    ).toLocaleDateString()}
                </small>
            </div>

            <p className="modal-description">
                {issue.description || 'No description provided.'}
            </p>

            <div className="meta">
                <div>
                    <small>Assignee:</small>
                    <strong>Fahim Ahmed</strong>
                </div>

                <div>
                    <small>Priority:</small>

                    <span
                        className={`priority ${issue.priority.toLowerCase()}`}
                    >
                        {issue.priority.toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="modal-actions">
                <button
                    className="primary"
                    onClick={() => setEditing(true)}
                >
                    Edit
                </button>

                <button
                    className="danger"
                    onClick={onDelete}
                >
                    Delete
                </button>

                <button
                    className="primary"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </Modal>
    );
}