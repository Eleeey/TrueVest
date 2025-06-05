"use server"
import { connectToDatabase } from "@/lib";
import User, { IUser } from "@/lib/models/user.model";
import Wallet from "@/lib/models/wallets.model";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type UserParams = {
  clerkId: string | undefined;
  name:string| null;
  Balance: number;
  verified: 0 | 1 | 2;
  history: []; // start with an empty array
  deposit: number;
  plan: string;
};

type UpdateUserParams = {
  Balance: any
}







export async function addBalance(ammount: number, bal: number) {
  var totalBal = ammount + bal;
  return totalBal;
}



export async function getClerkUser(){

    const user = await currentUser();
    if(!user){
    redirect("/sign-in")
  }
    // console.log(user)
    return user
}

export async function getUserInfo(){
  try{await connectToDatabase();
  const clerkUser = await getClerkUser();

  const user = await User.findOne({ clerkId: clerkUser?.id })

  if (!user){
    redirect('/sign-in')
  }

  return user
}catch(error){
    console.log(error)
  }
}

export async function createUser() {
  try {
    await connectToDatabase();
    const clerkUser = await getClerkUser();



    // console.log(id)
    const existingUser=await getUserInfo()

    if(!existingUser){
      const data: UserParams = {
        clerkId: clerkUser?.id,
        name:clerkUser?.fullName,
        Balance: 0,
        verified: 0,
        history: [],
        deposit: 0,
        plan: "basic",
};
      const newUser = await User.create(data);
      console.log(newUser)
      return JSON.parse(JSON.stringify(newUser));
    }

  } catch (error) {
console.log(error);
  }
}


// export async function addUserBal(id:any,ammount:any) {
//   try {
//      await connectToDatabase()
//      console.log("Connected to DB");

//     const user = await User.findOne({clerkId:id});
//     console.log(user)
//     const userBal = user?.Balance;
//     console.log(typeof userBal)


//     // const totalBal= userBal + ammount
//     // console.log(totalBal)

//     // return JSON.parse(JSON.stringify(totalBal))

//     // user.Balance = totalBal;
//     // await user.save();  // Save the updated user object back to the DB

//     console.log("Balance updated in DB");


//   } catch (error) {
//     console.log(error);
//   }
// }
// export async function userBal() {
//   try {
//      await connectToDatabase()
//      console.log("Connected to DB");
//      const clerkUser=await getClerkUser()

//     const user = await getUserInfo();
//     if(!user){

//       await createUser();
//       console.log("created")
//     }

//     const newUser = await getUserInfo();
//     console.log(newUser)


// return newUser
//   } catch (error) {
//     console.log(error);
//   }
// }





export async function getUserHistory() {
  try {
    await connectToDatabase();
    const clerkUser = await getClerkUser();
    const user = await User.findOne({ clerkId : clerkUser?.id })
      .select("history")
      .lean<IUser>(); // <== This tells TypeScript to expect an IUser

    if (!user) {
     await createUser()
    }

    return user?.history;
  } catch (error) {
    console.error("Error fetching user history:", error);
    throw error;
  }
}




export async function updateAfterDeposit(

  amount: any,
  receiptUrl: string
) {
  try {
    await connectToDatabase();
    const clerkUser = await getClerkUser();
    const user = await getUserInfo();

    if (!user) {
      throw new Error("User not found");
    }

    // Update balances

    user.deposit + amount;

    // Append to history
    user.history.push({
      amount,
      confirmed: false,
      receipt: receiptUrl,
      type: "credit",
      date: new Date(),
    });

    // Save updated user
    await user.save();

    return {
      success: true,
      message: "Deposit recorded and pending verification.",
    };
  } catch (error) {
    console.error("Error updating after deposit:", error);
    return { success: false, message: "Failed to update deposit." };
  }
}


export async function updateAfterWithdrawal(

  amount: any,

) {
  try {
    await connectToDatabase();
    const clerkUser = await getClerkUser();
    const user = await getUserInfo();

    if (!user) {
      throw new Error("User not found");
    }

    // Update balances

    user?.Balance + amount;

    // Append to history
    user.history.push({
      amount,
      confirmed: false,
      type: "debit",
      date: new Date(),
    });

    // Save updated user
    await user.save();

    return {
      success: true,
      message: "Withdrawal recorded and pending verification.",
    };
  } catch (error) {
    console.error("Error updating after Withdrawal:", error);
    return { success: false, message: "Failed to update deposit." };
  }
}


export async function verifyUser() {
  try {
     await connectToDatabase();
     const clerkUser = await getClerkUser();
    const user = await User.findOneAndUpdate(
      { clerkId: clerkUser?.id, verified: 0 }, // Only update if currently unverified
      { $set: { verified: 1 } },
      { new: true } // Return the updated document
    );

    if (!user) {
      console.log("User not found or already verified.");
      return null;
    }

    console.log("User verified:", user);
    return user;
  } catch (error) {
    console.error("Error verifying user:", error);
    throw error;
  }
}

export async function getWalletAdderess() {
  try {
    await connectToDatabase()
    const wallets = await Wallet.find();
    return wallets;
  } catch (error) {
    console.error("Error fetching wallets:", error);
    throw new Error("Failed to fetch wallets");
  }

}


export async function handleClick(){
  const clerkUser=await currentUser()
  try {
    await connectToDatabase();

    const user = await User.findOneAndUpdate(
      { clerkId:clerkUser?.id },
      { badge1: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Badge updated', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}
