import '../../styles/Modals.css';

export function Modal({ children, onClose, title }) {
    return (
        <div className="overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-x" onClick={onClose}>
                    ×
                </button>

                {title && <h2>{title}</h2>}

                {children}
            </div>
        </div>
    );
}