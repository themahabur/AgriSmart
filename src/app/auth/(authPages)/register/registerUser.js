"use server";

import axios from "axios";

export const registerUser = async (payload) => {
  //   console.log(payload);

  const user = await axios.post({ email: payload.email });
  const { email, password } = payload;
  if (!email || !password) return { success: false };
  if (!user) {
    const result = await userCollection.insertOne(payload);
    const { acknowledged, insertedId } = result;
    return { acknowledged, insertedId: insertedId.toString() };
  }
  return null;
};
