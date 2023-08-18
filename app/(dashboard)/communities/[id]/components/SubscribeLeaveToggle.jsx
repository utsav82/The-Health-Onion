'use client'
import { Button } from 'app/components/ui/button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from "react"
import { Icons } from "app/components/icons"
import { toast } from "react-hot-toast";
import { ReloadIcon } from "@radix-ui/react-icons"

const SubscribeLeaveToggle = ({
    isSubscribed,
    communityId,
    communityName,
}) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, startTransition] = useTransition()
    const isMutating = isLoading || isPending;

    const subscribe = async () => {

        try {

            const payload = {
                communityId: communityId,
            }

            setIsLoading(true);

            const { data } = await axios.post('/api/community/subscribe', payload)

            if (data) {
                isSubscribed = !isSubscribed;
            }

            setIsLoading(false);
            var msg = isSubscribed ? "subscribed" : "unsubscribed";
            toast.success(
                `Sucessfully ${msg}`
            )

            startTransition(() => router.refresh())

            return data;
        }
        catch (err) {
            toast.error("There was an error")
        }
        finally {

            setIsLoading(false);

        }

    }
    return isSubscribed ? (
        <Button
            className='font-bold bg-secondary'
            disabled={isMutating}
            onClick={() => subscribe()}>
            {isMutating ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <Icons.check className="mr-2 h-4 w-4" />
            }
            {isMutating ? "Please wait" : "Leave community"}


        </Button>
    ) : (
        <Button
            className='font-bold'
            disabled={isMutating}
            onClick={() => subscribe()}>
            {isMutating ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : <Icons.add className="mr-2 h-4 w-4" />
            }
            {isMutating ? "Please wait" : "Join"}

        </Button>
    )
}

export default SubscribeLeaveToggle
