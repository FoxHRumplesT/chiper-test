import { StolenCase } from "../entities/stolen-case";

const API = "https://bikeindex.org:443/api/v3/";

export const fetchStolenBikesService = (
  page: number,
  city: string,
  perPage: number = 10,
  description: string = ''
): Promise<{ bikes: StolenCase[]; count: number }> => {
  let searchUrl = `${API}/search?page=${page}&per_page=${perPage}&location=${city}&distance=1&stolenness=stolen`;
  let countUrl = `${API}/search/count?location=${city}&distance=1&stolenness=stolen`;
  if (description) {
    searchUrl = searchUrl + `&query=${description}`;
    countUrl = countUrl + `&query=${description}`;
  }
  return Promise.all([fetch(searchUrl), fetch(countUrl)]).then(
    async ([bikes, count]) => {
      if (!bikes.ok || !count.ok) {
        throw new Error("Not 2xx response");
      } else {
        const bikesResponse = await bikes.json();
        const countResponse = await count.json();
        return {
          bikes: bikesResponse.bikes || [],
          count: countResponse.stolen || 0,
        };
      }
    }
  );
};
