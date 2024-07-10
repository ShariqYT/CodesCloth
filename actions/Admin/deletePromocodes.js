"use server";
import connectDB from "@/db/connectDB";
import PromoCodes from "@/models/PromoCodes";

export const deletePromocodes = async (id) => {
    try {
        await connectDB(); // Ensure MongoDB connection is established

        // Attempt to delete the promo code by its ID
        const deletedPromocode = await PromoCodes.findByIdAndDelete(id);

        // If no promo code found with the given ID, throw an error
        if (!deletedPromocode) {
            throw new Error("Promo code not found or already deleted");
        }

        // Convert Mongoose document to plain JavaScript object
        const deletedPromocodeObject = deletedPromocode.toObject();

        // Return the plain JavaScript object of the deleted promo code
        return deletedPromocodeObject;
    } catch (err) {
        throw err; // Re-throw the error to be caught by the calling function or API handler
    }
};
