export interface Testimonial {
    id: number,
    message: string,
    rating: number,
    user: {
        id: number,
        name: string
    }
}

export default function getInitials(name : string) : string {
    return name
        .split(' ')
        .filter(word => word)
        .map(word => word[0])
        .join('')
        .toUpperCase()
}