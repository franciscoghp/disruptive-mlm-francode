import { useEffect } from "react"

const Toast = ({ message, type = "error", onClose, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <p>{message}</p>
      </div>
      <button className="toast-close" onClick={onClose}>
        ×
      </button>
    </div>
  )
}

export default Toast

