'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rootStyle = '\n  position: absolute;\n  top: 0;\n  right: 0;\n  background-color: black;\n  color: white;\n  padding: 20px;\n  font-family: sans-serif;\n  font-weight: 300;\n  font-size: 14px;\n  pointer-events: none;\n';

var rowStyle = '\n  white-space: pre;\n';

window.Dashboard = function () {
  function Dashboard() {
    _classCallCheck(this, Dashboard);

    this.root = document.createElement('div');
    this.root.style = rootStyle;
    document.body.appendChild(this.root);

    this.monitors = {};
  }

  _createClass(Dashboard, [{
    key: 'monitor',
    value: function monitor(name, value) {
      var monitor = this.monitors[name] || this.addMonitor(name, value);
      monitor(value);
    }
  }, {
    key: 'stringify',
    value: function stringify(value) {
      if (typeof value === 'string') {
        return value;
      }

      return JSON.stringify(value, function (key, val) {
        return val.toFixed ? Number(val.toFixed(3)) : val;
      }, 2);
    }
  }, {
    key: 'addMonitor',
    value: function addMonitor(name, initialValue) {
      var _this = this;

      var row = document.createElement('div');
      this.root.appendChild(row);
      row.style = rowStyle;

      this.monitors[name] = function (value) {
        row.innerText = name + ': ' + _this.stringify(value);
      };

      return this.monitors[name];
    }
  }]);

  return Dashboard;
}();