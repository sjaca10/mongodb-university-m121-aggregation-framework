var pipeline = [
    {
        $match: {
            cast: { $elemMatch: { $exists: true } },
            directors: { $elemMatch: { $exists: true } },
            writers: { $elemMatch: { $exists: true } }
        }
    },
    {
        $project: {
            _id: 0,
            title: 1,
            cast: 1,
            directors: 1,
            writers: {
                $map: {
                    input: "$writers",
                    as: "writer",
                    in: {
                        $arrayElemAt: [
                            {
                                $split: [ "$$writer", " (" ]
                            },
                            0
                       ]
                    }
                }
            },
        }
    },
    {
        $project: {
            title: 1,
            "labors of love": { $setIntersection: ["$cast", "$directors", "$writers"] },
            count: { $size: { $setIntersection: ["$cast", "$directors", "$writers"] } }
        }
    },
    {
        $match: {
            count: { $gt: 0 }
        }
    }
]
