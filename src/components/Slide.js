import { useState, useEffect } from "react";
import styles from "./Slide.module.css";
import Movie from "./Movie";

function Slide({ movieContents }) {
  const [trans, setTrans] = useState(0);

  const onClickL = () => {
    if (trans >= 0) {
      return;
    }
    setTrans((current) => current + 350);
  };
  const onClickR = () => {
    if (trans <= -2450) {
      return;
    }
    setTrans((current) => current - 350);
  };

  return (
    <div className={styles.container}>
      <div className={styles.slide__show}>
        <div
          className={styles.slide}
          style={{
            transform: `translateX(${trans}px)`,
          }}
        >
          {movieContents.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              year={movie.year}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              genres={movie.genres}
              movie_style={{
                minWidth: "350px",
                height: "275px",
              }}
            />
          ))}
        </div>
      </div>
      <div>
        <button class={styles.left} onClick={onClickL}>
          <i class="fas fa-caret-square-left"></i>
        </button>
        <button class={styles.right} onClick={onClickR}>
          <i class="fas fa-caret-square-right"></i>
        </button>
      </div>
    </div>
  );
}

export default Slide;
