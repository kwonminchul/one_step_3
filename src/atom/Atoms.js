import { atom } from "recoil";

const listPageReLoading = atom({
  key: "listPageReLoading",
  default: false,
});

const focusNavi = atom({
  key: "focusNavi",
  default: "",
});

export { listPageReLoading, focusNavi };
