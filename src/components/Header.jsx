import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { BsBell } from "react-icons/bs";
import { IoVideocamOutline } from "react-icons/io5";
import { IoMdMic } from "react-icons/io";

const Header = () => {
  // KULLANICIYI ARAMA SONUÇLARI SAYFASINA YÖNLENDİRİP PARAMETRE OLARAK TEXT'İ EKLEYECEĞİZ
  // BİR FONK. İÇİNDE YÖNLENDİRME YAPMAMIZ LAZIM. FONKSİYONDAKİ YÖNLENDİRMELERİ useNavigate İLE YAPIYORUZ.
  const navigate = useNavigate()


  // form gönderilince tetiklenir
  const handleSubmit = (e)=>{
    e.preventDefault()

    // inputa girilen veri
    const text = e.target[0].value

    // kullanıcıyı sonuçlar sayfasına yönlendir,
    // search_query parametresi olarak aratılan terimi ekle. (search_query ismini biz belirledik. youtube'da aynı ismi kullanıyor. benzer olsun istedik)
    navigate(`/results?search_query=${text}`)
  }

  return (
    <div className="flex justify-between items-center p-4 lg:mx-4 relative">
      <Link to={"/"} className="flex items-center gap-[5px]" >
        <img className=" w-[44px]" src="/youtube.png" alt="youtube logo" />
        <h1 className="hidden sm:block text-xl font-bold tracking-tight">YouTube</h1>
        <span className="absolute left-[146px] top-[20px] text-[11px] hidden sm:block text-[#aaaaaa]">TR</span>
      </Link>

     <div className="relative mr-7">
      <form onSubmit={handleSubmit} className="flex items-center border-2 border-[#222222] rounded-[20px] overflow-hidden">
        <input className="bg-[#0F0F0F] text-white px-3 py-1 outline-none md:w-[420px]" type="search" placeholder="Ara" /> {/*md:w-[440px]: md ve devamındaki ekranlarda genişliği 440px olsun */}
        <button className="bg-[#222222] px-3 py-2 text-2xl"><IoIosSearch /></button>
        <div className="bg-[#222222] p-2 w-10 h-10 rounded-full text-2xl cursor-pointer absolute right-[-46px] hover:bg-[#3D3D3D]"><IoMdMic /></div>
      </form>
     </div>


      <div className="flex gap-4 text-xl cursor-pointer">
        <span><IoVideocamOutline className="hover:text-gray-400 transition duration-200 text-2xl" /></span>
        <span><BsBell className="hover:text-gray-400 transition duration-200 text-2xl" /></span>
      </div>
    </div>
  );
};

export default Header;
