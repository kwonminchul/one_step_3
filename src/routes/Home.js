import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Slide from "../components/Slide";
import naviList from "../atom/NaviList";
import axios from "axios";
import Loading from "../components/Loading";

function Home() {
  const [movieContents, setMovieContents] = useState([]);

  useEffect(() => {
    const request = naviList.map(({ title, path }) => {
      return axios.get("https://yts.mx/api/v2/list_movies.json?" + path, {
        params: {
          limit: 10,
          sort_by: "year",
        },
      });
    });

    axios.all(request).then(
      axios.spread(async (...response) => {
        const data = await response.map((res) => {
          if (res.status === 200) {
            return res.data.data.movies;
          }
        });

        console.log(data);
        setMovieContents(data);
      })
    );
  }, []);

  return (
    <div className={styles.container}>
      {naviList.map((slide, idx) => {
        return (
          <div className={styles.slide__box}>
            <h3 className={styles.title}>
              <Link to={`/page/${slide.path}/1`}>
                <i class="fas fa-external-link-alt"></i>
                <span>{slide.title} Movie</span>
              </Link>
            </h3>
            {movieContents && movieContents.length === 0 ? (
              <Loading />
            ) : (
              <Slide movieContents={movieContents[idx]} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Home;
