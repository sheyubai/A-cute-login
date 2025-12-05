export interface MousePosition {
  x: number;
  y: number;
}

export enum LoginState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS'
}

export interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  delay: number;
}