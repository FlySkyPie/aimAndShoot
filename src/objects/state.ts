import { MainFacade } from "../facades/main-facade";
import type { IFacade } from "../interfaces/facade.interface";

export const state: IFacade = new MainFacade();
