/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-08-22 11:46:25.

export interface IBillCreateRequest {
    rentId: string;
    days: number;
}

export interface IBillUpdateRequest {
    amount: number;
    dueDate: Date;
}

export interface IBill {
    id: string;
    amount: number;
    issueDate: Date;
    dueDate: Date;
    tenant: ITenant;
    billRentInfo: IBillRentInfo;
    paidDate: Date;
    status: IBillStatus;
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

export interface IService {
    id: string;
    name: string;
    price: number;
}

export interface IServiceRequest {
    name: string;
    price: number;
}

export interface ITenant {
    id: string;
    firstname: string;
    lastname: string;
    dni: string;
    contactNumber: string;
}

export interface IBillRentInfo {
    id: string;
    rentName: string;
}

export type IBillStatus = "PAID" | "UNPAID" | "CANCELLED" | "REFUNDED";

export type IRentStatus = "AVAILABLE" | "UNAVAILABLE" | "OCCUPIED";
