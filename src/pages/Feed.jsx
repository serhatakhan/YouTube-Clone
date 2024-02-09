import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { VideoContext } from "../context/videoContext";
import VideoCard from "../components/VideoCard";
import Loader from "../components/Loader";

const Feed = () => {
  // videoları çekmek için abone ol
  const { videos } = useContext(VideoContext);

  return (
    <div className="flex">
      <Sidebar />

      <div className="videos">
        {!videos ? ( <Loader /> ) 
        : ( videos.map((item) => item.type === "video" && ( <VideoCard key={item.videoId} video={item} />)))} {/* Loader bastığımız için videos?.map diye ? koymamıza gerek kalmıyor */}
      </div> {/* gönderdiğimiz propun ismi video, değeri ise item. bunu VideoCard'a {video} diyerek prop olarak yolladık */}
    </div>
  );
};

export default Feed;
