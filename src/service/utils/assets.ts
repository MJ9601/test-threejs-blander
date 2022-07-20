export default {
  glbFiles: [{ name: "room", path: "/assets/models/portfolio.glb" }],
  images: [{ name: "image1", path: "/assets/images/image.jpg" }],
  videos: [{ name: "starwars", path: "/assets/videos/starwars.mp4" }],
};

export type Assets = {
  glbFiles: { name: string; path: string }[];
  images: { name: string; path: string }[];
  videos: { name: string; path: string }[];
};
