import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { listPageReLoading, focusNavi } from "../atom/Atoms";
import styles from "./Navi.module.css";
import naviList from "../atom/NaviList";

function Navi() {
  let last_known_scroll_position = 0;
  let ticking = false;
  const [changing, setChanging] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const pageReLoading = useSetRecoilState(listPageReLoading);
  const [focusPath, setFocusPath] = useRecoilState(focusNavi);

  const doSomething = (scroll_pos) => {
    if (scroll_pos >= 10) {
      setChanging(true);
      setScrolling(true);
    } else {
      setChanging(false);
      setScrolling(false);
    }
  };

  window.addEventListener("scroll", function (e) {
    last_known_scroll_position = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function () {
        doSomething(last_known_scroll_position);
        ticking = false;
      });
      ticking = true;
    }
  });

  const onMouseOverOut = () => {
    if (scrolling) return;
    setChanging((current) => !current);
  };
  const optionOnClick = () => {
    pageReLoading(true);
  };
  return (
    <div>
      <navi
        onMouseOver={onMouseOverOut}
        onMouseOut={onMouseOverOut}
        style={
          changing
            ? {
                backgroundColor: "#252525",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
              }
            : { backgroundColor: "transparent" }
        }
        className={styles.container}
      >
        <div className={styles.title}>
          <Link to="/one_step_3" onClick={() => setFocusPath("")}>
            <strong>UTFLEX</strong>
          </Link>
        </div>
        <ul className={styles.option__list}>
          {naviList.map(({ title, path }) => {
            return (
              <li>
                <Link
                  to={`/page/${path}/1`}
                  onClick={focusPath !== path ? optionOnClick : null}
                  style={
                    focusPath !== path
                      ? null
                      : {
                          color: "#ffffff",
                        }
                  }
                >
                  {title}
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className={styles.icon__list}>
          <li>
            {/* <a href="https://twitter.com/?lang=ko" target="_blank">
              <i class="fab fa-twitter-square"></i>
            </a> */}
          </li>
          <li>
            {/* <a href="https://www.instagram.com/" target="_blank">
              <i class="fab fa-instagram"></i>
            </a> */}
          </li>
        </ul>
      </navi>
      <div className={styles.null}></div>
    </div>
  );
}

export default Navi;
