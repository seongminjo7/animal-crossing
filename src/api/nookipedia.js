import axios from "axios";

const API_KEY = import.meta.env.VITE_NOOKIPEDIA_API_KEY;

export const nookipedia = axios.create({
    baseURL: "https://api.nookipedia.com",
    headers: {
        "X-API-KEY": API_KEY,
        "Accept-Version": "1.0.0",
    },
});

export const getVillagers = async (game = "nh") => {
    try {
        const res = await nookipedia.get("/villagers", {
            params: { game },
        });
        return res.data;
    } catch (err) {
        console.error("Error fetching villagers:", err);
        return [];
    }
};

/* export const getEvents = async ({ date, year, month, day } = {}) => {
    try {
        const res = await noSokipedia.get("/nh/events", {
            params: {
                date,
                year,
                month,
                day,
            },
        });
        return res.data;
    } catch (err) {
        console.error("Error fetching events:", err);
        return [];
    }
}; */

export const getTools = async () => {
    try {
        const res = await nookipedia.get("/nh/tools");
        return res.data;
    } catch (err) {
        console.error("Error fetching tools:", err);
        return [];
    }
};

/* export const getMiscItems = async (excludeDetails = false) => {
    try {
        const res = await nookipedia.get("/nh/misc", {
            params: {
                excludedetails: excludeDetails,
            },
        });
        return res.data;
    } catch (err) {
        console.error("Error fetching misc items:", err);
        return [];
    }
}; */

export const getMaterials = async () => {
  try {
    const res = await nookipedia.get("/nh/items", {
      params: {
        category: "Crafting Materials",
      },
    });

    return res.data
      .filter(item => item.material_type)
      .map(item => ({
        name: item.name,
        image: item.image_url,
        sellPrice: item.sell,
        buyPrice: item.buy?.[0]?.price ?? null,
        howToGet: item.availability ?? [],
        season: item.material_seasonality ?? null,
      }));

  } catch (err) {
    console.error("Error fetching materials:", err);
    return [];
  }
};
    