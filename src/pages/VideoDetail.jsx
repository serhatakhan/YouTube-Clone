import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getData } from "../helpers/getData";
import ReactPlayer from "react-player";
import Loader from "../components/Loader";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import millify from "millify";
import StringArea from "../components/StringArea";
import VideoCard from "../components/VideoCard";
import Comments from "../components/Comments";

const VideoDetail = () => {
  // 4) videolar için state oluşturduk.
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState(null);

  // 1) bizim seçilen videoya, o videonun arama parametresine, burada ERİŞMEMİZ lazım. ARAMA PARAMETRESİNE ERİŞMEK İÇİN KURULUM
  // bu metod bize dizi içinde 2 değer döndürüyordu. değiştirmek için 2.değeri de verebilriz ama şu an kullanmayacağımız için almamıza gerek yok.
  const [searchParams] = useSearchParams();

  // 2) url'den v isimli arama parametresini al bana getir
  const id = searchParams.get("v");

  // 3) id'si bilinen videonun bilgilerini api'den al
  useEffect(() => {
    // api dökümanında tıklanan videoyla ilgili bilgileri almak için bu adres gösteriliyor. ondan dolayı buraya istek attık.
    getData(`/video/info?id=${id}&extend=1`).then((res) => setVideo(res.data));
    // yorumlar için istek at
    getData(`/comments?id=${id}`).then((res) => setComments(res.data.data));
  }, [searchParams]); // eğer arama parametreleri değişirse bu isteği tekrar at.

  // console.log(video)

  return (
    <div className="detail-page h-screen p-5 ">
      {/* Video İçereği */}
      <div className="mb-4 px-3">
        <ReactPlayer
          className={"rounded"}
          width={"100%"}
          height={"62vh"}
          light
          playing
          controls
          url={`https://www.youtube.com/watch?v=${id}`}
        />

        {!video ? (
          <Loader />
        ) : (
          <>
            {/* başlık */}
            <h1 className="my-3 text-xl font-bold">{video.title}</h1>

            {/* kanal bilgileri */}
            <div className="flex justify-between">
              {/* sol */}
              <div className="flex items-center gap-4">
                <img
                  className="rounded-full w-12 h-12"
                  src={video.channelThumbnail[0].url}
                />

                <div>
                  <h4 className="font-bold">{video.channelTitle}</h4>
                  <p className="text-gray-400">{video.subscriberCountText}</p>
                </div>
                <button className="bg-white rounded-full text-black px-3 h-9 transition hover:bg-gray-400">
                  Abone Ol
                </button>
              </div>

              {/* sağ */}
              <div className="flex items-center bg-[#272727] rounded-full cursor-pointer">
                <div className="flex items-center py-1 px-4 border-r">
                  <AiFillLike />
                </div>
                <div className="py-1 px-4">
                  <AiFillDislike />
                </div>
              </div>
            </div>

            {/* video bilgileri */}
            <div className="bg-[#272727] rounded-xl p-2 mt-4 cursor-pointer hover:bg-opacity-80">
              <div className="flex gap-3 mb-2">
                <p>{millify(video.viewCount)} görüntüleme</p>
                <p>{new Date(video.publishDate).toLocaleDateString()}</p>
                {/* saat dakika vs de yazıyordu, sadece tarihi almak istedik */}
              </div>

              <StringArea text={video.description} />
            </div>

            {/* Yorumlar */}
            <div className="flex flex-col gap-3 my-6">
              {!comments ? (
                <Loader />
              ) : (
                comments.map((comment) => <Comments key={comment.commentId} comment={comment} />)
              )}
            </div>
          </>
        )}
      </div>

      {/* Alakalı İçerikler */}
      <div className="flex flex-col gap-3 pb-8 px-3">
        {!video ? (
          <Loader />
        ) : (
          video.relatedVideos.data.map(
            (item) =>
              item.type === "video" && <VideoCard video={item} isRow={true} />
          )
        )}
      </div>
    </div>
  );
};
// isRow propu, alakalı videoların detay sayfasındaki görünümünü belirtiyor. çünkü
// alakalı videolar, videocard'da nasıl dizayn ettiysek öyle geliyor. detay sayfasında daha farklı görünmesini istiyoruz.
// bu propu feed.jsx de VideoCard bileşeninde kullanmadık. burayla ilgili olduğu için buradaki videocard'a prop yolladık.

export default VideoDetail;
