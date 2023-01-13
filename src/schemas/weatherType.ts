/**
 * @swagger
 * components:
 *   schemas:
 *     weatherInfo:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           username: username 
 *         main: 
 *           type: string
 *           description: weather 
 *         temp:
 *           type: integer
 *           description: current temperature
 *         feels_like:
 *           type: integer
 *           description: current temperature feels like
 *       example:
 *         username: vamsi
 *         main: clouds
 *         temp: 287.61
 *         feels_like: 286.59
 *     weatherReport:
 *       type: object
 *       properties:
 *         coord: 
 *           type: object
 *           $ref: '#/components/schemas/geo' 
 *         weather:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *              main:
 *               type: string
 *               description: Group of weather parameters (Rain, Snow, Extreme etc.)
 *               example: "Rain"
 *              description:
 *               type: string
 *               description:  Weather condition within the group. 
 *               example: "moderate rain"               
 *         main:
 *           type: object
 *           properties:
 *              temp:
 *               type: integer
 *               description: Temperature. Unit Default- Kelvin, Metric- Celsius, Imperial- Fahrenheit.
 *              feels_like:
 *               type: integer
 *               description: Temperature. This temperature parameter accounts for the human perception of weather.
 *              humidity:
 *               type: integer
 *               description:  Humidity, %
 *              temp_min:
 *               type: integer
 *               description: Minimum temperature at the moment. 
 *              temo_max:
 *               type: integer
 *               description: Maximum temperature at the moment.
 *              pressure:
 *               type: integer
 *               description: Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
 *              sea_level:
 *               type: integer
 *               description: Atmospheric pressure on the sea level, hPa
 *              grnd_level:
 *               type: integer
 *               description:  Atmospheric pressure on the ground level, hPa
 *         wind:
 *           type: object
 *           properties:
 *              speed:
 *               type: integer
 *               description: Wind speed. Unit Default meter per second
 *              deg:
 *               type: integer
 *               description: Wind direction, degrees (meteorological)
 *              gust:
 *               type: integer
 *               description: Wind gust. Unit Default- meter per second
 * 
 */
