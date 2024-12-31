import { ALIVEcoreApi } from '@alivecode/core/api';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

const CLIENT_VERSION = import.meta.env.CLIENT_VERSION ?? 'latest';
const BASE_URL = import.meta.env.BACKEND_URL ?? 'http://192.168.2.60:8000/api';
const APP_SOCKET_URL = import.meta.env.APP_SOCKET_URL ?? 'ws://192.168.2.60:8883';

const queryClient = new QueryClient();

const api = new ALIVEcoreApi(axios, {
  baseUrl: BASE_URL,
  queryClient,
  appSocketUrl: APP_SOCKET_URL,
  clientVersion: CLIENT_VERSION,
});

export default api;