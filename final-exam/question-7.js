var pipeline = [
    {
        $match: {
            src_airport: "JFK",
            dst_airport: "LHR"
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
    }
]