export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

export function formatTime(date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(date)
}

export function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function getContextMenuPosition(x, y, menuWidth, menuHeight, windowWidth, windowHeight) {
  let adjustedX = x
  let adjustedY = y

  if (x + menuWidth > windowWidth) {
    adjustedX = x - menuWidth
  }

  if (y + menuHeight > windowHeight) {
    adjustedY = y - menuHeight
  }

  return { x: adjustedX, y: adjustedY }
}

