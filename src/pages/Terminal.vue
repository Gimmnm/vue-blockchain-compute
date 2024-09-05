<template>
    <div class="terminal-container">
    <div ref="terminal" class="terminal"></div>
  </div>
  </template>
  
  <script>
  import { Terminal } from 'xterm';
  import 'xterm/css/xterm.css';
  import { FitAddon } from 'xterm-addon-fit';
  import { AttachAddon } from 'xterm-addon-attach';

  export default {
    name: 'TerminalComponent',
    data() {
      return {
        term: null,
        socket: null,
        fitAddon: null,
        attachAddon: null,
        machineId: this.$route.params.itemId,
      };
    },
    mounted() {
      this.initializeTerminal();
      this.setupWebSocket();
      window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
      if (this.socket) {
        this.socket.close(); // 关闭WebSocket连接
      }
      if (this.term) {
        this.term.dispose(); // 销毁终端实例
      }
    },
    methods: {
      initializeTerminal() {
        const defaultTheme = {
          foreground: '#ffffff', // 字体
          background: '#1b212f', // 背景色
          cursor: '#ffffff', // 设置光标
          selection: 'rgba(255, 255, 255, 0.3)',
          black: '#000000',
          brightBlack: '#808080',
          red: '#ce2f2b',
          brightRed: '#f44a47',
          green: '#00b976',
          brightGreen: '#05d289',
          yellow: '#e0d500',
          brightYellow: '#f4f628',
          magenta: '#bd37bc',
          brightMagenta: '#d86cd8',
          blue: '#1d6fca',
          brightBlue: '#358bed',
          cyan: '#00a8cf',
          brightCyan: '#19b8dd',
          white: '#e5e5e5',
          brightWhite: '#ffffff'
        }
        this.term = new Terminal({
            theme: defaultTheme
        });
        this.fitAddon = new FitAddon();
        this.term.loadAddon(this.fitAddon);
        this.term.open(this.$refs.terminal);
        this.fitAddon.fit();
      },
      setupWebSocket() {
        this.socket = new WebSocket('wss://' + window.location.host+ '/api/v1/access/' + this.machineId);
        this.socket.onopen = () => {
          this.term.writeln('WebSocket connection established.');
          this.sendWindowSize();
        };
        this.socket.onerror = error => {
            console.error('WebSocket error:', error);
        };
        this.socket.onclose = () => {
            console.log('WebSocket disconnected');
        };
        this.attachAddon = new AttachAddon(this.socket);
        this.term.loadAddon(this.attachAddon);
      },
      handleResize() {
        if (this.fitAddon) {
          this.fitAddon.fit();  // 重新调整终端大小
          this.sendWindowSize();  // 发送新的窗口大小
        }
      },
      sendWindowSize() {
        const size = { cols: this.term.cols, rows: this.term.rows };
        const blob = new Blob([JSON.stringify(size)], { type: 'application/json' });
        this.socket.send(blob);
      }
    }
  };
  </script>
  
  <style scoped>
.terminal-container {
  position: relative;
  height: 90vh; /* 父容器高度，视具体需求调整 */
}
.terminal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 99%; /* 终端宽度，视具体需求调整 */
  height: 99%; /* 终端高度 */
}
  </style>