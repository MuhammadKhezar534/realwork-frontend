const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-20 backdrop-blur-sm">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-6 border-[#0B2A7B]"></div>
    </div>
  );
};

export default Loader;
