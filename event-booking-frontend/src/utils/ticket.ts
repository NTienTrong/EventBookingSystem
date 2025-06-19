export const generateTicketCode = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `TICKET-${timestamp}-${random}`.toUpperCase();
};

export function generateQRCode(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `${timestamp}${random}`;
} 