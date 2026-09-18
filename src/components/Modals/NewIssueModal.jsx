import { useState } from 'react';
import { Modal } from './Modal';

export function NewIssueModal({ onClose, onCreate }) {
    const [form, setForm] = useState({
        title: '',
        priority: 'Medium',
        label: 'Bug',
        status: 'Open',
        description: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.title.trim()) {
            onCreate(form);
        }
    };

    return (
        <Modal onClose={onClose} title="Create new issue">
            <form className="new-form" onSubmit={handleSubmit}>
                <label>
                    Title
                    <input
                        name="title"
                        required
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Issue title"
                    />
                </label>

                <label>
                    Description
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe the issue..."
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
                            {['Low', 'Medium', 'High', 'Critical'].map((x) => (
                                <option key={x}>{x}</option>
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
                            {['Open', 'In Progress', 'Closed'].map((x) => (
                                <option key={x}>{x}</option>
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
                                'Enhancement',
                            ].map((x) => (
                                <option key={x}>{x}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="modal-actions">
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>

                    <button className="primary">Create Issue</button>
                </div>
            </form>
        </Modal>
    );
}