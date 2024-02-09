const Loader = () => {
  // map yöntemiyle birden çok şeyi ekrana basabileceğimiz için ve elimizde bir veri olmadığı
  // için item adında basit bir veri oluşturduk
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <>
      {items.map(() => (
        <div
          role="status"
          class="max-w-sm p-4 rounded shadow animate-pulse md:p-6 border-gray-700"
        >
          <div class="flex items-center justify-center h-52 w-full mb-4 rounded bg-gray-700"></div>

          <div class="flex items-center mt-4">
            <svg
              class="w-10 h-10 me-3 text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div>
              <div class="h-2.5 rounded-full bg-gray-700 w-64 mb-2"></div>
              <div class="w-56 h-2 rounded-full bg-gray-700 mb-2" />
              <div class="w-28 h-2 rounded-full bg-gray-700" />
            </div>
          </div>
          <span class="sr-only">Loading...</span>
        </div>
      ))}
    </>
  );
};

export default Loader;
