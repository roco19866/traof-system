const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Generate QR Code as DataURL
exports.generateQRCode = async (data) => {
    try {
        return await QRCode.toDataURL(data);
    } catch (err) {
        console.error(err);
        return null;
    }
};

// Placeholder for better font support (can be extended with custom TTF)
const PRIMARY_FONT = 'Helvetica';
const ARABIC_FONT = 'Helvetica'; // In real app, would use a font like 'Cairo'

// Generate Certificate PDF
exports.createCertificatePDF = async (certData, templateData = {}) => {
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 0 });
    const filename = `cert_${certData.certNumber}.pdf`;
    const filepath = path.join(__dirname, '../uploads/certificates', filename);
    
    // Ensure directory exists
    if (!fs.existsSync(path.join(__dirname, '../uploads/certificates'))) {
        fs.mkdirSync(path.join(__dirname, '../uploads/certificates'), { recursive: true });
    }

    const stream = fs.createWriteStream(filepath);
    doc.pipe(stream);

    // 1. Background
    if (templateData.background_url) {
        try {
            doc.image(path.join(__dirname, '../', templateData.background_url), 0, 0, { width: doc.page.width, height: doc.page.height });
        } catch (e) {
            doc.rect(0, 0, doc.page.width, doc.page.height).fill('#F3F5F7');
        }
    } else {
        doc.rect(0, 0, doc.page.width, doc.page.height).fill('#F3F5F7');
    }

    // 2. Logo
    if (templateData.logo_url) {
        try {
            doc.image(path.join(__dirname, '../', templateData.logo_url), 40, 40, { width: 80 });
        } catch (e) {}
    }

    // 3. Content
    doc.fillColor('#1F6F8B').fontSize(45).text(templateData.title || 'شهادة حضور', 0, 150, { align: 'center' });
    
    doc.moveDown(2);
    doc.fillColor('#000').fontSize(22).text('نشهد أن السيد/ة:', { align: 'center' });
    doc.fontSize(30).fillColor('#1F6F8B').text(certData.participantName, { align: 'center' });
    
    doc.moveDown(1);
    doc.fillColor('#000').fontSize(20).text(`قد حضر/ت بنجاح: ${certData.programName}`, { align: 'center' });
    
    if (templateData.body_text) {
        doc.moveDown(0.5);
        doc.fontSize(14).text(templateData.body_text, { align: 'center', width: 600 });
    }

    // 4. Signatures
    const sigY = doc.page.height - 150;
    doc.fontSize(16).text(templateData.signature_name || 'مدير المركز', 100, sigY, { align: 'left' });
    doc.fontSize(12).text(templateData.signature_title || 'التوقيع الكتروني', 100, sigY + 25, { align: 'left' });

    // 5. QR Code & Metadata
    doc.fontSize(10).text(`رقم الشهادة: ${certData.certNumber}`, doc.page.width - 250, doc.page.height - 40);
    doc.text(`تاريخ الإصدار: ${new Date().toLocaleDateString('ar-SA')}`, doc.page.width - 250, doc.page.height - 25);
    
    if (certData.qrCode) {
        doc.image(certData.qrCode, doc.page.width - 110, doc.page.height - 110, { width: 80 });
    }

    doc.end();
    return filename;
};
