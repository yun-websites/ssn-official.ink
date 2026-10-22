export interface Person {
    name: string;
    grade?: string;
    period?: string;
    roles: string[];
    /** Optional avatar image path (e.g. "/people/sally.webp"). Alumni list intentionally has none. */
    image?: string;
}
