import {MailFilled,UserOutlined,GithubFilled,CalendarFilled,EnvironmentFilled,HomeFilled,PhoneFilled, AppstoreOutlined} from "@ant-design/icons";
import { IoMdCode,IoLogoGameControllerB, IoMdFootball,IoMdMusicalNotes,IoMdAirplane } from "react-icons/io";
import { MdLocalMovies } from "react-icons/md";
export const personInfo =(t)=>[
    {
    id:1,
    title:t.personInfo.Dob,
    value:t.data.personInfo.Dob,
    icon: CalendarFilled,
},{
    id:2,
    title:t.personInfo.Gender,
    value:t.data.personInfo.Gender,
    icon: UserOutlined,
},{
    id:3,
    title:t.personInfo.Phone,
    value:t.data.personInfo.Phone,
    icon: PhoneFilled,
},{
    id:4,
    title:t.personInfo.Email,
    value:t.data.personInfo.Email,
    icon: MailFilled,
},{
    id:5,
    title:t.personInfo.git,
    value:t.data.personInfo.Git,
    icon: GithubFilled,
},{
    id:6,
    title:t.personInfo.Address,
    value:t.data.personInfo.Address,
    icon: HomeFilled,
},{
    id:7,
    title:t.personInfo.Hometown,
    value:t.data.personInfo.HomeTown,
    icon: EnvironmentFilled,
}
]

export const dev=(t)=>[
    {
        id:1,
        title:t.personInfo.name,
        value:t.header.namedev
    },{
        id:2,
        title:t.personInfo.role,
        value:t.header.level
    },{
        id:3,
        title:t.personInfo.stack,
        value:"ReactJS | NodeJS | PostgreSQL"
    },{
        id:4,
        title:t.personInfo.status,
        value:t.data.personInfo.Status
    }
]
export const timeline=(t)=>[
    {
        id:1,
        classify:t.personInfo.edu.classify,
        title:t.personInfo.edu.title,
        time:t.personInfo.edu.time,
        job:t.personInfo.edu.job,
        gpa:"GPA: 3.33/4.0"
    },{
        id:2,
        classify:"Experience",
        title:"Marqive / Stackup",
        project:"Full-stack Developer",
        time:"May 2026 - July 2026",
        address:"Team size: 2",
        des:"Built marketplace and administration workflows with Next.js, Node.js and PostgreSQL, including data import and background-processing systems."
    },{
        id:3,
        classify:"Experience",
        title:"IPellio / Stackup",
        project:"Frontend Developer",
        time:"Mar 2026 - May 2026",
        address:"Team size: 7",
        des:"Contributed to a SaaS intellectual-property intelligence platform using Next.js and Tailwind CSS, working with Git-based collaboration."
    },{
        id:4,
        classify:t.personInfo.intern.classify,
        title:t.personInfo.intern.title,
        project: "Erp Ba Hưng",
        time:t.personInfo.intern.time,
        address:t.personInfo.intern.adrress,
        des:t.personInfo.intern.des
    }
]

export const hobbies=(t)=>[
    {
        id:1,
        name: t.personInfo.hobbies.code,
        icon: IoMdCode,
    },
    {
        id:2,
        name: t.personInfo.hobbies.game,
        icon:IoLogoGameControllerB
    },
    {
        id:3,
        name: t.personInfo.hobbies.sport,
        icon:IoMdFootball
    },
    {
        id:4,
        name: t.personInfo.hobbies.music,
        icon:IoMdMusicalNotes
    },
    {
        id:5,
        name: t.personInfo.hobbies.movie,
        icon:MdLocalMovies
    },
    {
        id:6,
        name: t.personInfo.hobbies.travel,
        icon:IoMdAirplane
    },
    {
        id:7,
        name: t.personInfo.hobbies.assembly,
        icon:AppstoreOutlined
    },
]
