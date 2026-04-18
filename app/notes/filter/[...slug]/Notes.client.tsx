"use client";
import { useEffect, useState } from 'react'
import css from './NotesPage.module.css'
import toast, { Toaster } from 'react-hot-toast';
import { fetchNotes } from '../../../../lib/api'
import SearchBox from '../../../../components/SearchBox/SearchBox';
import NoteList from '../../../../components/NoteList/NoteList';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Pagination from '../../../../components/Pagination/Pagination';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';

interface NotesClientProps {
    tag: string | undefined
}

function NotesClient({ tag }: NotesClientProps) {
    console.log("App rendered")
    const notify = () => toast.error('No notes found for your request.');
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState("");

    const { data, isSuccess } = useQuery({
        queryKey: ['notes', query, currentPage, tag],
        queryFn: () => fetchNotes(query, currentPage, tag),
        refetchOnMount: false,
        placeholderData: keepPreviousData
    })



    const totalPages = data?.totalPages ?? 0;
    useEffect(() => {
        if (isSuccess && data.notes.length == 0) {
            console.log("notes: ", data.notes)
            notify()
        }
        return toast.dismiss
    }, [data, isSuccess])


    const handleSearch = useDebouncedCallback((newQuery) => {
        setQuery(newQuery)
        setCurrentPage(1)
    }, 300)


    return (
        <>
            <div className={css.app}>
                <header className={css.toolbar}>
                    <SearchBox onChange={handleSearch}></SearchBox>
                    {isSuccess && totalPages > 1 &&
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}></Pagination>}
                    <Link className={css.button} href={'/notes/action/create'}>Create note +</Link>
                </header>
                <Toaster></Toaster>
                {data && data.notes.length > 0 && <NoteList notes={data.notes}></NoteList>}
            </div >
        </>
    )
}

export default NotesClient
