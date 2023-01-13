import fetch, { Response } from 'node-fetch'
import { locationFinder } from '../../services/locationFinder';

jest.mock('node-fetch');
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('Find lat & lng values from a location',()=>{
    test('find by pincode & country',()=>{
        const json = jest.fn() as jest.MockedFunction<any>;
        const result = [{"longitude": "80.3083", "latitude": "16.3375"}]
        json.mockResolvedValue(result);
        mockedFetch.mockResolvedValue({ ok: true, json } as Response);
        return locationFinder({
          "country": "in",
          "pincode": "522002",
          "state": "",
          "city": ""
        }).then((data:any)=>{
          // console.log(data)
          expect(data[0].longitude).toEqual("80.3083")
          expect(data[0].latitude).toEqual("16.3375")
        })
    })
    test('find by state & city',()=>{
      const json = jest.fn() as jest.MockedFunction<any>;
      const result = [{"longitude": "80.3083", "latitude": "16.3375"}]
      json.mockResolvedValue(result);
      mockedFetch.mockResolvedValue({ ok: true, json } as Response);
      return locationFinder({
        "country": "",
        "pincode": "",
        "state": "ap",
        "city": "guntur"
      }).then((data:any)=>{
        // console.log(data)
        expect(data[0].longitude).toEqual("80.3083")
        expect(data[0].latitude).toEqual("16.3375")
      })
  })
})