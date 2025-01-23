/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from 'axios';
import { IOT_EVENT, IoTComponent, IoTComponentManager, parseIoTProjectDocument, parseIoTProjectLayout } from '@alivecode/core/iot';
import {
  IoTProject,
  IoTProjectDocument,
  IoTProjectLayout,
  JsonObj,
} from '@alivecode/core/api/models/Iot';
// import { IOT_EVENT } from '../types';
// import { parseIoTProjectDocument, parseIoTProjectLayout } from '../utils/utils';
// import { IoTComponent } from '../IoTProjectClasses/IoTComponent';

export type IoTActionDoneRequestToFrontend = {
  actionId: string;
  targetId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

export type IoTSocketUpdateRequest = {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

export type IoTSocketUpdateDocumentRequest = {
  doc: IoTProjectDocument;
};

export type IoTSocketUpdateLayoutRequest = {
  layout: IoTProjectLayout;
};

export enum IoTSocketConnectionStatus {
  CLOSED = 'CLOSED',
  OPENED = 'OPENED',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  RECONNECTING = 'RECONNECTING',
}

export class IoTSocket {
  private socket!: WebSocket;
  private id: string;
  private userId: string;
  private project: IoTProject<IoTComponent>;
  private name: string;
  private iotComponentManager!: IoTComponentManager;
  // private alert: AlertManager;
  private status: IoTSocketConnectionStatus = IoTSocketConnectionStatus.CLOSED;
  private onConnectionUpdateStatus!: (state: IoTSocketConnectionStatus) => void;
  private reconnectInterval!: ReturnType<typeof setInterval>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private onFirstConnectCallbacks: (() => any)[] = [];

  constructor(
    projectId: string,
    userId: string,
    project: IoTProject<IoTComponent>,
    name: string,
    private axios: AxiosInstance,
    // alert: AlertManager,
    private onRender: (saveLayout: boolean) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private onReceiveListen: (fields: { [key: string]: any }) => void,
    private onReceiveActionDone: (data: IoTActionDoneRequestToFrontend) => void,
  ) {
    this.id = projectId;
    this.userId = userId;
    this.project = project;
    this.name = name;
    // this.alert = alert;
    this.onRender = onRender;
    this.onReceiveListen = onReceiveListen;
  }

  public setOnRender(onRender: (saveLayout: boolean) => void) {
    this.onRender = onRender;
  }

  public setOnConnectionUpdateStatus(
    fn: (status: IoTSocketConnectionStatus) => void,
  ) {
    this.onConnectionUpdateStatus = fn;
  }

  public openSocket() {
    console.log("WORKING???")
    if (!import.meta.env.VITE_IOT_URL) throw new Error('Env variable IOT_URL not set');

    if (
      this.socket &&
      (this.socket.readyState === WebSocket.OPEN ||
        this.socket.readyState === WebSocket.CONNECTING)
    )
      return;

    // Opens the connection
    this.socket = new WebSocket(import.meta.env.VITE_IOT_URL);

    // When the socket connects over ws
    this.socket.onopen = async () => {
        console.log("OPEN???")

      // Clearing the retry interval
      clearInterval(this.reconnectInterval);

      // Updating the status
      this.status = IoTSocketConnectionStatus.OPENED;
      this.onConnectionUpdateStatus(this.status);

      // const ticket = await api.db.iot.getIoTTicket(this.id, this.name);
      const ticket = (
        await this.axios.get(
          `users/socket/iotTicket?projectId=${this.id}&projectName=${this.name}`,
        )
      ).data;

      this.socket.send(
        JSON.stringify({
          event: IOT_EVENT.CONNECT_FRONTEND,
          data: {
            ticket,
          },
        }),
      );
    };

    this.socket.onmessage = e => {
      const req = JSON.parse(e.data);
      switch (req.event) {
        case IOT_EVENT.CONNECT_SUCCESS:
          this.status = IoTSocketConnectionStatus.CONNECTED;
          this.onConnectionUpdateStatus(this.status);
          this.onFirstConnectCallbacks.forEach(cb => cb());
          break;
        case IOT_EVENT.PING:
          this.sendEvent(IOT_EVENT.PONG, null);
          break;
        case IOT_EVENT.CONNECT_OBJECT:
          // Finding the object that just connected and updating its state
          { const foundObject1 = this.project.iotProjectObjects?.find(
            obj => obj.iotObjectId === req.data.objectId,
          );
          if (foundObject1) foundObject1.iotObject.connected = true;

          // Re-renders the page
          this.onRender(false);
          break; }
        case IOT_EVENT.DISCONNECT_OBJECT:
          // Finding the object that just connected and updating its state
          { const foundObject2 = this.project.iotProjectObjects?.find(
            obj => obj.iotObjectId === req.data.objectId,
          );
          if (foundObject2) foundObject2.iotObject.connected = false;

          // Re-renders the page
          this.onRender(false);
          break; }
        case IOT_EVENT.RECEIVE_UPDATE_COMPONENT:
          this.onReceiveUpdate(req.data);
          break;
        case IOT_EVENT.RECEIVE_DOC:
            this.onDocumentUpdate(req.data);
          break;
        case IOT_EVENT.RECEIVE_INTERFACE:
            this.onLayoutUpdate(req.data);
          break;
        case IOT_EVENT.RECEIVE_LISTEN:
            this.onReceiveListen(req.data.fields);
          break;
        case IOT_EVENT.RECEIVE_ACTION_DONE:
            this.onReceiveActionDone(req.data);
          break;
        case IOT_EVENT.ERROR:
          alert(String(req.data));
          break;
        case 'new_row':
            console.log("NEW ROW, an't no way...");
            break;
        default:
          console.log('Unknown event', req);
          break;
      }
    };

    this.socket.onerror = (ev: Event) => {
      console.error(ev);
      // this.alert.error(ev);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.socket.onclose = ev => {
      // this.alert.error(t('iot.project.socket.disconnected') + ev.reason);

      // Updates the connection status
      this.status = IoTSocketConnectionStatus.DISCONNECTED;
      this.onConnectionUpdateStatus(this.status);

      // Tries to reconnect (makes a loop)
      setTimeout(() => this.reconnect(), 3000);
    };
  }

  /**
   * Calls the fn passed as a parameter when the IoTSocket first connects to ALIVEcode
   * @param fn Function to call on first IoTSocket connection to ALIVEcode
   */
  public addOnFirstConnectCallback(fn: () => any) {
    // If already connected, call the function
    if (this.getStatus() === IoTSocketConnectionStatus.CONNECTED) fn();
    // If not already connected, add the function to the array of callbacks
    else this.onFirstConnectCallbacks.push(fn);
  }

  public reconnect() {
    // Updates the connection status
    this.status = IoTSocketConnectionStatus.RECONNECTING;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.onConnectionUpdateStatus && this.onConnectionUpdateStatus(this.status);
    this.openSocket();
  }

  public getStatus() {
    // If the status is connected or opened and the connection is actually closed, update the state
    return this.status;
  }

  public checkConnectivity = () => {
    // State was marked as connected, but is not connected
    if (
      (this.status === IoTSocketConnectionStatus.CONNECTED ||
        this.status === IoTSocketConnectionStatus.OPENED) &&
      !this.socket.OPEN
    ) {
      // Updates the status to disconnected
      this.status = IoTSocketConnectionStatus.DISCONNECTED;
      this.onConnectionUpdateStatus(this.status);

      // Tries to reconnect
      setTimeout(() => this.reconnect, 3000);
    }
    // Websocket seems open, but just to make sure, tries to ping
    else if (this.socket.OPEN) {
      this.sendEvent(IOT_EVENT.PING, null);
    }
  };

  public closeSocket() {
    if (this.socket && this.socket.OPEN) this.socket.close();
  }

  public sendEvent(event: IOT_EVENT, data: any) {
    this.socket.send(
      JSON.stringify({
        event,
        data,
      }),
    );
  }

  public sendAction(
    targetId: string,
    actionId: string,
    data: string | JsonObj,
  ) {
    if (this.socket.OPEN) {
      let value = data;

      // Try to get JSON, if invalid set empty object
      if (typeof data === 'string') {
        try {
          value = JSON.parse(data);
        // eslint-disable-next-line no-empty
        } catch {}
      } else {
        value = data;
      }

      this.sendEvent(IOT_EVENT.SEND_ACTION, { targetId, actionId, value });
    }
  }

  /**
   * Update the document
   * @param fields fields to update in the document by their reference
   */
  public updateDoc(fields: { [key: string]: any }) {
    this.sendEvent(IOT_EVENT.UPDATE_DOC, { fields });
  }

  public registerListener(fields: string[]) {
    this.sendEvent(IOT_EVENT.SUBSCRIBE_LISTENER, { fields });
  }
  public onDocumentUpdate(request: IoTSocketUpdateDocumentRequest) {
    this.project.document = parseIoTProjectDocument(request.doc);
    this.getComponentManager()
      ?.getComponents()
      .map(c => c.updateRef());
    this.onRender(false);
  }

  public onLayoutUpdate(request: IoTSocketUpdateLayoutRequest) {
    this.project.layout = parseIoTProjectLayout(request.layout);
    this.getComponentManager()?.setNewLayout(this.project.layout);
    this.onRender(false);
  }

  public onReceiveUpdate(request: IoTSocketUpdateRequest) {
    this.getComponentManager()?.updateComponent(request.id, request.value);
  }

  public setComponentManager(newManager: IoTComponentManager) {
    this.iotComponentManager = newManager;
  }

  public getComponentManager(): IoTComponentManager | null {
    return this.iotComponentManager;
  }
}