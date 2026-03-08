import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useKioskStore } from '@/store/useKioskStore';
import KioskHeader from '@/components/KioskHeader';
import { StickyNote, Send, Trash2, User, Scissors } from 'lucide-react';
import { format } from 'date-fns';

const NotesScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notes = useKioskStore((s) => s.notes);
  const addNote = useKioskStore((s) => s.addNote);
  const deleteNote = useKioskStore((s) => s.deleteNote);
  const isGuest = useKioskStore((s) => s.isGuest);

  const [text, setText] = useState('');
  const [author, setAuthor] = useState<'client' | 'master'>('client');

  if (isGuest) {
    navigate('/dashboard');
    return null;
  }

  const handleAdd = () => {
    if (!text.trim()) return;
    addNote(text.trim(), author);
    setText('');
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <KioskHeader />
      <main className="flex flex-1 flex-col items-center overflow-y-auto px-4 pt-20 pb-8 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 flex items-center gap-3"
        >
          <StickyNote className="h-8 w-8 text-gold" />
          <h1 className="font-display text-3xl font-bold text-gold">{t('notes')}</h1>
        </motion.div>
        <div className="mx-auto mb-8 h-px w-24 bg-gold-gradient" />

        {/* Author toggle */}
        <div className="mb-6 flex overflow-hidden rounded-2xl border border-border bg-card shadow-md">
          <button
            onClick={() => setAuthor('client')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all ${
              author === 'client'
                ? 'bg-gold-gradient text-primary-foreground shadow-gold-lg'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <User className="h-4 w-4" />
            {t('client')}
          </button>
          <button
            onClick={() => setAuthor('master')}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all ${
              author === 'master'
                ? 'bg-gold-gradient text-primary-foreground shadow-gold-lg'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Scissors className="h-4 w-4" />
            {t('master')}
          </button>
        </div>

        {/* Input */}
        <div className="mb-8 flex w-full max-w-lg gap-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('note_placeholder')}
            className="flex-1 resize-none rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all focus:ring-2 focus:ring-ring"
            rows={3}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            disabled={!text.trim()}
            className="self-end rounded-xl bg-gold-gradient p-3 text-primary-foreground shadow-gold-lg transition-opacity disabled:opacity-40"
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Notes list */}
        {notes.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground"
          >
            {t('no_notes')}
          </motion.p>
        ) : (
          <div className="flex w-full max-w-lg flex-col gap-3">
            <AnimatePresence>
              {[...notes].reverse().map((note, i) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, x: note.author === 'client' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.03 }}
                  className={`tile-luxury flex gap-3 rounded-2xl px-4 py-3 ${
                    note.author === 'master' ? 'ml-8 border-l-2 border-gold/40' : 'mr-8'
                  }`}
                >
                  <div className="mt-0.5">
                    {note.author === 'client' ? (
                      <User className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Scissors className="h-4 w-4 text-gold" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground whitespace-pre-wrap">{note.text}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {note.author === 'client' ? t('client') : t('master')} · {format(new Date(note.date), 'dd.MM.yyyy HH:mm')}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="self-start text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate('/dashboard')}
          className="mt-8 rounded-xl card-luxury px-6 py-3 text-muted-foreground transition-colors hover:text-gold"
        >
          ← {t('back')}
        </motion.button>
      </main>
    </div>
  );
};

export default NotesScreen;
