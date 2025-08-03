import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebHooks = async (req, res) => {
  try {
    // Create a Svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Getting Headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-singature": req.headers["svix-signature"],
    };
    // Verifying Headers
    await whook.verify(JSON.stringify(req.body), headers);

    //  Getting Data from request body
    const { data, type } = req.body;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_addresses,
      username: data.first_name + "" + data.last_name,
      image: data.image_url,
    };
    // switch case for diff event
    switch (type) {
      case "user.created": {
        await User.create(userData);
        break;
      }
      case "user.updated": {
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }
      default:
        break;
    }
    res.json({success : true, message : "WebHook Recieved"})
  } catch (error) {
    console.log(error.message);
    res.json({success : false , message : error.message})
  }
};

export default clerkWebHooks;


// import User from "../models/User.js";
// import { Webhook } from "svix";

// const clerkWebHooks = async (req, res) => {
//   try {
//     // Create a Svix instance using Clerk webhook secret
//     const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     // Get headers correctly (fix svix-signature typo)
//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };

//     // Verify the incoming webhook
//     const payload = JSON.stringify(req.body);
//     wh.verify(payload, headers);

//     // Get data and type from webhook
//     const { data, type } = req.body;

//     // Extract user data safely
//     const userData = {
//       _id: data.id,
//       email: data.email_addresses?.[0]?.email_address || "",
//       username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//       image: data.image_url || "",
//     };

//     switch (type) {
//       case "user.created":
//         await User.create(userData);
//         break;
//       case "user.updated":
//         await User.findByIdAndUpdate(data.id, userData);
//         break;
//       case "user.deleted":
//         await User.findByIdAndDelete(data.id);
//         break;
//       default:
//         break;
//     }

//     res.json({ success: true, message: "Webhook received" });
//   } catch (error) {
//     console.error("Webhook Error:", error.message);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// export default clerkWebHooks;
