import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust this path to your NextAuth options file
import { redirect } from "next/navigation";
import AddBlogForm from "@/app/components/dashboard/blog/userBlog/AddBlogForm";

export default async function Blog() {
  const session = await getServerSession(authOptions);

  // Protect the route: if no user is logged in, redirect to sign-in page.
  if (!session || !session.user) {
    redirect("/api/auth/signin?callbackUrl=/dashboard/add-post");
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-amber-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-[#127917] font-hind">
            নতুন পোস্ট যোগ করুন
          </h1>
          <p className="text-gray-600 font-hind">
            আপনার জ্ঞান সবার সাথে শেয়ার করুন
          </p>
        </div>
      </header>
      <AddBlogForm user={session.user} />
    </div>
  );
}
