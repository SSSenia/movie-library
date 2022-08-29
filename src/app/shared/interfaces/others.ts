export interface IPlanet {
    climate: string,
    created: string,
    diameter: number,
    edited: string,
    gravity: string,
    name: string,
    orbital_period: number,
    population: number,
    rotation_period: number,
    surface_water: number,
    terrain: string,
    url: string
}

export interface IStarship {
    MGLT: string,
    cargo_capacity: number,
    consumables: string,
    cost_in_credits: number,
    created: string,
    crew: number,
    edited: string,
    hyperdrive_rating: number,
    length: number,
    manufacturer: string,
    max_atmosphering_speed: string,
    model: string,
    name: string,
    passengers: number,
    starship_class: number,
    url: string
}