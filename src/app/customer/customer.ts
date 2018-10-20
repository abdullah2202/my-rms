/**
 * Customer Interface
 * 
 * Defines the Customer Entity
 * 
 */

export interface ICustomer {
    CustomerID?: string;
    StoreID?: string;

    Name: string;

    Address1?: string;
    Address2?: string;
    City?: string;
    Postcode?: string;
    Country?: string;

    Telephone?: string;
    Email?: string;

    Timestamp?: string;

    Deleted?: string;
    Notes?: string;
    
}
