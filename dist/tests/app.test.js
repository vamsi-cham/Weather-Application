"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// describe('Guest Endpoints', () => {
//   it('should get a weather report by pincode', async () => {
//     const res = await request(app).get('/guest?pincode=522002');
//     expect(res.statusCode).toEqual(200)
//     expect(res.body).toHaveProperty('data')
//   })
//   it('should get a weather report by state & city in different country', async () => {
//     const res = await request(app).get('/guest?country=us&state=ma&city=belmont');
//     expect(res.statusCode).toEqual(200)
//     expect(res.body).toHaveProperty('data')
//   })
//   it('should need a value to fetch', async () => {
//     let res = await request(app).get('/guest');
//     expect(res.statusCode).toEqual(400)
//     expect(res.body).toMatchObject({message:'Enter pincode to get the weather report.'})
//      res = await request(app)
//                 .post('/add-location')
//                 .send({
//                   userId:1
//                 })
//     expect(res.statusCode).toEqual(400)
//     expect(res.body).toMatchObject({message:'Enter pincode to get the weather report.'})            
//   })
//   it('state or city is expected', async () => {
//     let res = await request(app).get('/guest/?state=ap');
//     expect(res.statusCode).toEqual(400)
//     expect(res.body).toMatchObject({message:'City or State is missing.'})
//     res = await request(app)
//                 .post('/add-location?state=ap')
//                 .send({
//                   userId:1
//                 })
//     expect(res.statusCode).toEqual(400)
//     expect(res.body).toMatchObject({message:'City or State is missing.'})            
//   })
//   it('Incorrect location', async () => {
//     let res = await request(app).get('/guest/?pincode=5220022');
//     expect(res.statusCode).toEqual(404)
//     expect(res.body).toMatchObject({
//       message:'No weather report available at this location. Try other location'
//     })
//     res = await request(app)
//                 .post('/add-location/?pincode=5220022')
//                 .send({
//                   userId:1
//                 })
//     expect(res.statusCode).toEqual(404)
//     expect(res.body).toMatchObject({
//          message:'No weather report available at this location. Try other location'
//     })            
//   })
//   it('unexpected error', async () => {
//     const res = await request(app).get('/guest/abc');
//     expect(res.statusCode).toEqual(500)
//     // expect(res.body).toMatchObject({message:'Enter pincode to get the weather report.'})
//   })
// })
// describe('Add User Location Endpoint', () => {
//   it('location should get added to the user', async () => {
//     const res = await request(app)
//                 .post('/add-location?pincode=522002')
//                 .send({
//                   userId:1
//                 })
//     expect(res.statusCode).toEqual(200)
//     // expect(res.body).toHaveProperty('data')
//   })
//   it('location is already added to the user', async () => {
//     // await request(app)
//     //             .post('/add-location?pincode=522002')
//     //             .send({
//     //               userId:1
//     //             })
//     const res = await request(app)
//                 .post('/add-location?pincode=522002')
//                 .send({
//                   userId:1
//                 })
//     expect(res.statusCode).toEqual(403)
//     expect(res.body).toMatchObject({
//       message: `This Location is already added for the userid: `+1
//      })
//   })
//   it('user not found', async () => {
//     let res = await request(app)
//                 .post('/add-location?pincode=522002')
//                 .send({
//                   userId:11
//                 })
//     expect(res.statusCode).toEqual(404)
//     expect(res.body).toMatchObject({  message: 'User not found'})
//     res = await request(app)
//                 .delete('/location/16.3375/80.3083')
//                 .send({
//                   userId:11
//                 })
//     expect(res.statusCode).toEqual(404)
//     expect(res.body).toMatchObject({  message: 'User not found'})
//     res = await request(app)
//             .put('/primary-location/16.3375/80.3083')
//             .send({
//               userId:11
//             })  
//     expect(res.statusCode).toEqual(404)
//     expect(res.body).toMatchObject({  message: 'User not found'})  
//     res = await request(app).get('/weather-report/11')  
//     expect(res.statusCode).toEqual(404)
//     expect(res.body).toMatchObject({  message: 'User not found'}) 
//     res = await request(app).get('/weather-report/11/?lat=16.3375&lng=80.3083') 
//     expect(res.statusCode).toEqual(404)
//     expect(res.body).toMatchObject({  message: 'User not found'})  
//     res = await request(app).get('/home/11')   
//     expect(res.statusCode).toEqual(404)
//     expect(res.body).toMatchObject({  message: 'User not found'})    
//   })
// })
// describe('Update Primary Location for the User',()=>{
//   it('should update primary location', async ()=>{
//   const res = await request(app)
//            .put('/primary-location/16.3375/80.3083')
//            .send({
//              userId:1
//            })
//   expect(res.statusCode).toEqual(200)        
//   })
// })
// describe('User weather reports', ()=>{
//   it('get all weather reports of user', async ()=>{
//     const res = await request(app).get('/home/1')
//     expect(res.statusCode).toEqual(200)        
//     })
// })
// describe('User detailed weather report', ()=>{
//   it('gets the users primary location report', async ()=>{
//     const res = await request(app).get('/weather-report/1')
//     expect(res.statusCode).toEqual(200)        
//   })
//   it('gets the users specified location report', async ()=>{
//       const res = await request(app).get('/weather-report/1/?lat=-37.3159&lng=81.1496')
//       expect(res.statusCode).toEqual(200)        
//   })  
// })
// describe('Delete User Location Endpoint',()=>{
//   it('user location not found', async () => {
//     let res = await request(app)
//                 .delete('/location/123/123')
//                 .send({
//                   userId:1
//                 })
//     expect(res.statusCode).toEqual(404)
//     expect(res.body).toMatchObject({  message: 'User location not found'})
//     res = await request(app)
//             .put('/primary-location/123/123')
//             .send({
//               userId:1
//             })
//     expect(res.statusCode).toEqual(404)
//     expect(res.body).toMatchObject({  message: 'User location not found'})
//      res = await request(app).get('/weather-report/1/?lat=123&lng=123')
//      expect(res.statusCode).toEqual(404)
//      expect(res.body).toMatchObject({  message: 'User location not found'})        
//   })
//   it('location should be deleted for the user', async () => {
//     const res = await request(app)
//                 .delete('/location/16.3375/80.3083')
//                 .send({
//                   userId:1
//                 })
//     expect(res.statusCode).toEqual(200)
//   })
//   it('location cannot be deleted, atleast one required', async () => {
//     const res = await request(app)
//                 .delete('/location/-37.3159/81.1496')
//                 .send({
//                   userId:1
//                 })
//     expect(res.statusCode).toEqual(409)
//     expect(res.body).toMatchObject({ message: `Location can't be deleted for the userid: `+1+`, Atleast one required`})
//   })
// })
