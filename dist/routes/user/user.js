"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const locationController_1 = require("../../controllers/user/locationController");
const userController_1 = require("../../controllers/user/userController");
const router = (0, express_1.Router)();
/**
 * @swagger
 *  tags:
 *    name: User
 *    description: weather report of a logged user
 */
/**
 * @swagger
 * /home/{userId}:
 *    get:
 *     summary: Returns weather info of users for all their locations
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: user id of loggedin user
 *         example: 1
 *     responses:
 *       200:
 *         decsription: search completed
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/weatherInfo'
 *       404:
 *         description: user not found.
 *       500:
 *         description: Some other errors happend.
 *
 */
//all-user-weather-reports
router.get('/home/:userId', userController_1.allweather_reports);
/**
 * @swagger
 * /weather-report/{userId}:
 *    get:
 *     summary: Returns detailed weather report of a user location
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: user id of loggedin user
 *         example: 1
 *       - in: query
 *         name: co-ordinates
 *         description: Enter co-ordinates of the user location to get detailed weather report (optional). Else gets primary location weather report.
 *         schema:
 *              type: object
 *              $ref: '#/components/schemas/geo'
 *     responses:
 *       200:
 *         decsription: search completed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/weatherReport'
 *       404:
 *         description: user or user-location not found.
 *       500:
 *         description: Some other errors happend.
 *
 */
//detailed-weather-report
router.get('/weather-report/:userId', userController_1.detailed_report);
/**
 * @swagger
 * /add-location:
 *    post:
 *     summary: Add a location to the user collection
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     parameters:
 *       - in: query
 *         name: search
 *         description: Enter (state&city) or pincode and country is optional.
 *         schema:
 *              $ref: '#/components/schemas/searchQuery'
 *     responses:
 *       200:
 *         decsription: Location added to the user.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/geo'
 *       403:
 *         description: Location already exists for this user
 *       404:
 *         description: Not found error.(location,user,weather report)
 *       500:
 *         description: Some other errors happend.
 *
 */
//add-user-location
router.post('/add-location', locationController_1.add_location);
/**
 * @swagger
 * /location/{lat}/{lng}:
 *    delete:
 *     summary: Delete a location from the user collection
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     parameters:
 *       - in: path
 *         name: lat
 *         schema:
 *           type: string
 *         description: latitude of the user location
 *         example: "16.3375"
 *       - in: path
 *         name: lng
 *         schema:
 *           type: string
 *         description: longitude of the user location
 *         example: "80.3083"
 *     responses:
 *       200:
 *         decsription: Location deleted to the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/geo'
 *       404:
 *         description: Not found error.(location,user)
 *       409:
 *         description: Location can't be deleted
 *       500:
 *         description: Some other errors happend.
 *
 */
//delete-user-location
router.delete('/location/:lat/:lng', locationController_1.del_location);
/**
 * @swagger
 * /primary-location/{lat}/{lng}:
 *    put:
 *     summary: Updates the primary location of the user.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     parameters:
 *       - in: path
 *         name: lat
 *         schema:
 *           type: string
 *         description: latitude of the user location
 *         example: "16.3375"
 *       - in: path
 *         name: lng
 *         schema:
 *           type: string
 *         description: longitude of the user location
 *         example: "80.3083"
 *     responses:
 *       200:
 *         decsription: Primary location updated to the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/geo'
 *       404:
 *         description: Not found error.(location,user)
 *       500:
 *         description: Some other errors happend.
 *
 */
//update-user-primary-location
router.put('/primary-location/:lat/:lng', locationController_1.primary_location);
exports.default = router;
