export const rentSystemPaths = {
  bills: {
    base: "/bills",
    create: "/bills/add",
    details: (id: string) => `/bills/${id}`,
    refund: (id: string) => `/bills/${id}/refund`,
    cancel: (id: string) => `/bills/${id}/cancel`,
    pay: (id: string) => `/bills/${id}/pay`
  },
  rents: {
    base: "/rents",
    details: (id: string) => `/rents/${id}`,
    edit: (id: string) => `/rents/${id}`,
    assignTenant: (id: string) => `/rents/${id}/assign`
  },
  services: {
    base: "/services",
    details: (id: string) => `/services/${id}`,
    edit: (id: string) => `/services/${id}`,
  },
  tenants: {
    base: "/tenants",
    details: (id: string) => `/tenants/${id}`,
    edit: (id: string) => `/tenants/${id}`,
  }
}