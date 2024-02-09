import axios from "axios";

// istek için gerekli ayarlar
const options = {
  headers: {
    "X-RapidAPI-Key": "62a8239a24msh02d72cb996088bbp1479a4jsnde21dbb27809",
    "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
  },
  params: {
    lang: "tr",
    geo: "TR",
  }
};

// yapılan bütün isteklerde ortak olan başlangıç kısmını belirle
axios.defaults.baseURL = "https://yt-api.p.rapidapi.com";

/*** Parametre olarak aldığı url'e istek atıp geriye,
elde ettiği verileri döndüren bir fonksiyon ***/

// bu fonk bir endpoint'i parametre olarak alıyor, aldığı endpoint'e istek atıyor, elde ettiği veriyi de fonksiyonun çağrıldı yere gönderiyor.
export const getData = async (endpoint) => {
  try {
    // isteği atarken verileri düzgün şekilde elde edebilmek adına options'ı da 2.parametre olarak ekle. rapid api bunları zorunlu kılıyor.
    const res = await axios.get(endpoint, options);
    // fonksiyonun çağırıldığı yere veriyi döndür
    return res;
  } catch (err) {
    console.log("verileri çekerken bir sorun oluştu", err);
  }
};
// .then() ve .catch() DE KULLANILABİLİRDİ. try ve catch KULLANDIK, 
// ASYNC VE AWAIT'I TEKRAR ETMİŞ OLDUK..
