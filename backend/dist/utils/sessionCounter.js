let connectedClients = 0;
export const incrementClients = () => {
    connectedClients++;
    return connectedClients;
};
export const decrementClients = () => {
    connectedClients--;
    return connectedClients;
};
export const getConnectedClients = () => connectedClients;
