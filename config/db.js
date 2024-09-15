const mongoose = require("mongoose");

const connectToDB = async () => {
  if (mongoose.connections[0].readyState) {
    return false;
  } else {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/next-todo");
      console.log("connected to next-todo database");
    } catch (error) {
      console.log("connected to database in error", error);
    }
  }
};
export default connectToDB;
