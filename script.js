document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const previewSection = document.getElementById('previewSection');
    const signaturePreview = document.getElementById('signaturePreview');
    const copyBtn = document.getElementById('copyBtn');
    const copyMessage = document.getElementById('copyMessage');

    const template = `
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<table cellpadding="0" cellspacing="0" border="0" width="500" style="width:500px; font-family:'DM Sans', Arial, sans-serif; border-collapse:collapse;">
  
  <!-- IMAGEN -->
  <tr>
    <td style="padding:0;">
      <img src="https://github.com/marriottit/ImagenesFirma/blob/main/firma.png?raw=true"
           width="500"
           style="display:block; width:480px; height:auto; border:0;"
           alt="Grupo Marriott - 91 años">
    </td>
  </tr>

  <!-- DATOS -->
  <tr>
    <td style="padding-top:10px; vertical-align:top;">
      
      <!-- Nombre: DM Sans Bold -->
      <p style="margin:0 0 2px 0; font-size:12pt; font-weight:700; font-family:'DM Sans', Arial, sans-serif; color:#5b2d8e;"><br><br>
        %%Displayname%%
      </p>

      <!-- Cargo: DM Sans Regular -->
      <p style="margin:0 0 2px 0; font-size:10pt; font-weight:400; font-family:'DM Sans', Arial, sans-serif; color:#5B2D8E;">
        %%Title%%
      </p>

      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse; font-family:'DM Sans', Arial, sans-serif;">
        <tr>
          <!-- Dirección: DM Sans Regular -->
          <td width="170" style="font-size:10pt; font-weight:400; font-family:'DM Sans', Arial, sans-serif; color:#5B2D8E; padding:0; margin:0; line-height:10pt;">
            Km 12.5 vía Salitre
          </td>
          <!-- Teléfono: DM Sans Regular -->
          <td width="130" style="font-size:10pt; font-weight:400; font-family:'DM Sans', Arial, sans-serif; color:#5B2D8E; padding:0; margin:0; line-height:10pt;">
            %%Phone%%
          </td>
        </tr>

        <tr>
          <!-- Ciudad: DM Sans Regular -->
          <td width="170" style="font-size:10pt; font-weight:400; font-family:'DM Sans', Arial, sans-serif; color:#5B2D8E; padding:0; margin:0; line-height:10pt;">
            Guayas – Ecuador
          </td>
          <!-- Correo: DM Sans Regular -->
          <td width="180" style="font-size:10pt; font-weight:400; font-family:'DM Sans', Arial, sans-serif; color:#5B2D8E; padding:0; margin:0; line-height:10pt;">
            %%Email%%
          </td>
          <!-- Web: DM Sans Bold -->
          <td width="130" style="font-size:10pt; font-family:'DM Sans', Arial, sans-serif; color:#5B2D8E; padding:0; margin:0; line-height:10pt;">
            <a href="https://grupomarriott.com" style="color:#5B2D8E; text-decoration:none; font-family:'DM Sans', Arial, sans-serif;">
              <span style="font-weight:700;">grupomarriott</span><span style="font-weight:400;">.com</span>
            </a>
          </td>
        </tr>

      </table>

    </td>
  </tr>

</table>
</body>
</html>
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
