import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardQuran from "../CardQuran/CardQuran";

const Quran = () => {
  const [surahs,  setSurahs] = useState([]);

  useEffect(() => {
    fetch("http://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => setSurahs(data.data));
  }, []);

  return (
    <main>
      <div className="content">
        {surahs.map((sura) => {
          return (
            <Link key={sura.number} to={`/quran/${sura.number}`}>
              <CardQuran
                id={sura.number}
                number={sura.number}
                title={sura.englishName}
                subTitle={sura.name}
              />
            </Link>
          );
        })}
      </div>
    </main>
  );
};

export default Quran;
