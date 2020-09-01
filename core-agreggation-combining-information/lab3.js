db.air_routes.aggregate(pipeline).pretty()

var pipeline = [
    {
        $match: {
            airplane: /747|380/
        }
    },
    {
        $lookup: {
            from: "air_alliances",
            localField: "airline.name",
            foreignField: "airlines",
            as: "alliance"
        } 
    },
    {
        $unwind: "$alliance"
    },
    {
        $group: {
            _id: "$alliance.name",
            count: {
                $sum: 1
            }
        }
    },
    {
        $sort: {
            count: -1
        }
    }
]
