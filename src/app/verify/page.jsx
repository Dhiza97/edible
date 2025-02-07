"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { account } from "@/src/app/lib/appwrite";
import { prisma } from "@/src/app/lib/prisma";

export default function VerifyPage() {
    const [message, setMessage] = useState("Verifying...");
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const verifyEmail = async () => {
            const userId = searchParams.get("userId");
            const secret = searchParams.get("secret");

            if (!userId || !secret) {
                setMessage("Invalid verification link.");
                return;
            }

            try {
                // Verify the email in Appwrite
                await account.updateVerification(userId, secret);

                // Fetch Appwrite user details
                const user = await account.get(userId);

                // Hash password (since Appwrite stores passwords separately)
                const hashedPassword = await bcrypt.hash(user.password, 10);

                // Step 4: Save user in Prisma database
                await prisma.user.create({
                    data: {
                        name: user.name,
                        email: user.email,
                        password: hashedPassword,
                    },
                });

                setMessage("Email verified successfully! Redirecting...");
                setTimeout(() => router.push("/login"), 3000);
            } catch (error) {
                setMessage("Verification failed: " + error.message);
            }
        };

        verifyEmail();
    }, [searchParams, router]);

    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-lg font-semibold">{message}</p>
        </div>
    );
}
