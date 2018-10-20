/**
 * Customer Interface
 * 
 * Defines the Customer Entity
 * 
 */

export interface ICustomer {
    CustomerID?: string;

    // Store?: IStore; // TODO: Add store Object?
    StoreID?: string;
    StoreName? : string;

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
