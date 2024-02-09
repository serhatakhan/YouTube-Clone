import { createContext, useEffect, useState } from "react";
import { categories } from "../constants";
import { getData } from "../helpers/getData";

//1) context temelini oluştur
export const VideoContext = createContext();

//2) Sağlayıcı tanımla
export const VideoProvider = ({ children }) => {
  // kullanıcının seçtiği kategorinin state'ini tutacağız. sidebar'da hangi kategornin seçildiğini bilmek istiyoruz.
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); // ilk değeri ana sayfa olsun yani sayfa yenilenince de ana sayfa seçili olarak gelsin istedik. ondan dolayı state'in başlangıç değeri categories[0]


  // videoların state'ini tutuyoruz
  const [videos, setVideos] = useState(null);


  // KATEGORİ HER DEĞİŞTİĞİNDE API'DEN VERİYİ AL
  useEffect(() => {
    // type'ı menu olan çizgiden sonraki son 4 kategori işlevsiz. menu seçildiyse fonksiyonu durdur.
    if(selectedCategory.type === "menu") return;
    
    // önceki kategorinin verilerini temizle ki Loader tetiklensin ve her farklı kategori seçiminde Skeleton Loader görünsün !
    setVideos(null)
    
    // type'ı home ise, home endpointine istek at.
    if (selectedCategory.type === "home") {
      getData("/home").then((res) => setVideos(res.data.data)); // istek attıktan sonra elde ettiğimiz veriyi tuttuğumuz state'e aktardık. sonra videos state'ini aşağıya value olarak verince ana sayfada bu videolara erişebileceğiz ve onları listeleyebileceğiz
    }
    
    // type'ı trending ise, trending endpointine istek at.
    if(selectedCategory.type === "trending"){
      getData("/trending").then((res) => setVideos(res.data.data));
    }
    
    // type'ı category ise, o zaamn search endpointine istek at. üstteki ikisinin endpointi var ama kalanların yok. search'e istek atacağız.
    if(selectedCategory.type === "category"){
      getData(`/search?query=${selectedCategory.name}`).then((res) => setVideos(res.data.data));
      // rapidapi dökümanında search'e istek atmak için query parametresini zorunlu girmek gerek. bunun değerini de seçtiğimiz kategori adına eşitledik.inputta ararcasına bastığımız kategoriye ait videolar geliyor. bunların endpointi yoktu home ve trend gibi. ondan dolayı böyle bir yol izledik.
    }
  }, [selectedCategory]); // seçili kategoriyi vereceğiz ki kategori her değiştiğinde tekrardan api isteği atsın

  return (
    <VideoContext.Provider
      value={{ selectedCategory, setSelectedCategory, videos }}
    >
      {children}
    </VideoContext.Provider>
  );
};
