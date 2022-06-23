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
function bestRoute(cities: string[], costs: number[][]): string[] {
  const citiesMap: Record<string, City> = {};
  cities.forEach((cityName, index) => {
    const city = new City(cityName, cities, costs[index]);
    citiesMap[cityName] = city;
  });
  console.log(JSON.stringify(citiesMap));
  const routes: Route[] = [];
  cities.forEach((city) => {
    const routesStartFromThisCity = getAllRoutes(
      city,
      cities.filter((c) => c != city),
      citiesMap
    );
    routesStartFromThisCity.forEach((r) => routes.push(r));
  });
  const bestRoute = routes.reduce(
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
    const route1 = rest;
    const cost1 =
      citiesMap[startFrom].to[rest[0]] + citiesMap[rest[0]].to[rest[1]];
    const route2 = [rest[1], rest[0]];
    const cost2 =
      citiesMap[startFrom].to[rest[1]] + citiesMap[rest[1]].to[rest[0]];
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
