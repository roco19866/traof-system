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

// Generate Certificate PDF
exports.createCertificatePDF = async (certData) => {
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
    const filename = `cert_${certData.certNumber}.pdf`;
    const filepath = path.join(__dirname, '../uploads/certificates', filename);
    
    // Ensure directory exists
    if (!fs.existsSync(path.join(__dirname, '../uploads/certificates'))) {
        fs.mkdirSync(path.join(__dirname, '../uploads/certificates'), { recursive: true });
    }

    const stream = fs.createWriteStream(filepath);
    doc.pipe(stream);

    // Mock Certificate Design
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#F3F5F7');
    doc.fillColor('#1F6F8B').fontSize(40).text('شهادة حضور', { align: 'center' });
    doc.moveDown();
    doc.fillColor('#000').fontSize(20).text(`نشهد أن السيد/ة: ${certData.participantName}`, { align: 'center' });
    doc.moveDown();
    doc.text(`قد حضر/ت دورة: ${certData.programName}`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`رقم الشهادة: ${certData.certNumber}`, { align: 'right' });
    
    // Add QR Code if available
    if (certData.qrCode) {
        doc.image(certData.qrCode, doc.page.width - 120, doc.page.height - 120, { width: 100 });
    }

    doc.end();
    return filename;
};
