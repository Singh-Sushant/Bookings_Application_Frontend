export interface IEvent{

        id: any,
        category: string,
        name: string,
        dateTime: any,
        venue: string,
        ticketPrice: number,
        artist: string,
        description: string
      
}


export interface IBookingData{
    username: any,
    email: any,
    phoneNumber: any,
    numberOfTickets: any,
    totalPrice: number,
    eventId: any
}

export interface IBookingResponse{
    id : any,
    username: string,
    email: string,
    phoneNumber: string,
    numberOfTickets: number,
    totalPrice: 0,
    event : IEvent
}