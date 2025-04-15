export const generateCollabId = (): string => {
  const timestamp = Date.now().toString(36); // Convert timestamp to base-36
  const random = Math.random().toString(36).substring(2, 10); // Random part
  return `${timestamp}-${random}`;
};
