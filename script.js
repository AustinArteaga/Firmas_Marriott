document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const previewSection = document.getElementById('previewSection');
    const signaturePreview = document.getElementById('signaturePreview');
    const copyBtn = document.getElementById('copyBtn');
    const copyMessage = document.getElementById('copyMessage');

    const template = `
<table cellpadding="0" cellspacing="0" border="0" width="900" style="width:900px; font-family:'DM Sans', 'DM Sans Bold', Arial, sans-serif; border-collapse:collapse;">
  <tr>
    <!-- IMAGEN -->
    <td width="600" style="width:600px; vertical-align:top; padding:0;">
      <img src="https://github.com/marriottit/ImagenesFirma/blob/main/firma%20(1).png?raw=true"
           width="600"
           style="display:block; width:600px; height:auto; border:0;"
           alt="Grupo Marriott - 91 años">
    </td>

    <!-- DATOS -->
    <td width="300" style="width:300px; padding-left:16px; vertical-align:top;">
      
      <!-- Nombre -->
      <p style="margin:0 0 2px 0; font-size:10pt; font-weight:700; color:#5B2D8E;">
        {name}
      </p>

      <!-- Cargo -->
      <p style="margin:0 0 8px 0; font-size:8pt; color:#5B2D8E;">
        {title}
      </p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse; font-family:'DM Sans', Arial, sans-serif;">
        <tr>
          <td width="170" style="font-size:8pt; font-weight:400; color:#5B2D8E; font-family:'DM Sans', Arial, sans-serif; padding:0; margin:0; line-height:10pt; mso-line-height-rule:exactly;">
            Km 12.5 vía Salitre
          </td>
          <td width="130" style="font-size:8pt; color:#5B2D8E; padding:0; margin:0; line-height:10pt; mso-line-height-rule:exactly;">
            {phone}
          </td>
        </tr>

        <tr>
          <td width="170" style="font-size:8pt; font-weight:400; color:#5B2D8E; font-family:'DM Sans', Arial, sans-serif; padding:0; margin:0; line-height:10pt; mso-line-height-rule:exactly;">
            Guayas – Ecuador
          </td>
          <td width="130" style="font-size:8pt; color:#5B2D8E; padding:0; margin:0; line-height:10pt; mso-line-height-rule:exactly;">
            {email}
          </td>
        </tr>

        <tr>
          <td colspan="2" style="padding-top:4px; font-size:8pt; font-weight:700; color:#5B2D8E;">
            grupomarriott.com
          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>
    `;

    let currentSignatureHTML = '';

    generateBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value.trim();
        const title = document.getElementById('title').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();

        if (!name || !title || !phone || !email) {
            alert('Por favor completa todos los campos.');
            return;
        }

        currentSignatureHTML = template
            .replace('{name}', name)
            .replace('{title}', title)
            .replace('{phone}', phone)
            .replace('{email}', email);

        signaturePreview.innerHTML = currentSignatureHTML;
        previewSection.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        if (!currentSignatureHTML) {
            alert('Primero genera la firma.');
            return;
        }

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = currentSignatureHTML;
        document.body.appendChild(tempDiv);

        const range = document.createRange();
        range.selectNodeContents(tempDiv);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        try {
            document.execCommand('copy');
            copyMessage.classList.add('visible');
            setTimeout(() => {
                copyMessage.classList.remove('visible');
            }, 3000);
        } catch (err) {
            alert('No se pudo copiar automáticamente.\nSelecciona la firma en la vista previa y usa Ctrl+C.');
        }

        selection.removeAllRanges();
        document.body.removeChild(tempDiv);
    });
});