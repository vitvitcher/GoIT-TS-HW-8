import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
    params: Promise<{
        slug: string[]
    }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const tagString = slug[0]
    return {
        title: `Notes: ${tagString}`,
        description: `Page containing ${tagString.toLowerCase()} notes`,
        openGraph: {
            title: `Note: ${tagString}`,
            description: `Page containing ${tagString.toLowerCase()} notes`,
            url: `https://notehub.com/notes/filter/${tagString}`,
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
}
const NotesPage = async ({ params }: Props) => {
    const { slug } = await params;
    const tag = slug[0] === 'all' ? undefined : slug[0];
    const queryClient = new QueryClient();
    console.log(tag)
    await queryClient.prefetchQuery({
        queryKey: ['notes', tag],
        queryFn: () => fetchNotes("", 1, tag)
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
        </HydrationBoundary>
    );
};

export default NotesPage;
