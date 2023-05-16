import axios from "axios";

export default async function getGenres() {
  const today = new Date();
  
  if (localStorage.getItem("genres")) {
    const genres = JSON.parse(localStorage.getItem("genres") as string);
    const lastResquest = new Date(genres.lastRequest);

    if (today.getDate() - lastResquest.getDate() >= 1) {
      const response = await axios.get("api/get_genres");
      const genres = {
        data: response.data,
        lastRequest: today,
      };
      localStorage.setItem("genres", JSON.stringify(genres));

      return response.data;
    }
    return genres.data;
    
  } else {
    const response = await axios.get("api/get_genres");
    const genres = {
      data: response.data,
      lastRequest: today,
    };
    localStorage.setItem("genres", JSON.stringify(genres));

    return response.data;
  }
}
