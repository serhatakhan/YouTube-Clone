import { useSearchParams } from "react-router-dom";
import Sidebar from "./../components/Sidebar";
import { useEffect, useState } from "react";
import { getData } from "../helpers/getData";
import Loader from "../components/Loader";
import VideoCard from "../components/VideoCard";

const SearchResult = () => {
  const [results, setResults] = useState();

  // 1) url'den aratılan terimi al
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query");

  // 2) api'den aratılan terime uygun videoları al
  useEffect(() => {
    getData(`/search?query=${query}&type=video`).then((res) =>
      setResults(res.data.data)
    );
  }, [query]);
  /*** her yeni terim aratıldığında useEffect'in tekrar çalışmasını istiyoruz.
   bu yüzden BAĞIMLILIK DİZİSİNE arama parametresini verdik.
   bu sayede parametreler her değiştiğinde useEffect tekrar çalışacak. ***/

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col items-center flex-1 px-4 gap-10 h-screen">
        <div className="flex flex-col gap-6 max-w-[1000px]">
          {/* flex-1: bir elementin sahip olduğu bütün alanı kaplamasını sağlar */}
          <p className="flex gap-2 text-lg">
            <span className="font-bold"> {query} </span>
            <span>için sonuçlar</span>
          </p>

          {!results ? (
            <Loader />
          ) : (
            results.map(
              (result) =>
                result.type === "video" && (<VideoCard key={result.videoId} video={result} isRow={true} />))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
