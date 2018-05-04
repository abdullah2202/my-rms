/**
 * Booking Interface
 * 
 * Defines the Booking Entity
 * 
 */

export interface IBooking {
    BookingID: string;

    UserID: string;
    Username: string;

    StoreID: string;
    StoreName: string;

    CustomerID: string;
    CustomerName: string;

    StatusID: string;
    StatusName: string;
    StatusCss: string;
/*
    DateBooked: number;
    ExpectedDate: number;
    CollectionDate: number;

    Collected: number;
    Deleted: number;
    Submit: number;

    Timestamp: number;
*/
}
