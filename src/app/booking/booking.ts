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
    CustomerTelephone: string;
    CustomerEmail: string;

    StatusID: string;
    StatusName: string;
    StatusCss: string;

    Collected: string;

    BookedDate: Date;
    DueDate: Date;
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
