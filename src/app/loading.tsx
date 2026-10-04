export default function LoadingPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full border-4 border-red-200 dark:border-gray-800" />
          <div className="w-12 h-12 rounded-full border-4 border-red-600 border-t-transparent animate-spin absolute top-0 left-0" />
        </div>

        <div className="flex items-center space-x-1 text-sm font-bold text-gray-700 dark:text-gray-300">
          <span>সংবাদ লোড হচ্ছে</span>
          <span className="animate-bounce">.</span>
          <span className="animate-bounce [animation-delay:0.2s]">.</span>
          <span className="animate-bounce [animation-delay:0.4s]">.</span>
        </div>
      </div>
    </div>
  );
}