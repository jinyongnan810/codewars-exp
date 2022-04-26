// https://www.codewars.com/kata/58298e19c983caf4ba000c8d/train/javascript
type WeatherType =
  | "clear"
  | "sunny"
  | "cloudy"
  | "rainy"
  | "overcast"
  | "windy"
  | "thunderstorms";
const rainyWeather: WeatherType[] = ["rainy", "thunderstorms"];
function minUmbrellas(weathers: WeatherType[]): number {
  let umbrellasBorrowed = 0;
  let umbrellasAtHome = 0;
  let umbrellasAtWork = 0;
  for (let i = 0; i < weathers.length; i += 2) {
    const weatherWhenGoingToWork = weathers[i];
    const weatherWhenGoingBackHome = weathers[i + 1];
    if (rainyWeather.includes(weatherWhenGoingToWork)) {
      umbrellasAtHome--;
      umbrellasAtWork++;
      if (umbrellasAtHome < 0) {
        umbrellasAtHome = 0;
        umbrellasBorrowed++;
      }
    }
    if (rainyWeather.includes(weatherWhenGoingBackHome)) {
      umbrellasAtHome++;
      umbrellasAtWork--;
      if (umbrellasAtWork < 0) {
        umbrellasAtWork = 0;
        umbrellasBorrowed++;
      }
    }
  }
  return umbrellasBorrowed;
}
