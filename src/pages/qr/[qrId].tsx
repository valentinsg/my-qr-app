import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { QRCodeSVG } from 'qrcode.react';

interface QRPageProps {
  qrId: string;
}

const QRPage: React.FC<QRPageProps> = ({ qrId }) => {
  const router = useRouter();
  const { qrId: routerQrId } = router.query;

  const finalQrId = qrId || routerQrId;

  if (!finalQrId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the QR page for: {finalQrId}</h1>
      <QRCodeSVG value={`https://pornhub.com/`} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const qrId = context.params?.qrId as string;

  return {
    props: { qrId },
  };
};

export default QRPage;