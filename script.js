document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const previewSection = document.getElementById('previewSection');
    const signaturePreview = document.getElementById('signaturePreview');
    const copyBtn = document.getElementById('copyBtn');
    const copyMessage = document.getElementById('copyMessage');

    const template = `
<table cellpadding="0" cellspacing="0" border="0" width="500" style="width:500px; font-family:'DM Sans', Arial, sans-serif; border-collapse:collapse; background:transparent;">

  <!-- DATOS -->
  <tr>
    <td style="padding-top:10px; vertical-align:top;">

      <!-- Nombre: DM Sans Bold -->
      <p style="margin:0 0 2px 0; font-size:12pt; font-weight:700; font-family:'DM Sans', Arial, sans-serif; color:#5b2d8e;"><br><br>
        {name}
      </p>

      <!-- Cargo: DM Sans Regular -->
      <p style="margin:0 0 2px 0; font-size:10pt; font-weight:400; font-family:'DM Sans', Arial, sans-serif; color:#5B2D8E;">
        {title}
      </p>
<br>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse; font-family:'DM Sans', Arial, sans-serif;">
        <tr>
          <!-- Dirección: DM Sans Regular -->
          <td width="170" style="font-size:10pt; font-weight:400; font-family:'DM Sans', Arial, sans-serif; color:#5B2D8E; padding:0; margin:0; line-height:10pt;">
            {address}
          </td>
          <!-- Teléfono: DM Sans Regular -->
          <td width="130" style="font-size:10pt; font-weight:400; font-family:'DM Sans', Arial, sans-serif; color:#5B2D8E; padding:0; margin:0; line-height:10pt;">
            {phone}
          </td>
        </tr>

        <tr>
          <!-- Ciudad: DM Sans Regular -->
          <td width="170" style="font-size:10pt; font-weight:400; font-family:'DM Sans', Arial, sans-serif; color:#5B2D8E; padding:0; margin:0; line-height:10pt;">
            {region}
          </td>
          <!-- Correo: DM Sans Regular -->
          <td width="180" style="font-size:10pt; font-weight:400; font-family:'DM Sans', Arial, sans-serif; color:#5B2D8E; padding:0; margin:0; line-height:10pt;">
            {email}
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

  <!-- IMAGEN -->
  <tr>
    <td style="padding:0;">
      <br><br>
      <img src="https://almacenesmarriott.com/wp-content/uploads/2026/03/firma-2-1.png"
           width="367"
           height="auto"
           style="display:block; width:367px; max-width:367px; height:auto; border:0;"
           alt="Grupo Marriott - 91 años">
    </td>
  </tr>

</table>
    `;

    const cityData = {
        guayaquil: {
            address: 'Km 12.5 vía Salitre',
            region:  'Guayas – Ecuador'
        },
        quito: {
            address: 'América N37-213 y Villalengua',
            region:  'Quito – Ecuador'
        }
    };

    let currentSignatureHTML = '';

    generateBtn.addEventListener('click', () => {
        const name  = document.getElementById('name').value.trim();
        const title = document.getElementById('title').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const city  = document.getElementById('city').value;

        if (!name || !title || !phone || !email) {
            alert('Por favor completa todos los campos.');
            return;
        }

        const { address, region } = cityData[city];

        currentSignatureHTML = template
            .replace('{name}',    name)
            .replace('{title}',   title)
            .replace('{phone}',   phone)
            .replace('{email}',   email)
            .replace('{address}', address)
            .replace('{region}',  region);

        signaturePreview.innerHTML = currentSignatureHTML;
        previewSection.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', async () => {
        if (!currentSignatureHTML) {
            alert('Primero genera la firma.');
            return;
        }

        // Envolvemos la firma en un HTML limpio, sin estilos de fondo
        const cleanHTML = `<!DOCTYPE html><html><head></head><body style="margin:0;padding:0;background:transparent;">${currentSignatureHTML}</body></html>`;

        try {
            // Método moderno: copia HTML limpio sin arrastrar estilos de la página
            const htmlBlob = new Blob([cleanHTML], { type: 'text/html' });
            const textBlob = new Blob([signaturePreview.innerText], { type: 'text/plain' });
            await navigator.clipboard.write([
                new ClipboardItem({ 'text/html': htmlBlob, 'text/plain': textBlob })
            ]);
            copyMessage.classList.add('visible');
            setTimeout(() => copyMessage.classList.remove('visible'), 3000);

        } catch (err) {
            // Fallback: selección manual
            const range = document.createRange();
            range.selectNodeContents(signaturePreview);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            try {
                document.execCommand('copy');
                copyMessage.classList.add('visible');
                setTimeout(() => copyMessage.classList.remove('visible'), 3000);
            } catch (err2) {
                alert('No se pudo copiar automáticamente.\nSelecciona la firma en la vista previa y usa Ctrl+C.');
            }
            selection.removeAllRanges();
        }
    });
});
