import { Modal } from './Modal';

export function IssueModal({ issue, onClose, onDelete }) {
    return (
        <Modal onClose={onClose}>
            <div className="modal-title">
                <h2>{issue.title}</h2>

                <span className="label green-label">{issue.status}</span>

                <small>◉ Opened by {issue.author} · 22/02/2025</small>
            </div>

            <p className="modal-description">{issue.description}</p>

            <div className="meta">
                <div>
                    <small>Assignee:</small>
                    <strong>Fahim Ahmed</strong>
                </div>

                <div>
                    <small>Priority:</small>

                    <span className={`priority ${issue.priority.toLowerCase()}`}>
                        {issue.priority.toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="modal-actions">
                <button className="danger" onClick={onDelete}>
                    Delete
                </button>

                <button className="primary" onClick={onClose}>
                    Close
                </button>
            </div>
        </Modal>
    );
}