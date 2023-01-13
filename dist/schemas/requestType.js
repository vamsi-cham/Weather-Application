"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     searchQuery:
 *       type: object
 *       properties:
 *         country:
 *           type: string
 *           description: select country, else default will be India(IN)
 *         pincode:
 *           type: string
 *           description: enter pincode to get the weather report
 *         state:
 *           type: string
 *           description: enter state to get weather report from state & city
 *         city:
 *           type: string
 *           description: enter city to get weather report from state & city
 *       example:
 *         country: in
 *         pincode: "522002"
 *         state: ap
 *         city: guntur
 *     geo:
 *       type: object
 *       properties:
 *         lat:
 *           type: string
 *           description: latitude of the location
 *         lng:
 *           type: string
 *           description: longitude of the location
 *       example:
 *         lat: "16.3375"
 *         lng: "80.3083"
 *     user:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *           description: user id of the logged user
 *       example:
 *         userId: 1
 *
 */
