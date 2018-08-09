/* Let us assume we want to model a rating type that has five categories: Poor, Fair, Average, Good and 
Excellent. The ratings could correspond to the stars, from 1 star to 5 stars. Hovering over the rating members, 
we observe that TypeScript automatically assign the values 0,1,2,3,4 to our entries. */
enum Rating {
    poor = 1,
    fair,
    average,
    good,
    excellent
}

/* To lookup the raw value corresponding to the Rating member average, we write enum name followed by square 
brackets followed by the member name as a string, in our case "average" */
console.log(Rating["average"]);
/* The revers lookup we do the same, just instead of the member name we type the raw value */
console.log(Rating[3]); 

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

/* Example on how enumerations are evaluated with a switch control flow. For that let us write a function 
countsByRating that takes a Rated items array like our first function but returns an array of numbers where 
the elements with index 1 to 5 represent the numbers of the corresponding rating category from poor to 
excellent. */
function countsByRating(items : Rated[]) : number[] {

    // Initialize an array with zeroes
    let counts: number[] = [0, 0, 0, 0, 0, 0];
    // Use the array iteration like before
    for (let item of items) {
        /* With a switch statement to decide which rating category to increment. For example, in case of poor 
        rating we increase the corresponding count by 1 */
        switch(item.rating) {
            case Rating.poor:
                counts[Rating.poor]++;
                break;
            case Rating.fair:
                counts[Rating.fair]++;
                break;
            case Rating.average:
                counts[Rating.average]++;
                break;
            case Rating.good:
                counts[Rating.good]++;
                break;
            case Rating.excellent:
                counts[Rating.excellent]++;
                break;
        }
    }
    return counts;
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
console.log(countsByRating(items));

/* Let us say that we need to deal with food data and we are required to add dietary information like gluten 
free or vegetarian. For that we could define enumeration dietary info that has a member’s gluten free, diary free 
and vegetarian. In each case, we assign a string expression that could be used for example in some web 
template */
enum DietaryInfo {
    glutenFree = "gluten-free",
    diaryFree ="diary-free",
    vegetarian = "vegetarian",
    vegan = "vegan"
}

/* To lookup the raw value corresponding to the DietaryInfo member glutenFree, we write enum name followed by 
square brackets followed by the member name as a string, in our case "glutenFree" */
console.log(DietaryInfo["glutenFree"]);
/* The revers lookup for a string enum is not available. And if you check what is returned if you try: */
console.log(DietaryInfo["gluten-free"]); // returns Undefined