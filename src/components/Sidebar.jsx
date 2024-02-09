import { useContext } from "react";
import { categories } from "../constants";
import { VideoContext } from "../context/videoContext";

const Sidebar = () => {
  const {selectedCategory, setSelectedCategory} = useContext(VideoContext);
  // console.log(selectedCategory)

  return (
    <div className="flex flex-col p-1 md:p-4 lg:ml-3">
      {categories.map((item) => (
        <div key={item.name} onClick={()=> setSelectedCategory(item)} > {/* key propunun her zaman parent elementte olması gerekiyor. */}
        
          {/* önce seçilen kategoriyi state'de tuttuk. sonrasında bir koşul yazdık. koşulda şöyle: state'de tuttuğum veri ile ekrana bastığım kategori eşleşiyorsa o zaman arka plan rengi değişsin istedik. */}
          <div className={`${selectedCategory.name===item.name && "bg-[#2b2a2a]"} flex items-center gap-2 py-4 px-3 md:px-2 text-base md:text-lg hover:bg-[#2d2d2d] rounded-md`}>
            <span className="cursor-pointer max-sm:text-2xl">{item.icon}</span>
            <span className="cursor-pointer max-sm:hidden">{item.name}</span>
            {/* sm:block hidden ile aynı anlama geliyor*/}
          </div>

          {/* divider, true ise ekrana çizgi bas */}
          {item.divider && <hr />}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
