const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="mb-4">
        {/* Add QR Code Image Here */}
        {/* For demonstration purposes */}
        <img src="/90scake_logo.jpg" alt="QR Code" width={200} height={200} />
      </div>
      <p className="text-lg mb-8">
        Please scan the QR code to access the{" "}
        <strong>90scake Facebook page.</strong>
      </p>
      <div className="mb-4">
        {/* Add QR Code Image Here */}
        {/* For demonstration purposes */}
        <img src="qrCode.png" alt="QR Code" width={200} height={200} />
      </div>
      <p className="text-lg text-gray-600">
        Our website is currently under development, and online ordering will be
        available soon.
      </p>
    </div>
  );
};

export default Home;
