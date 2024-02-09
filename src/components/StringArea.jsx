import { useState } from "react";

const StringArea = ({ text }) => {
  // text kendi başına çok uzun.
  // BUNUN UZUN HALİNİ Mİ YOKSA KISA HALİNİ Mİ GÖSTERECEĞİZ BUNUN STATE'INI TUTMAMIZ GEREK. geniş mi değil mi state'i tuttuk. açıklama alanına tıklandı mı?
  /*** ARAYÜZDE BİR GÜNCELLEME OLACAKSA BİR KOŞULA BAĞLI OLARAK, ARAYÜZ GÜNCELLENECEKSE, 
  MUTLAKA VE MUTLAKA STATE'I TUTULMALI ***/
  const [expand, setExpand] = useState(false);

  // bir tane de değişken oluşturduk, değerini de propla gelen text'e eşitledik
  let shortText = text;

  // bu alan kapalıysa ve yazı 300 harften uzunsa,
  // o zaman yazıyı kes ve sonuna "... daha fazla" yaz
  if (!expand && text.length > 300) {
    shortText = text.slice(0, 300) + " ... daha fazla";
  }

  return <div onClick={() => setExpand(!expand)}>
    {/* \n, YENİ BİR SATIRI TEMSİL EDİYOR JS'DE !! her bir yeni satırda, yeni bir parça oluştur anlamına geliyor. */}
    {/* sonrasında satırların her birini map ile ekrana bastık ve her satırın sonuna <br> attık */}
    {/* ELİMİZDEKİ VERİYİ SATIR SONLARINI DİKKATE ALARAK PARÇALARA AYIRDIK ÖZETLE. */}
    {/* böylece videonun açıklama yazısındaki boşluklar dikkate alınmış ve ayarlanmış oldu. bundan önce elimizdeki veri yapışık şekilde, hepsi bir bütün şeklinde duruyordu. */}
    {shortText.split("\n").map((line)=> (
        <span>{line} <br /> </span>
    ))}
  </div>;
};

export default StringArea;
