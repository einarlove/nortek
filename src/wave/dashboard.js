const rootStyle = `
  position: absolute;
  top: 0;
  right: 0;
  background-color: black;
  color: white;
  padding: 20px;
  font-family: sans-serif;
  font-weight: 300;
  font-size: 14px;
  pointer-events: none;
`

const rowStyle = `
  white-space: pre;
`

window.Dashboard = class Dashboard {
  constructor() {
    this.monitors = {}
  }

  createRoot() {
    this.root = document.createElement('div')
    this.root.style = rootStyle
    document.body.appendChild(this.root)
  }

  monitor(name, value) {
    const monitor = this.monitors[name] || this.addMonitor(name, value)
    monitor(value)
  }

  stringify(value) {
    if (typeof value === 'string') {
      return value
    }

    return JSON.stringify(value, (key, val) =>
      val.toFixed ? Number(val.toFixed(3)) : val
    , 2)
  }

  addMonitor(name, initialValue) {
    const row = document.createElement('div')
    if (!this.root) {
      this.createRoot()
    }
    this.root.appendChild(row)
    row.style = rowStyle

    this.monitors[name] = value => {
      row.innerText = `${name}: ${this.stringify(value)}`
    }

    return this.monitors[name]
  }
}
