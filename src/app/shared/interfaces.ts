export interface IMovie {
    characters: Array<string>,
    created: string,
    director: string,
    edited: string,
    episode_id: number,
    opening_crawl: string,
    planets: Array<string>,
    producer: string,
    release_date: string,
    species: Array<string>,
    starships: Array<string>,
    title: string,
    url: string,
    vehicles: Array<string>,
    results: Array<any>
}

export interface ICharacter {
    birth_year: string,
    eye_color: string,
    films: Array<string>,
    gender: string,
    hair_color: string,
    height: number,
    homeworld: string,
    mass: number,
    name: string,
    skin_color: string,
    created: string,
    edited: string,
    species: Array<string>,
    starships: Array<string>,
    url: string,
    vehicles: Array<string>,
    id: number
}
export interface IArrayDataMovie {
    count: number,
    results: Array<IMovie>
}
export interface IArrayDataCharacter {
    count: number,
    results: Array<ICharacter>
}

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