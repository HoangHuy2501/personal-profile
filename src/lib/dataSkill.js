
export const getDataSkill = (t) => [{
    id:1,
    title: t.techSkill.FE,
    skill:[
            {
                id:1,
                name: "HTML",
                color: "#E34F26"
            },
            {
                id:2,
                name: "CSS",
                color: "#1572B6"
            },
            {
                id:3,
                name: "ReactJS",
                color: "#61DAFB"
            },{
                id:4,
                name: "Tailwind",
                color: "#06B6D4"
            },{
                id:5,
                name: "JavaScript",
                color: "#F7DF1E"
            },{
                id:6,
                name: "Ant Design",
                color: "#1890FF"
            },{
                id:7,
                name: "BootStrap",
                color: "#7952B3"
            }
        ]
    },
    {
    id:2,
    title: t.techSkill.BE,
    skill:[
    {
        id:1,
        name: "NodeJS",
        color: "#339933"
    },{
        id:2,
        name: "RESTful API",
        color: "#339933"
    },{
        id:3,
        name: "Cloudinary",
        color: "#5851DB"
    },{
        id:4,
        name: "Postman",
        color: "#FF6C37"
    },{
        id:5,
        name: "Hoppscotch",
        color: "#FF6C37"
    },{
        id:6,
        name: "Sequelize ORM",
        color: "#FF6C37"
    }
        ]
    },
    {
    id:3,
    title: t.techSkill.DB,
    skill:[
    {
        id:1,
        name: "PostgreSQL",
        color: "#336791"
    },{
        id:2,
        name: "MongoDB",
        color: "#47A248"
    },{
        id:3,
        name: "SQL Server",
        color: "#336791"
    },{
        id:4,
        name: "Superbase",
        color: "#3ECF8E"
    },{
        id:5,
        name: "Neon",
        color: "#FF3E00"
    }
        ]
    },{
    id:4,
    title: t.techSkill.skillPerson,
    des: t.techSkill.desLear,
    skill:[{
        id:1,
        title: t.techSkill.English.title,
        des: t.techSkill.English.des
    },{
        id:2,
        title: t.techSkill.teamWork.title,
        des: t.techSkill.teamWork.des
    }
    ]
    }];