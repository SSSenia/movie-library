import { Observable } from "rxjs"

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
    poster$: Observable<string | null>,
    poster: string
}

export interface IPoster {
    imageUrl: string;
    movieTitle: string;
}

export interface IArrayDataMovie {
    count: number,
    results: IMovie[]
}