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
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        username: "rabiyaakhter",
        text: "I love traveling and discovering new destinations",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: "adarshbalika",
    createdAt: "2023-03-12T15:48:12+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Enjoying a beautiful sunset!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "shubhamsoni",
    createdAt: "2023-02-25T10:30:33+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Delicious food at my favorite restaurant!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "johnsmith",
    createdAt: "2023-03-28T21:00:15+05:30",
    updatedAt: formatDate(),

    comments: [
      {
        _id: uuid(),
        username: "aryagehlot",
        text: "I love that restaurant too! The food is amazing.",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
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
        username: "himaniraina",
        text: "Enjoy your getaway. Have a great time!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: "janesmith",
    createdAt: "2023-04-03T09:00:10+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Sharing some inspiration!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [
      {
        _id: uuid(),
        username: "saniadutta",
        text: "Your posts always inspire me! Thank you for sharing",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
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
    username: "michaelscott",
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
        username: "omkarsharma",
        text: "Congratulations! You deserve all the success. Keep going!",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: "henrybill",
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
        username: "gurpreetsingh",
        text: "That sounds delicious! Can you share the recipe?",
        votes: {
          upvotedBy: [],
          downvotedBy: [],
        },
      },
    ],
    username: "foodieexplorer",
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
    username: "harmanjoshi",
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
    username: "rohanbatra",
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
    username: "raimagupta",
    createdAt: "2023-03-11T09:30:18+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "Wow, the weather is absolutely gorgeous today! Perfect day for some outdoor activities!",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    comments: [],
    username: "sunilsingh",
    createdAt: "2023-03-15T09:45:13+05:30",
    updatedAt: formatDate(),
  },
];
