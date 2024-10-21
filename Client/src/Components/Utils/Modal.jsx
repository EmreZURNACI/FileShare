export default function Modal() {
  return (
    <div className="h-screen w-screen fixed top-0 left-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full border-4 border-t-4 border-gray-300 border-t-white w-16 h-16 mb-4"></div>
        <p className="text-white">Yükleniyor...</p>
      </div>
    </div>
  );
}
