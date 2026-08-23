import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { chapterData } from '../data/chapter';
import { questionsData } from '../data/questions';
import { useProgressStore } from '../stores/progressStore';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  StickyNote,
  Bookmark,
  Search,
  Filter,
  ArrowRight,
  Edit3,
  Trash2,
  Check,
  X,
  BookOpen,
  HelpCircle,
  FolderOpen
} from 'lucide-react';

interface NoteItem {
  id: string;
  lessonId: string;
  lessonTitle: string;
  lessonOrder: number;
  sectionId: string;
  sectionTitle: string;
  sectionType: string;
  noteText: string;
  isBookmarked: boolean;
  isQuestion: boolean;
}

export const NotesPage: React.FC = () => {
  const {
    notes,
    bookmarkedSections,
    saveNote,
    deleteNote,
    toggleBookmark
  } = useProgressStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<string>('ALL');
  const [activeTab, setActiveTab] = useState<'all' | 'notes' | 'bookmarks'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // Index and map all notes & bookmarks to their curriculum metadata
  const allItems: NoteItem[] = useMemo(() => {
    const items: NoteItem[] = [];
    const processedIds = new Set<string>();

    // 1. Traverse all curriculum lessons and sections
    chapterData.lessons.forEach((lesson) => {
      lesson.sections.forEach((sec) => {
        const secId = sec.id;
        const note = notes[secId];
        const isBookmarked = bookmarkedSections.includes(secId);

        if (note || isBookmarked) {
          processedIds.add(secId);
          items.push({
            id: secId,
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            lessonOrder: lesson.order,
            sectionId: secId,
            sectionTitle: sec.title,
            sectionType: sec.type,
            noteText: note || '',
            isBookmarked: Boolean(isBookmarked),
            isQuestion: sec.type === 'QUESTION'
          });
        }
      });
    });

    // 2. Check any question IDs or standalone items that might have notes/bookmarks
    Object.keys(notes).forEach((id) => {
      if (!processedIds.has(id)) {
        const q = questionsData[id];
        const isBookmarked = bookmarkedSections.includes(id);
        items.push({
          id,
          lessonId: 'practice',
          lessonTitle: q ? `Practice: ${q.topic}` : 'General Revision',
          lessonOrder: 8,
          sectionId: id,
          sectionTitle: q ? q.question.slice(0, 70) + (q.question.length > 70 ? '...' : '') : `Item ${id}`,
          sectionType: 'QUESTION',
          noteText: notes[id],
          isBookmarked: Boolean(isBookmarked),
          isQuestion: true
        });
        processedIds.add(id);
      }
    });

    bookmarkedSections.forEach((id) => {
      if (!processedIds.has(id)) {
        const q = questionsData[id];
        items.push({
          id,
          lessonId: 'practice',
          lessonTitle: q ? `Practice: ${q.topic}` : 'General Revision',
          lessonOrder: 8,
          sectionId: id,
          sectionTitle: q ? q.question.slice(0, 70) + (q.question.length > 70 ? '...' : '') : `Item ${id}`,
          sectionType: 'QUESTION',
          noteText: notes[id] || '',
          isBookmarked: true,
          isQuestion: true
        });
        processedIds.add(id);
      }
    });

    return items;
  }, [notes, bookmarkedSections]);

  // Filter items
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Tab filter
      if (activeTab === 'notes' && !item.noteText) return false;
      if (activeTab === 'bookmarks' && !item.isBookmarked) return false;

      // Unit filter
      if (selectedUnit !== 'ALL' && item.lessonId !== selectedUnit) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchNote = item.noteText.toLowerCase().includes(q);
        const matchTitle = item.sectionTitle.toLowerCase().includes(q);
        const matchLesson = item.lessonTitle.toLowerCase().includes(q);
        if (!matchNote && !matchTitle && !matchLesson) return false;
      }

      return true;
    });
  }, [allItems, activeTab, selectedUnit, searchQuery]);

  const handleStartEdit = (item: NoteItem) => {
    setEditingId(item.id);
    setEditText(item.noteText);
  };

  const handleSaveEdit = (id: string) => {
    if (editText.trim()) {
      saveNote(id, editText.trim());
    } else {
      deleteNote(id);
    }
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    deleteNote(id);
    if (editingId === id) setEditingId(null);
  };

  const totalNotesCount = Object.keys(notes).filter(k => Boolean(notes[k]?.trim())).length;
  const totalBookmarksCount = bookmarkedSections.length;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-sm">
              <StickyNote className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                My Saved Notes & Marked Items
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Centralized revision manager for your personal notes, formulas, and bookmarked problems
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-cyan-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Items ({allItems.length})
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'notes'
                  ? 'bg-white text-cyan-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Notes ({totalNotesCount})
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'bookmarks'
                  ? 'bg-white text-cyan-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bookmarks ({totalBookmarksCount})
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes by keyword, topic, or section title..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Unit Dropdown */}
          <div className="sm:col-span-4 flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-cyan-600 shadow-sm"
            >
              <option value="ALL">All Curriculum Units</option>
              {chapterData.lessons.map((l) => (
                <option key={l.id} value={l.id}>
                  Unit {l.order}: {l.title}
                </option>
              ))}
              <option value="practice">Practice Question Bank</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredItems.length === 0 ? (
        /* Empty State */
        <div className="p-12 text-center rounded-2xl border border-slate-200 bg-white shadow-card space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 shadow-sm">
            <FolderOpen className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="text-base font-bold text-slate-900">
              {searchQuery || selectedUnit !== 'ALL' || activeTab !== 'all'
                ? 'No matching notes or bookmarks found'
                : 'No saved notes yet'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {searchQuery || selectedUnit !== 'ALL' || activeTab !== 'all'
                ? 'Try adjusting your search terms or filters to find what you are looking for.'
                : 'As you study lessons and solve questions, click the Sticky Note icon or Bookmark icon on any section to pin your notes here for quick revision!'}
            </p>
          </div>

          <div className="pt-2">
            <Link to="/">
              <Button variant="primary" size="sm" icon={<BookOpen className="w-3.5 h-3.5" />}>
                Browse Curriculum Units
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* Notes & Bookmarks Grid */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 px-1">
            <span>Saved Records ({filteredItems.length})</span>
            <span className="font-mono text-slate-400">Click any card to jump back to lesson</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredItems.map((item) => {
              const isEditing = editingId === item.id;
              const targetUrl = item.lessonId === 'practice'
                ? `/practice`
                : `/lesson/${item.lessonId}#${item.sectionId}`;

              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white shadow-card hover:border-cyan-500/40 transition-all space-y-3.5"
                >
                  {/* Top Metadata Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200">
                        {item.lessonId === 'practice' ? 'PRACTICE' : `UNIT ${item.lessonOrder}`}
                      </span>
                      <span className="text-xs font-semibold text-slate-900 font-mono">
                        {item.lessonTitle}
                      </span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {item.sectionType}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.isBookmarked && (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <Bookmark className="w-3 h-3" fill="currentColor" /> Bookmarked
                        </span>
                      )}

                      <Link
                        to={targetUrl}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-700 hover:text-cyan-900 bg-cyan-50 hover:bg-cyan-100 px-3 py-1 rounded-lg border border-cyan-200 transition-all shadow-sm"
                      >
                        <span>Jump to Section</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>

                  {/* Section Title */}
                  <div className="border-t border-slate-100 pt-2">
                    <h4 className="text-sm font-bold text-slate-800">
                      {item.sectionTitle}
                    </h4>
                  </div>

                  {/* Note Content / Inline Editor */}
                  {item.noteText && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-800 flex items-center gap-1.5">
                          <StickyNote className="w-3.5 h-3.5 text-cyan-600" />
                          <span>Personal Revision Note</span>
                        </span>

                        {!isEditing && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleStartEdit(item)}
                              className="p-1 text-slate-500 hover:text-cyan-700 hover:bg-slate-200/60 rounded transition-colors"
                              title="Edit Note"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                              title="Delete Note"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {isEditing ? (
                        <div className="space-y-2 pt-1">
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            rows={3}
                            autoFocus
                            className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-cyan-600 focus:ring-1 focus:ring-cyan-500/20"
                          />
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-800"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveEdit(item.id)}
                              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-600 text-white text-xs font-semibold hover:bg-cyan-700 shadow-sm"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Save</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-700 leading-relaxed italic whitespace-pre-wrap">
                          {item.noteText}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
