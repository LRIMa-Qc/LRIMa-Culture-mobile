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
    hostname: "alivecode.ca",
    androidScheme: "https",
  }
};

export default config;
