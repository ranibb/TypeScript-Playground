/* Let us assume we want model a rating type that has five categories: Poor, Fair, Average, Good and Excellent. 
The ratings could correspond to the stars, from 1 star to 5 stars. Hovering over the rating members, we observe 
that TypeScript automatically assign the values 0,1,2,3,4 to our entries. So, by default, an enum is
interpreted as a numeric enum staring with 0 for the first entry, 1 for the next and so on. If you want to 
change the numbers, let us say to 1,2,3,4 and 5, we can assign these values ourselves, note in such a case 
where we only want to change the start value and count up from there, setting just the start value is enough. */
enum Rating {
    poor = 1,
    fair,
    average,
    good,
    excellent
}

/* We could also define an interface Rated that is implemented by all objects that have a rating of the type 
Rating, which just defined by enumeration */
interface Rated {
    rating: Rating
}

/* With help of the enum and the interface, we could next define a function averageRating that takes in an 
array of rated objects as input and returns the average rating expressed by number from 1 and 5.*/
function averageRating(items : Rated[]) : number {
    let total = 0; // We sum up all the ratings in a variable total.
    for (let item of items) { // An array iteration
        total += item.rating;
    }
    return total/items.length; // Divide total by the number of items to compute an average rating.
}

let items = [
    {
        rating: Rating.average
    },
    {
        rating: Rating.good
    },
    {
        rating: Rating.good
    }
]

console.log(averageRating(items));