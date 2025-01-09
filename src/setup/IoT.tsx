import { IoTComponent, iotComponentRegistry } from "@alivecode/core/iot";

class MyIoTComponent extends IoTComponent {
    type = "myComponent" as const;

    acceptsControllable: boolean = false;
    acceptsUncontrollable: boolean = false;

    validate(): boolean {
        throw new Error("Method not implemented.");
    }
    update(): void {
        throw new Error("Method not implemented.");
    }
    value: any;
    defaultValue: any;
}

declare module '@alivecode/core' {
  interface CustomTypes {
    IoTComponents: "myComponent"
  }
}

iotComponentRegistry.addIoTComponent("myComponent", MyIoTComponent);