export const generateRandomCode = (length = 5) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
};

export const saveDataUrlAsImage = (
  dataUrl: string,
  fileName = 'registration-code.png'
) => {
  // Decode the data URL to get the base64 string
  const base64String = dataUrl.split(',')[1];

  // Convert the base64 string to a binary string
  const binaryString = atob(base64String);

  // Create an array buffer and write the binary string to it
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Create a Blob from the array buffer
  const blob = new Blob([bytes], { type: 'image/png' });

  // Create a temporary link element
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName || 'image.png';

  // Trigger the download
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};
