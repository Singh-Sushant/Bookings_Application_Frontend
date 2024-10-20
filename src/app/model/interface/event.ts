export interface ITicketType {
    id: string;                      // Unique identifier for the ticket type
    eventId: string;                 // Identifier for the associated event
    type: string;                    // Type of ticket (e.g., Premium, VIP, General)
    price: number;                   // Price of the ticket
    noOfTickets: number;             // Total number of tickets available for this type
    availableNoOfTickets: number;    // Number of tickets available for sale
  }
  
  export interface IEvent {
    id: string;                      // Unique identifier for the event
    category: string[];              // Categories the event belongs to (e.g., Sports, Music)
    name: string;                    // Name of the event
    dateTime: string;                // Date and time of the event (ISO format)
    venue: string;                   // Venue of the event
    ticketPrice: number;             // General ticket price (if applicable)
    artist: string;                  // Performing artist(s) or team(s)
    description: string;             // Description of the event
    totalTickets: number;            // Total number of tickets available for the event
    availableTickets: number;        // Total number of available tickets for the event
    eventImage: string[];            // Array of image URLs related to the event
    ticketTypes: ITicketType[];      // Array of ticket types available for the event
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