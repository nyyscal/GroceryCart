import React from 'react';

const Newsletter = () => {
  return (
    <div className="flex items-center justify-center  bg-gray-50 px-4 mt-24 pb-14">
      <div className="flex flex-col items-center justify-center bg-white shadow-[0px_4px_25px_0px_#0000000D] text-gray-900/60 rounded-xl max-w-lg w-full md:py-8 py-6">
        <div className="flex items-center justify-center p-3 bg-red-100 rounded-full">
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/model/faceIcon.svg"
            alt="faceIcon"
          />
        </div>
        <h2 className="text-slate-900 font-medium mt-3 text-lg">Enjoying this post?</h2>
        <p className="text-sm text-slate-900/60 mt-1 md:w-80 w-72 text-center">
          Subscribe to get more content like this delivered to your inbox for free!
        </p>
        <div className="flex items-center mt-5 w-full md:px-16 px-6">
          <input
            type="email"
            placeholder="Enter Your Email"
            className="text-sm border-r-0 outline-none border border-gray-500/50 pl-3 w-full h-10 rounded-l-md"
          />
          <button
            type="button"
            className="font-medium text-sm text-white bg-primary hover:bg-primary-dull cursor-pointer w-36 h-10 rounded-r-md"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
