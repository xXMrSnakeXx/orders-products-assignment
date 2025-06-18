let connectedClients: number = 0;

export const incrementClients = (): number => {
  connectedClients++;
  return connectedClients;
};

export const decrementClients = (): number => {
  connectedClients--;
  return connectedClients;
};

export const getConnectedClients = (): number => connectedClients;
