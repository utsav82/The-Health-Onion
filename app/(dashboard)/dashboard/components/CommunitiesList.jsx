import prisma from "app/libs/prismadb";
import Link from "next/link";
import { BsPeople } from "react-icons/bs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "app/components/ui/card";
import { Inter } from 'next/font/google'
 
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

const CommunitiesList = async () => {
    try {
        const communities = await prisma.community.findMany({
            include: {
                creator: true,
                subscribers: true,
            },
            take: 3,
        });
        return (
            <div className="flex gap-5 mt-5 flex-wrap">
                {communities.map((item, idx) => (
                    <Link href={`/communities/${item.name}`} key={item.id}>
                        <Card className="h-80 w-80 flex flex-col justify-between items-start bg-cover bg-center text-white" style={{ backgroundImage: `url(${item.image})` }}>
                            <CardHeader>
                                <CardDescription className="text-white opacity-100 font-semibold uppercase drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Created By {item.creator.name}</CardDescription>
                                <CardTitle className="font-semibold text-white leading-6 text-4xl mt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{item.name}</CardTitle>
                            </CardHeader>
                            <CardFooter>
                                <BsPeople size={20} className="mr-2"></BsPeople> Followers{" "}
                                {item.subscribers.length}
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>

        );
    } catch (err) {
        console.error("An error occurred:", err);
        return (
            <div className="text-black container">Error loading communities.</div>
        );
    }
};

export default CommunitiesList;
