export interface Account {
    name?: string;
    handle: string;
    notes: string;
}
export interface Section {
    name?: string;
    permalink: string;
    accounts: [Account];
    subsections: [Section];
}
export interface City {
    city: string;
    state: string;
    sections: [Section];
}
