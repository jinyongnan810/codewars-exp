// https://www.codewars.com/kata/6297d639de3969003e13e149/train/javascript
class City {
  name: string;
  to: Record<string, number>;
  constructor(name: string, cities: string[], costs: number[]) {
    this.name = name;
    this.to = {};
    cities.forEach((city, index) => {
      if (city == name) return;
      const cost = costs[index];
      this.to[city] = cost;
    });
  }
}
type Route = {
  route: string[];
  cost: number;
};
const startAndEndCity = "Notgnihsaw";
function bestRoute(cities: string[], costs: number[][]): string[] {
  const citiesMap: Record<string, City> = {};
  cities.forEach((cityName, index) => {
    const city = new City(cityName, cities, costs[index]);
    citiesMap[cityName] = city;
  });
  console.log(JSON.stringify(citiesMap));
  const routesStartFromNotgnihsaw = getAllRoutes(
    startAndEndCity,
    cities.filter((c) => c != startAndEndCity),
    citiesMap
  );
  const bestRoute = routesStartFromNotgnihsaw.reduce(
    (prev, cur) => {
      if (cur.cost < prev.cost) {
        return cur;
      }
      return prev;
    },
    { route: [], cost: Infinity }
  );
  console.log(`best route:${bestRoute.route}, cost:${bestRoute.cost}`);
  return bestRoute.route;
}
const getAllRoutes = (
  startFrom: string,
  rest: string[],
  citiesMap: Record<string, City>
): Route[] => {
  if (rest.length == 2) {
    const route1 = [...rest, startAndEndCity];
    const cost1 =
      citiesMap[startFrom].to[rest[0]] +
      citiesMap[rest[0]].to[rest[1]] +
      citiesMap[rest[1]].to[startAndEndCity];
    const route2 = [rest[1], rest[0], startAndEndCity];
    const cost2 =
      citiesMap[startFrom].to[rest[1]] +
      citiesMap[rest[1]].to[rest[0]] +
      citiesMap[rest[0]].to[startAndEndCity];
    return [
      { route: route1, cost: cost1 },
      { route: route2, cost: cost2 },
    ];
  }
  const res: Route[] = [];
  rest.forEach((city) => {
    const costToThisCity = citiesMap[startFrom].to[city];
    const restOfThisCity = rest.filter((c) => c != city);
    const routes = getAllRoutes(city, restOfThisCity, citiesMap);
    routes.forEach((r) => {
      const route = [city, ...r.route];
      const cost = r.cost + costToThisCity;
      res.push({ route, cost });
    });
  });
  return res;
};
bestRoute(
  ["Notgnihsaw", "Berlin", "Helsinki"],
  [
    [0, 800, 1500],
    [900, 0, 350],
    [1200, 650, 0],
  ]
);

bestRoute(
  ["Aleppo", "Shenyang", "Notgnihsaw", "Vienna", "Buenos Aires"],
  [
    [0, 1800, 1250, 1500, 2450],
    [1400, 0, 1900, 1150, 2000],
    [1300, 1200, 0, 900, 1450],
    [3000, 1950, 800, 0, 1700],
    [2800, 2400, 1650, 2250, 0],
  ]
);
