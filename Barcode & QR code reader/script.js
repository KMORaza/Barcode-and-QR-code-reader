// QR Code Scanner
function onQRScanSuccess(decodedText, decodedResult) {
    // Handle the scanned QR code result
    document.getElementById('qr-result').textContent = `QR Code Result: ${decodedText}`;
}

function startQRScanner() {
    const qrScanner = new Html5Qrcode("qr-reader");
    qrScanner.start({ facingMode: "environment" }, { fps: 10 }, onQRScanSuccess)
        .catch(err => {
            console.error(`QR Scanner error: ${err}`);
        });
}

startQRScanner();

// Barcode Scanner
function onBarcodeScan(result) {
    // Handle the scanned barcode result
    document.getElementById('barcode-result').textContent = `Barcode Result: ${result.codeResult.code}`;
}

function startBarcodeScanner() {
    Quagga.init({
        inputStream: {
            type: "LiveStream",
            target: document.querySelector('#barcode-reader'),
            constraints: {
                facingMode: "environment"
            }
        },
        decoder: {
            readers: [
                "code_128_reader", 
                "ean_reader", 
                "ean_8_reader", 
                "upc_reader", 
                "upc_e_reader"
            ]
        }
    }, function (err) {
        if (err) {
            console.error(`Barcode Scanner error: ${err}`);
            return;
        }
        Quagga.start();
    });

    Quagga.onDetected(onBarcodeScan);
}

startBarcodeScanner();
