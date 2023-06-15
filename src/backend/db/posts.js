import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
  {
    _id: uuid(),
    content: "Exploring new places",
    mediaUrl:"https://1.bp.blogspot.com/-MiUcyHifn1U/XrvfpVzmI7I/AAAAAAAAAjc/eYazSDwPLasqFXYX7bx_yJUipkZ8Ci5IQCLcBGAsYHQ/s1600/tea-gardens-munnar.jpg",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        userhandler: "johndoe",
        text: "I love traveling and discovering new destinations",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    createdAt: "march 12, 2023",
    updatedAt: formatDate(),
  },

  {
    _id: uuid(),
    content: "Enjoying a beautiful sunset!",
    mediaUrl:"https://tse4.mm.bing.net/th?id=OIP.IwYFjR9kEWVWqXq4g1jpOAHaEK&pid=Api&P=0&h=180",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    firstName: "Shubham",
    lastName: "Soni",
    username: "shubhamsoni",
    createdAt: "2023-02-25T10:30:33+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: uuid(),
    content: "Delicious food at my favorite restaurant!",
    mediaUrl:"https://wallpapercave.com/wp/wp3724331.jpg",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
   

    comments: [
      {
        _id: uuid(),
        userhandler: "adarshbalika",
        text: "I love that restaurant too! The food is amazing.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    firstName: "Raima",
    lastName: "Gupta",
    username: "raimagupta",
    createdAt: "2023-03-28T21:00:15+05:30",
    updatedAt: formatDate(),
  },
  
  {
    _id: uuid(),
    content: "Excited for the weekend getaway!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        userhandler: "shubhamsoni",
        text: "Enjoy your getaway. Have a great time!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    createdAt: "2023-04-03T09:00:10+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "The best way to predict your future is to create it! Love this quote by Ibrahim Lincon",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        userhandler: "adarshbalika",
        text: "Your posts always inspire me! Thank you for sharing",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    firstName: "Mahima",
    lastName: "Gupta",
    username: "mahimagupta",
    createdAt: "2023-02-24T22:30:10+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Having a great time with friends!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    createdAt: "2023-04-21T23:00:14+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Celebrating a milestone achievement!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        userhandler: "adarshbalika",
        text: "Congratulations! You deserve all the success. Keep going!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    createdAt: "2023-03-17T10:45:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Trying out a new recipe. Finger-licking good!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        userhandler: "raimagupta",
        text: "That sounds delicious! Can you share the recipe?",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    createdAt: "2023-03-05T18:45:00+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Feeling grateful for the little things in life",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    firstName: "Shubham",
    lastName: "Soni",
    username: "shubhamsoni",
    createdAt: "2023-04-08T17:05:04+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Believe in yourself. You are capable of amazing things",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    createdAt: "2023-02-10T07:15:10+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Exciting news! I just got promoted at work and I'm thrilled to take on this new role. Grateful for the opportunities and looking forward to the challenges ahead!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    firstName: "Raima",
    lastName: "Gupta",
    username: "raimagupta",
    createdAt: "2023-03-11T09:30:18+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Wow, the weather is absolutely gorgeous today! Perfect day for some outdoor activities!",
    mediaUrl:"https://jooinn.com/images/cloudy-1.jpg",
      likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    firstName: "Shubham",
    lastName: "Soni",
    username: "shubhamsoni",
    createdAt: "2023-03-15T09:45:13+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:" Just picked up this captivating novel that has been on my reading list for a while.If you have any book recommendations or if you've read this one, I'd love to hear your thoughts",
      
    mediaUrl:"https://www.leafmarks.com/uploads/9/8/4/9/98493490/hamlet-by-william-shakespeare_orig.jpg",
      likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    firstName: "Mahima",
    lastName: "Gupta",
    username: "mahimagupta",
    createdAt: "2023-05-16T19:00:13+05:30",
    updatedAt: formatDate(),
  },
];
