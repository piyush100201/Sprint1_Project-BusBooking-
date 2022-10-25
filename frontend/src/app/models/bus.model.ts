import { Driver } from './driver.model';
export class Bus {
    constructor(
    public _id: string,
    public busNumber: string,
    public companyName: string,
    public busType: string,
    public startCity: string,
    public destination: string,
    public departTime: string,
    public departDate: Date,
    public pricePerSeat: number,
    public seatsRow: number,
    public seatsCol: number,
    public totalSeats: number,
    public availableSeats: number,
    public ForEverySeat: Array<number>,
    public driver :Driver
  ) { }

}
