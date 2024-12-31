import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ca.aliveculture.app',
  appName: 'aliveculture',
  webDir: 'dist',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
  server: {
    cleartext: true,
    hostname: "192.168.2.60",
    androidScheme: "https",
  }
};

export default config;
