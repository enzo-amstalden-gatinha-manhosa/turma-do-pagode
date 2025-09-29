const QRCode = require('qrcode');

  /**
    * Gera um QR Code em base64 a partir de uma string
    * @param {string} data - informação que será codificada no QR Code
    * @returns {Promise<string>} - QR Code em formato data:image/png;base64
    */
async function generateQRCode(data) {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(data);
    return qrCodeDataURL;
  } catch (err) {
    throw new Error('Erro ao gerar QR Code: ' + err.message);
  }
}

module.exports = { generateQRCode };
