module.exports = {
    devServer: {
      https: true, // 启用 HTTPS
      host: '0.0.0.0', // 允许外部设备访问
      port: 8080, // 指定端口号
    //   public: '10.196.109.185:8080', // 公开的完整地址
      client: {
        webSocketURL: 'wss://10.196.109.185:8080/ws', // WebSocket URL
      },
    },
  };