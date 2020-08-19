var x_max = 1521105
var x_min = 5
var min = 1
var max = 10

var pipeline = [
    {
        $addFields: {
            "scaled_votes": {
                $add: [
                    1,
                    {
                        $multiply: [
                            9,
                            {
                                $divide: [
                                    { $subtract: ["$imdb.votes", x_min] },
                                    { $subtract: [x_max, x_min] }
                                ]
                            }
                        ]
                    }
                ]
            },
            "normalized_rating": {
                $avg: [
                    "$scaled_votes",
                    "$imdb.rating"
                ]
            },
            "released_year": { $year: "$released" }
        }
    },
    {
        $match: {
            languages: "English",
            "imdb.votes": { $gte: 1 },
            normalized_rating: { $gte: 1 },
            released_year: { $gte: 1990 }
        }
    }, 
    {
        $sort: { normalized_rating: 1 }
    }
]
