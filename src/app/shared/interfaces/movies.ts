export interface IMovie {
    characters: string[],
    created: string,
    director: string,
    edited: string,
    episode_id: number,
    opening_crawl: string,
    planets: string[],
    producer: string,
    release_date: string,
    species: string[],
    starships: string[],
    title: string,
    url: string,
    vehicles: string[],
    results: Array<any>
}

export interface IArrayDataMovie {
    count: number,
    results: Array<IMovie>
}