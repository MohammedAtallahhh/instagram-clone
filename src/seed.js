import { addDoc, collection } from "firebase/firestore";
import { db } from "./lib/firebase";

export async function seedDatabase() {
  const users = [
    {
      username: "Mohammed",
      fullName: "Mohammed Atallah",
      emailAddress: "mohamedatallahh2017@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      username: "Eid",
      fullName: "Mohammed Hassan Eid",
      emailAddress: "eid@gmail.com",
      following: [],
      followers: ["Wqf8HJNWqWexL66iAbJMPiPesWa2"],
      dateCreated: Date.now(),
    },
    {
      id: "3",
      username: "Asar",
      fullName: "Mohammed Asar",
      emailAddress: "asar@yahoo.com",
      following: [],
      followers: ["Wqf8HJNWqWexL66iAbJMPiPesWa2"],
      dateCreated: Date.now(),
    },
    {
      id: "4",
      username: "Wen",
      fullName: "Kareem Wen",
      emailAddress: "wen@yahoo.com",
      following: [],
      followers: ["Wqf8HJNWqWexL66iAbJMPiPesWa2"],
      dateCreated: Date.now(),
    },
  ];

  const usersRef = collection(db, "users");
  for (let k = 0; k < users.length; k++) {
    await addDoc(usersRef, users[k]);
  }

  const photosRef = collection(db, "posts");
  for (let i = 1; i <= 3; ++i) {
    await addDoc(photosRef, {
      id: i,
      user_id: "emELP6s1XwCzIn13EcoQ",
      src: `/images/oglu/${i}.jpg`,
      caption: "Saint George and the Dragon",
      likes: [],
      comments: [
        {
          displayName: "Asar",
          comment: "Love this place, looks like my animal farm!",
        },
        {
          displayName: "Eid",
          comment: "Would you mind if I used this picture?",
        },
      ],
      userLatitude: "40.7128°",
      userLongitude: "74.0060°",
      dateCreated: Date.now(),
    });
  }
}
