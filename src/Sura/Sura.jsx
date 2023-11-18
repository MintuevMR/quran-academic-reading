import { useState, useEffect } from "react";
import styles from "./sura.module.scss";
import { useParams } from "react-router-dom";
import './tajweed.css';


const Sura = () => {  

 const [sura, setSura] = useState([]);
  const [suraName, setSuraName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(1);
  const [playingAya, setPlayingAya] = useState(null);
  const [isSuraPlaying, setIsSuraPlaying] = useState(false);
  const targetText = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";


  const { number } = useParams();

  useEffect(() => {
    fetch(`http://api.alquran.cloud/v1/surah/${number}`)
      .then((res) => res.json())
      .then((data) => {
        setSura(data.data.ayahs);
        setSuraName(data.data.englishName);
      });
  }, []);


  const playAya = (aya, count) => {
    if (!isPlaying) {
      let playCount = 0;
      const playNext = () => {
        if (playCount < count) {
          const audio = new Audio(`/quran/aya/${aya?.number}.mp3`);
          setIsPlaying(true);
          setPlayingAya(aya?.number);
          audio.onended = () => {
            setIsPlaying(false);
            setPlayingAya(null);
            playCount++;
            playNext();
          };
          audio.play();
        }
      };
      playNext();
    }
  };

  const playSura = () => {
    if (!isSuraPlaying) {
      setIsSuraPlaying(true);
      const playNextAya = (index) => {
        if (index < sura.length) {
          const audio = new Audio(`/quran/aya/${sura[index].number}.mp3`);
          setPlayingAya(sura[index].number);
          audio.play();
          audio.onended = () => {
            setPlayingAya(null);
            playNextAya(index + 1);
          };
        } else {
          setIsSuraPlaying(false);
        }
      };
      playNextAya(0);
    }
  };

  const handleCountPlus = () => {
    if (count === 10) {
      return setCount(1);
    }
    setCount(count + 1);
  };

  const handleCountMinus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <main>
      <div className="content" dir="rtl">
        <div className={styles.sura}>       
          <div>
            <h1>{suraName}</h1>
          </div>
    
          {sura.map((aya) => (
            <span
              key={aya.number}
              className={`${styles.sura} ${
                aya.number === playingAya ? styles.highlight : ""
              }`}
              onClick={() => playAya(aya, count)}
            >
              {aya?.text}﴿{aya?.number}﴾
            </span>
          ))}
        </div>
      </div>
      <div className={`${styles.buttons}`}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
              stroke="#434343"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.07 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.33 19.7 5.02 18.53 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z"
              stroke="#434343"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.5 2C4.32843 2 5 2.67157 5 3.5V20.5C5 21.3284 4.32843 22 3.5 22C2.67157 22 2 21.3284 2 20.5V3.5C2 2.67157 2.67157 2 3.5 2ZM18.7273 2.40348C20.0756 1.41499 22 2.35541 22 4.00291V19.9971C22 21.6446 20.0756 22.585 18.7273 21.5965L7.81818 13.5994C6.72727 12.7997 6.72727 11.2003 7.81818 10.4006L18.7273 2.40348Z"
              fill="#434343"
              fillOpacity="0.4"
            />
          </svg>
        </div>

        <button onClick={playSura}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.59 19.5456C9.18499 20.4237 7.33414 19.9966 6.45601 18.5916C6.15801 18.1148 6 17.5638 6 17.0016V7.00291C6 5.34606 7.34315 4.00291 9 4.00291C9.56226 4.00291 10.1132 4.16092 10.59 4.45892L18.5886 9.45601C19.9936 10.3341 20.4207 12.185 19.5426 13.59C19.3011 13.9763 18.9749 14.3026 18.5886 14.544L10.59 19.5456Z"
              fill="white"
            />
          </svg>
        </button>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.5 2C19.6716 2 19 2.67157 19 3.5V20.5C19 21.3284 19.6716 22 20.5 22C21.3284 22 22 21.3284 22 20.5V3.5C22 2.67157 21.3284 2 20.5 2ZM5.27273 2.40348C3.92429 1.41499 2 2.35541 2 4.00291V19.9971C2 21.6446 3.92429 22.585 5.27273 21.5965L16.1819 13.5994C17.2727 12.7997 17.2727 11.2003 16.1819 10.4006L5.27273 2.40348Z"
              fill="#434343"
            />
          </svg>
        </div>
        <div>
          <svg
            onClick={handleCountPlus}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.70674 1.29289C7.31622 0.902369 6.68305 0.902369 6.29253 1.29289L3.29253 4.29289L3.2896 4.29621C3.26253 4.32353 3.23702 4.35242 3.21322 4.3827L3.20934 4.3871C2.90431 4.77939 2.93204 5.34662 3.29253 5.70711L6.29253 8.70711L6.38673 8.7903C6.77903 9.09532 7.34626 9.06759 7.70674 8.70711L7.78993 8.6129C8.09495 8.22061 8.06722 7.65338 7.70674 7.29289L6.41394 6H14L14.2169 6.00462C16.8777 6.11818 19 8.31124 19 11C19 11.5523 19.4477 12 20 12C20.5523 12 21 11.5523 21 11C21 7.13401 17.866 4 14 4H6.41394L7.70674 2.70711L7.78993 2.6129C8.09495 2.22061 8.06722 1.65338 7.70674 1.29289ZM5.00001 13C5.00001 12.4477 4.55229 12 4.00001 12C3.44772 12 3.00001 12.4477 3.00001 13C3.00001 16.866 6.13401 20 10 20H17.5852L16.2926 21.2929L16.2094 21.3871C15.9043 21.7793 15.932 22.3466 16.2925 22.7071C16.683 23.0976 17.3161 23.0977 17.7067 22.7071L20.7064 19.7078C20.736 19.6782 20.7639 19.6468 20.7896 19.6137L20.7071 19.7071L20.7064 19.7078L16.7075 18H17.5852L5.00001 13ZM5.00001 13C5.00001 15.6888 7.12231 17.8818 9.78312 17.9954L10 18H16.7075L5.00001 13Z"
              fill="#434343"
            />
          </svg>
        </div>
        {count}
      </div>
    </main>
  );
};

export default Sura;
