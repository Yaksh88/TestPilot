

const BackgroundBlobs = () => {
    return (
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob" />
        <div className="absolute top-[30%] right-0 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-[40%] w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000" />
        
      </div>
    );
  };
  
  
export default BackgroundBlobs;
