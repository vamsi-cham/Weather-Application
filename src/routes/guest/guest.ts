import { Router } from 'express';
import {guestReport} from '../../controllers/guest/guestController';
const router = Router();

/**
 * @swagger
 *  tags:
 *    name: Guest
 *    description: weather report of a guest search
 */

/**
 * @swagger
 * /guest:
 *    get:
 *     summary: Returns weather report by state & city or pincode in any country
 *     tags: [Guest]
 *     parameters:
 *       - in: query
 *         name: search
 *         description: Enter (state&city) or pincode and country is optional.
 *         schema:
 *              $ref: '#/components/schemas/searchQuery'
 *     responses:
 *       200:
 *         decsription: search completed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/weatherReport'
 *       400:
 *         description: query param is missing. Unable to fetch.
 *       404:
 *         description: no weather report found.
 *       500:
 *         description: Some other errors happend.
 *
 */

//search-weather-report
router.get('/', guestReport);

export default router;