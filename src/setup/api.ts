import { ALIVEcoreApi } from '@alivecode/core/api';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

const CLIENT_VERSION = import.meta.env.CLIENT_VERSION ?? '0.0.1';
const BASE_URL = import.meta.env.BACKEND_URL ?? 'http://localhost:8000/api';
const APP_SOCKET_URL = import.meta.env.APP_SOCKET_URL ?? 'ws://localhost:8883';

const queryClient = new QueryClient();

const api = new ALIVEcoreApi(axios, {
  baseUrl: BASE_URL,
  queryClient,
  appSocketUrl: APP_SOCKET_URL,
  clientVersion: CLIENT_VERSION,
});

export default api;