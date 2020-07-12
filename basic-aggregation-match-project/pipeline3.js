var pipeline = [
    {
        $project: {
            _id: 0,
            title: 1,
            words: { $size: { $split: [ "$title", " "] } }
        }
    },
    {
        $match: {
            words: 1
        }
    }
]
