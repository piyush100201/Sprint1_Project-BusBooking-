

export class Ticket {
    constructor(
    public _id: string,
    public  userId : string,
    public busId: string,
 
    public ForEverySelectedSeat: Array<number>
  ) { }

}