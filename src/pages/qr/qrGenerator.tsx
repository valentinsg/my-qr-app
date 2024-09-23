import QRCode from 'qrcode';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface QRGeneratorProps {
  qrId: string;
}

const QRGenerator: React.FC<QRGeneratorProps> = ({ qrId }) => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    QRCode.toDataURL(`http://tu-dominio.com/qr/${qrId}`)
      .then((dataUrl: string) => {
        setUrl(dataUrl);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }, [qrId]);

  return <Image src={url} alt="QR Code" width={200} height={200} />;
};

export default QRGenerator;
