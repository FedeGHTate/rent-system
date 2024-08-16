export const rentSystemPaths = {
  bills: {
    base: "/bills",
  },
  rents: {
    base: "/rents",
    details: (id: string) => `/rents/${id}`,
    edit: (id: string) => `/rents/${id}`,
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