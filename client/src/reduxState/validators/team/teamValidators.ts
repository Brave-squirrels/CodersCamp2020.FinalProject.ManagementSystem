export const teamName = (data: any) =>
  (data.length > 0 && data.length < 4) || data.length > 24 ? false : true;

export const teamDescription = (data: any) =>
  (data.length > 0 && data.length < 4) || data.length > 254 ? false : true;
