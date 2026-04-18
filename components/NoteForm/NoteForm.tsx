'use client'

import { useId } from 'react';
import type { Note, NoteBody } from '../../types/note';
import css from './NoteForm.module.css'
//import * as Yup from "yup";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api';
import { useNoteDraftStore } from '../../lib/store/noteStore'
import { useRouter } from 'next/navigation';


// const NoteFormSchema = Yup.object().shape({
//     title: Yup.string()
//         .min(3, "Title must be at least 3 characters")
//         .max(50, "Title is too long")
//         .required("Title is required"),
//     content: Yup.string()
//         .max(500, "Content is too long"),
//     tag: Yup.string()
//         .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"], "Invalid tag")
//         .required("Tag is required")
// });

export default function NoteForm() {
    const fieldId = useId();
    const { draft, setDraft, clearDraft } = useNoteDraftStore();
    const queryClient = useQueryClient();
    const router = useRouter()

    const mutationCreate = useMutation({
        mutationFn: async (newNote: NoteBody) => {
            const res = await createNote(newNote)
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            clearDraft()
            router.back()
        }
    });
    const handleSubmit = (formData: FormData) => {
        const values = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            tag: formData.get('tag') as Note['tag']
        }
        mutationCreate.mutate(values);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDraft({
            ...draft,
            [event.target.name]: event.target.value,
        });
    }

    return (

        <form className={css.form} action={handleSubmit}>
            <div className={css.formGroup}>
                <label className={css.label} htmlFor={`${fieldId}-title`}>
                    Title</label>
                <input type="text" name="title" id={`${fieldId}-title`} className={css.input}
                    defaultValue={draft?.title} onChange={handleChange} />

            </div>
            <div className={css.formGroup}>
                <label className={css.label} htmlFor={`${fieldId}-content`}>
                    Content</label>
                <textarea className={css.textarea} id={`${fieldId}-content`} name="content" defaultValue={draft?.content} onChange={handleChange}></textarea>

            </div>
            <div className={css.formGroup}>
                <label className={css.label} htmlFor={`${fieldId}-tag`}>
                    Tag </label>
                <select className={css.select} id={`${fieldId}-tag`}
                    name="tag" defaultValue={draft ? draft.tag : "Todo"} onChange={handleChange} >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>

            </div>
            <div className={css.actions}>
                <button type="submit" className={css.submitButton}>Create</button>
                <button type="button" className={css.cancelButton} onClick={() => router.back()}>Cancel</button>
            </div>
        </form>
    );

}