import millify from "millify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VideoCard = ({ video, isRow }) => {
  // console.log(video);

  // KULLANICI MOUSE'U RESMİN ÜZERİNE GETİRDİ Mİ? BUNUN STATE'INI TUTMAMIZ LAZIM !!
  // sonra mouse üzerine gelen resim yerine hareketli hali oyanayacak. onunla ilgili koşul yazacağız.
  // STATE'INI TUTTUK, ARTIK ELİMİZDE VERİSİ VAR. BUNUN ÜZERİNDEN KOŞUL YAZABİLİRİZ. VERİ OLMADAN KOŞUL YAZAMAYIZ !!!
  const [isHover, setIsHover] = useState(false);

  // aşağıdaki div'e tıklanınca yönlendirme yapmak için kullandık
  const navigate = useNavigate();

  return (
    // bir element div iken yönlendirme yapmak istiyorsak (buna tıklanınca /watch sayfasına yönlendirmek istiyorsak) useNavigate kullanabiliriz.
    // ortada bir dinamik sayfa varsa ve biz bu sayfanın içeriğini belirlemek istiyorsak bu iş, o içeriğin id'sine göre olabilir.
    // BUNUN TUTULACAĞI YER DE HER ZAMAN URL'DEKİ PARAMETRELERDİR. YANİ TEK YOL İD'SİNİN URL'YE EKLENMESİ. bunun da 2 yolu vardı: 1)normal parametre(router-dom örneğinde bu yolu izledik), 2)arama parametresi(şimdi bu yolu izleyeceğiz)
    // yönlendireceğim url'nin dinamik olması lazım. `v=` buradaki v parametrenin adı. öyle yazdık youtube'e benzer olsun diye.
    <div
      onClick={() => navigate(`/watch?v=${video.videoId}`)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={`${isRow ? "row" : ""} cursor-pointer`}>
      {/* isRow değeri varsa, row classı olsun yoksa hiçbir şey koyma dedik. detay sayfasındaki alakalı videoları dizayn etmek için kullanıyoruz bu yolu. */}


      {/* resim alanı */}
      <div>
        {/* mouse üzerine geldiyse ve hareketli resmi varsa onu bas yoksa önceki resmini bas */}
        <img
          className="rounded-lg w-full h-full v-pic"
          src={
            isHover && video.richThumbnail
              ? video.richThumbnail[0].url
              : video.thumbnail[video.thumbnail.length - 1].url
          }
        />
        {/* bazı videoların 2 resmi var ve 2.resmin çözünürlüğü daha iyi. o yüzden 2 resmi varsa 2.resmi alabilelim diye dizinin uzunluğu - 1 yaptık. bu bize o dizideki son resmi veriyor. 2.resim yoksada 1.resmi alacak. */}
      </div>

      {/* alt detay alanı */}
      <div className="flex gap-4">
        <img
          className="w-14 h-14 rounded-full c-pic"
          src={video.channelThumbnail[0].url}
          alt="channel picture"/>

        <div >
          <h4 className="font-bold line-clamp-2 v-title">{video.title}</h4>{" "}
          {/* line-clamp-2 kullanarak 2 satırdan fazla olmasın dedik videoların adını. 2 satırdan fazla olacağı zaman devamına ... koyacak */}
          <p className="text-[#aaaaaa] tracking-tight c-name">{video.channelTitle}</p>
          <div className="flex gap-1 text-[#aaaaaa] tracking-tight c-detail">
            <p>{millify(video.viewCount)} <span>görüntüleme</span> </p>
            <p>•</p>
            <p>{video.publishedTimeText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
