db.students.insertMany([
    {
        name: "Rahul",
        department: "CSE",
        marks: 80,
        age: 21,
        city: "Delhi"
    },
    {
        name: "Priya",
        department: "CSE",
        marks: 95,
        age: 22,
        city: "Mumbai"
    },
    {
        name: "Amit",
        department: "ECE",
        marks: 70,
        age: 20,
        city: "Delhi"
    },
    {
        name: "Sneha",
        department: "ECE",
        marks: 88,
        age: 21,
        city: "Pune"
    },
    {
        name: "Karan",
        department: "CSE",
        marks: 65,
        age: 23,
        city: "Delhi"
    }
    ])

    $match -> find 
    db.students.aggregate(
        [
            {
                $match: {
                    city:"Delhi"
                },
            },
            {
                $project: { 
                    name: 1,
                    marks:1
                }
            },
            {
                $sort:{
                    marks: -1
                }
            },
            {
                $limit: 2
            }
        ]
    );

    $lookup -> join two collections using a common field
    db.students.aggregate([
        {
            $lookup: {
                from: "teachers",
                localField: "department",
                foreignField: "department",
                as: "TeacherDpt"
            }
        }
    ]);
