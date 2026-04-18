

import { Metadata } from 'next'
import css from './CreateNote.module.css'
import NoteForm from '@/components/NoteForm/NoteForm'


export const metadata: Metadata = {
    title: `Create new note`,
    description: `Create a new note by using our simple form`,
    openGraph: {
        title: `Create new note`,
        description: `Create a new note by using our simple form`,
        url: `https://notehub.com/notes/action/create`,
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'NoteHub Logo',
            },
        ],
    }
}



function CreateNote() {

    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm></NoteForm>
            </div>
        </main >
    )
}

export default CreateNote