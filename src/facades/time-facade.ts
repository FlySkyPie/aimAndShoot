import type { ITimeFacade } from "../interfaces/time-facade.interface";

export const timeFacade: ITimeFacade = {
  prevTime: Date.now(),
  nextTime: Date.now(),
  deltaTime: Date.now(),
  startTime: Date.now(),
  totalTime: 0,
};
