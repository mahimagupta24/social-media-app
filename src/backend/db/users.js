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
    profilePic:"https://i.pinimg.com/550x/41/01/1a/41011a92dfc518841f1ea4439eff4f21.jpg",
    bio: "Social Media Influencer",
    bookmarks:[],
    // createdAt: "2022-03-16T10:45:00+05:30",
    updatedAt: formatDate(),
    createdAt:formatDate(),
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
    profilePic:"https://wallpapercave.com/wp/wp2058252.jpg",
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
    profilePic:"https://w0.peakpx.com/wallpaper/417/640/HD-wallpaper-cute-adorable-girl-baby-is-looking-up-wearing-purple-dress-cute.jpg",
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
    profilePic:"https://4.bp.blogspot.com/-LQKY1YlzhOc/Th56wgEJiBI/AAAAAAAAETw/2ZcwvyZvR1U/s1600/most-beautiful-little-girl-in-the-world.JPG",
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
    profilePic:"https://wallpapercave.com/wp/wp2525371.jpg",
    bio: "What's up?",
    bookmarks:[],
    createdAt:formatDate(),
    // createdAt: "2022-02-04T08:35:30+05:30",
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
