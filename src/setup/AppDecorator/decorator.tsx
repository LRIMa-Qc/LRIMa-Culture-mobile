import { ALIVEcoreDecorator } from "@alivecode/core";
import { AppDecorator } from "./component";

export const appDecorator: ALIVEcoreDecorator = (App) => <AppDecorator App={App} />