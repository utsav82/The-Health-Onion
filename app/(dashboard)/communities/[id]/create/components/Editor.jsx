'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { Button } from "app/components/ui/button"
import 'app/editor.css'

const Editor = ({ communityId, community_name }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            communityId,
            title: '',
            content: null,
        },
    })
    const ref = useRef();
    const _titleRef = useRef(null)
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false)
    const [image, setImage] = useState(null)
    const pathname = usePathname()

    const initializeEditor = useCallback(async () => {

        const EditorJS = (await import('@editorjs/editorjs')).default
        const LinkTool = (await import('@editorjs/link')).default

        if (!ref.current) {
            const editor = new EditorJS({
                holder: 'ff',
                onReady() {
                    ref.current = editor
                },
                placeholder: 'Type here to write your post...',
                inlineToolbar: true,
                data: { blocks: [] },
                tools: {
                    linkTool: {
                        class: LinkTool,
                        config: {
                            endpoint: '/api/link',
                        },
                    },
                },
            })
        }
    }, [])



    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMounted(true);
        }
        const init = async () => {
            await initializeEditor()

            setTimeout(() => {
                _titleRef?.current?.focus()
            }, 0)
        }

        if (isMounted) {
            init()

            return () => {
                ref.current?.destroy()
                ref.current = undefined
            }
        }
    }, [isMounted, initializeEditor])

    async function onSubmit(data) {
        const blocks = await ref.current?.save()

        const payload = {
            title: data.title,
            content: blocks,
            communityId,
            image
        }
        console.log(payload)
        // createPost(payload)
    }

    if (!isMounted) {
        return <div id="ff">Loading...</div>;
    }

    const { ref: titleRef, ...rest } = register('title')

    return (
        <div className='w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200 text-black'>
            <form
                id='subreddit-post-form'
                className='w-fit'
                onSubmit={handleSubmit(onSubmit)}>
                <div className='prose prose-stone dark:prose-invert'>
                    <TextareaAutosize
                        ref={(e) => {
                            titleRef(e)
                            // @ts-ignore
                            _titleRef.current = e
                        }}
                        {...rest}
                        placeholder='Title'
                        required
                        className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
                    />
                    <div id='ff' className='min-h-[500px]'></div>
                    <p className='text-sm text-gray-500'>
                        Use{' '}
                        <kbd className='rounded-md border bg-muted px-1 text-xs uppercase'>
                            Tab
                        </kbd>{' '}
                        to open the command menu.
                    </p>
                </div>
            </form>
            <div className="flex justify-between">
                <Button variant="outline" onClick={() => router.push(`/communities/${community_name}`)}>Cancel</Button>
                <Button type="submit" form="subreddit-post-form" >Post</Button>
            </div>
        </div>
    )
}
export default Editor;
