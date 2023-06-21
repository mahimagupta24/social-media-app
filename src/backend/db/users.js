import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    fullname: "Adarsh Balika",
    username: "adarshbalika",
    password: "adarshbalika123",
    bio: "Social Media Influencer",
    bookmarks:[],
    createdAt: "2022-03-16T10:45:00+05:30",
    updatedAt: formatDate(),
    followers: [
      // { _id: uuid(), fullname: "Shubham Soni", username: "shubhamsoni" },
      // { _id: uuid(), fullname: "Mahima Gupta", username: "mahimagupta" },
      // { _id: uuid(), fullname: "Raima Gupta", username: "raimagupta" },
    ],
    following: [
    ],
  },
  {
    _id: uuid(),
    fullname: "Shubham Soni",
    username: "shubhamsoni",
    password: "shubhamsoni123",
    bio: "Be yourself",
    bookmarks:[],
    createdAt: "2022-05-06T12:45:00+05:30",
    updatedAt: formatDate(),
    followers: [
      // { _id: uuid(), fullname: "Raima Gupta", username: "raimagupta" },
    ],
    following: [
      // { _id: uuid(), fullname: "John Doe", username: "johndoe" },
      // {
      //   _id: uuid(),
      //   fullname: "Adarsh Balika",
      //   username: "adarshbalika",
      // },
    ],
  },
  {
    _id: uuid(),
    fullname: "Mahima Gupta",
    username: "mahimagupta",
    password: "mahimagupta123",
    bio: "Aspiring Web developer",
    bookmarks:[],
    createdAt: "2022-01-18T22:00:10+05:30",
    updatedAt: formatDate(),
    followers: [
    //   { _id: uuid(), fullname: "Shubham Soni", username: "shubhamsoni" },
     ],
    following: [
      // { _id: uuid(), fullname: "Adarsh Balika", username: "adarshbalika" },
    ],
  },
  {
    _id: uuid(),
    fullname: "Raima Gupta",
    username: "raimagupta",
    password: "raimagupta123",
    bio: "Frontend Engineer",
    bookmarks:[],
    createdAt: "2022-07-26T11:20:10+05:30",
    updatedAt: formatDate(),
    followers: [
      // {
      //   _id: uuid(),
      //   fullname: "John Doe",
      //   username: "johndoe",
      // },
    ],
    following: [
      // { _id: uuid(), fullname: "Shubham Soni", username: "shubhamsoni" },
      // { _id: uuid(), fullname: "Adarsh Balika", username: "adarshbalika" },
      // {
      //   _id: uuid(),
      //   fullname: "John Doe",
      //   username: "johndoe",
      // },
    ],
  },
  {
    _id: uuid(),
    fullname: "John Doe",
    username: "johndoe",
    password: "johndoe123",
    bio: "What's up?",
    bookmarks:[],
    createdAt: "2022-02-04T08:35:30+05:30",
    updatedAt: formatDate(),
     followers: [
    //   {
    //     _id: uuid(),
    //     fullname: "Shubham Soni",
    //     username: "shubhamsoni",
    //   },
    //   {
    //     _id: uuid(),
    //     fullname: "Raima Gupta",
    //     username: "raimagupta",}
    ],
    following: [
      // {
      //   _id: uuid(),
      //   fullname: "Raima Gupta",
      //   username: "raimagupta",
      // },
    ],
  },
];
