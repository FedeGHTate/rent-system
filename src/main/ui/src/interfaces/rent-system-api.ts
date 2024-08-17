/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-08-16 22:38:30.

export interface IBillCreateRequest {
    rentId: string;
    days: number;
}

export interface IBillUpdateRequest {
    amount: number;
    dueDate: Date;
}

export interface IApiResponse<T> {
    message: string;
    value: T;
}

export interface IAssignTenantRequest {
    tenantId: string;
    occupancy: number;
}

export interface IRentCreateRequest {
    name: string;
    maximumOccupancy: number;
    description: string;
    price: number;
    tenantId: string;
}

export interface IRent {
    id: string;
    name: string;
    description: string;
    maximumOccupancy: number;
    currentOccupancy: number;
    price: number;
    actualTenant: ITenant;
    leaseTerm: number;
    status: IRentStatus;
}

export interface IRentUpdateRequest {
    name: string;
    maximumOccupancy: number;
    price: number;
    description: string;
}

export interface ITenantRequest {
    firstname: string;
    lastname: string;
    dni: string;
    contactNumber: string;
}

export interface ITenant {
    id: string;
    firstname: string;
    lastname: string;
    dni: string;
    contactNumber: string;
}

export type IRentStatus = "AVAILABLE" | "UNAVAILABLE" | "OCCUPIED";
