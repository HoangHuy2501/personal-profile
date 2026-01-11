import {MailFilled, GithubFilled,MessageFilled} from "@ant-design/icons";
export const contactInfo = (t) => [{
    id:1,
    title:t.personInfo.Email,
    value:t.data.personInfo.Email,
    icon: MailFilled,
    webUrl:"#",
},{
    id:2,
    title:t.personInfo.git,
    value:t.data.personInfo.Git,
    icon: GithubFilled,
    webUrl:"https://github.com/HoangHuy2501",
},{
    id:3,
    title:"Zalo",
    value:"0396603412",
    icon: MessageFilled,
    webUrl:"https://zalo.me/0396603412",
    appUrl: "zalo://profile/0396603412",
}];