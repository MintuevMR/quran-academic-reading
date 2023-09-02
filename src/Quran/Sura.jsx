import { useState, useEffect } from "react";
import styles from "./quran.module.scss";
import { useParams } from "react-router-dom";

const Sura = () => {
  const [sura, setSura] = useState([]);
  const [suraName, setSuraName] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const { number } = useParams();

  useEffect(() => {
    fetch(`http://api.alquran.cloud/v1/surah/${number}/ar.alafasy`)
      .then((res) => res.json())
      .then((data) => {
        setSura(data.data.ayahs);
        setSuraName(data.data.englishName);
      });
  }, []);

  const highlightCharacter = (text, char) => {
    const charToHighlight = char;
    const regex = new RegExp(charToHighlight, "g");
    const parts = text.split(regex);
    console.log(parts.length);
    return parts.map((part, index) =>
      index !== parts.length - 1 ? (
        <span key={index}>
          {part}
          <span style={{ backgroundColor: "yellow" }}>{charToHighlight}</span>
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <main>
      <div className="content" dir="rtl">
        <div className={styles.sura}>
          <div>
            <h1>{suraName}</h1>
          </div>

          {sura.map((aya) => {
            return (
              <span
                key={aya.number}
                className={styles.sura}
                onClick={() => {
                  if (!isPlaying) {
                    const audio = new Audio(
                      `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${aya?.number}.mp3`
                    );
                    setIsPlaying(true);
                    audio.onended = () => setIsPlaying(false);
                    audio.play();
                  }
                }}
              >
                {highlightCharacter(aya?.text, "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيم")} ﴿{aya?.number}﴾
              </span>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Sura;
