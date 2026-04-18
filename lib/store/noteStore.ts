import { NoteBody } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


type NoteDraftSrore = {
    draft: NoteBody,
    setDraft: (note: NoteBody) => void,
    clearDraft: () => void,

}

const initialDraft: NoteBody = {
    title: '',
    content: '',
    tag: 'Todo',
};

export const useNoteDraftStore = create<NoteDraftSrore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (note: NoteBody) => set({ draft: note }),
            clearDraft: () => set({ draft: initialDraft })
        }), {
        name: 'note-draft',
        partialize: (state) => ({ draft: state.draft }),
    }
    ));