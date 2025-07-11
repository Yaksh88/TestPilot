
import { useState } from 'react';
import AIGenerator from './components/AIGenerator';
import TestCaseForm from './components/TestCaseForm';
import TestCaseList from './components/TestCaseList';
import TestCasePreview from './components/TestCasePreview';
import Sidebar from './components/Sidebar';
import BackgroundBlobs from './components/BackgroundBlobs';
import TestSuiteReview from './components/TestSuitReview';
import './styles/index.css';
import { Toaster, toast } from 'react-hot-toast';
import { supabase } from './services/supabase';
import type { TestCase } from './hooks/useTestCases';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortablePanel from './components/SortablePanel';

const App = () => {
  const [prefillData, setPrefillData] = useState<TestCase | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [panelOrder, setPanelOrder] = useState([
    'form',
    'review',
    'ai',
    'list',
    'preview',
  ]);

  const handleRegenerate = (testCase: any) => {
    const prompt = `Improve this test case for clarity and completeness:\n\nTitle: ${testCase.title}\nSteps: ${testCase.steps}\nExpected: ${testCase.expected}`;
    alert('AI regenerate prompt sent:\n' + prompt);
  };

  const handleDelete = async (testCase: any) => {
    const confirmed = window.confirm(`Delete test case "${testCase.title}"?`);
    if (!confirmed) return;

    const { error } = await supabase.from('test_cases').delete().eq('id', testCase.id);
    if (error) {
      toast.error('Failed to delete test case.');
    } else {
      toast.success('Test case deleted.');
      window.location.reload(); 
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setPanelOrder((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-tr from-gray-100 to-slate-300 relative">
      <div className="absolute inset-0 z-0">
        <BackgroundBlobs />
      </div>
      <Toaster position="top-right" />
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 flex justify-center overflow-hidden">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={panelOrder} strategy={verticalListSortingStrategy}>
            <div className="w-full max-w-screen-2xl grid grid-cols-1 md:grid-cols-[30%_40%_30%] gap-4 md:gap-6">
              {/* Left column: Form + Review */}
              <div className="flex flex-col gap-4 md:gap-6">
                {panelOrder.map((id) =>
                  id === 'form' ? (
                    <SortablePanel key={id} id={id}>
                      <TestCaseForm
                        prefillData={prefillData}
                        isEditing={editMode}
                        onDone={() => {
                          setEditMode(false);
                          setPrefillData(null);
                        }}
                      />
                    </SortablePanel>
                  ) : id === 'review' ? (
                    <SortablePanel key={id} id={id}>
                      <TestSuiteReview />
                    </SortablePanel>
                  ) : null
                )}
              </div>

              {/* Middle column: AI Generator + List */}
              <div className="flex flex-col gap-4 md:gap-6 h-full overflow-hidden">
                {panelOrder.map((id) =>
                  id === 'ai' ? (
                    <SortablePanel key={id} id={id}>
                      <AIGenerator
                        onUseTestCase={(tc) => {
                          setPrefillData(tc as TestCase);
                          setEditMode(true);
                        }}
                      />
                    </SortablePanel>
                  ) : id === 'list' ? (
                    <SortablePanel key={id} id={id}>
                      <TestCaseList
                        onRegenerate={handleRegenerate}
                        onEdit={(tc) => {
                          setPrefillData(tc);
                          setEditMode(true);
                        }}
                        onDelete={handleDelete}
                        
                      />
                    </SortablePanel>
                  ) : null
                )}
              </div>

              {/* Right column: Preview */}
              <div className="flex flex-col h-[calc(100vh-100px)] overflow-hidden">
  {panelOrder.map((id) =>
    id === 'preview' ? (
      
        <div className="flex-1 bg-white/60 backdrop-blur-md rounded-xl p-4 shadow-md overflow-y-auto">
          <TestCasePreview />
        </div>
      
    ) : null
  )}
</div>
            </div>
          </SortableContext>
        </DndContext>
      </main>
    </div>
  );
};

export default App;


      
