const bcrypt = require("bcryptjs");

const plainPassword = "adminpassword"; // The password you want for the admin account

async function generateHash() {
  try {
    const salt = await bcrypt.genSalt(10); // Standard salt rounds
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    console.log("--- Admin Password Hash Generation ---");
    console.log(`Plain Password: ${plainPassword}`);
    console.log(`Generated BCrypt Hashed Password: ${hashedPassword}`);
    console.log("\nACTION REQUIRED:");
    console.log(
      "1. Copy the 'Generated BCrypt Hashed Password' value shown above."
    );
    console.log(
      "2. Go to your MongoDB Atlas cluster (or your local MongoDB instance)."
    );
    console.log(
      "3. Navigate to database 'aztek_coffee_db' -> collection 'admins'."
    );
    console.log("4. Find the document where username is 'admin'.");
    console.log(
      "5. Edit this document and replace the current value in the 'password' field with this new hash."
    );
    console.log("------------------------------------");
  } catch (error) {
    console.error("Error generating hash:", error);
  }
}

generateHash();
