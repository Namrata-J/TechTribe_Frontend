export type AlertSeverityType = 'error' | 'info' | 'success' | 'warning';

export interface AlertState {
    text: string;
    severity: AlertSeverityType;
    isAlertVisible: boolean;
  }