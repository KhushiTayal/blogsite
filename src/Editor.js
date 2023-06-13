import React, { useState, useRef } from 'react';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor as DraftEditor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null);
  const [tone, setTone] = useState('');

  const handleGenerate = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    let generatedText = '';
    let generatedContent = '';

    if (tone === 'Formal') {
      generatedText = `Dear readers,\n\n${rawContent}\n\nSincerely,\n[Your Name]`;
    } else if (tone === 'Informal') {
      generatedText = `Hey everyone!\n\n${rawContent}\n\nTake care,\n[Your Name]`;
    } else if (tone === 'Casual') {
      generatedText = `Hey there!\n\n${rawContent}\n\nCheers,\n[Your Name]`;
    }

    generatedContent = `Generated Content:\n\n${generatedText}\n\nTone: ${tone}`;

    const newContentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          key: 'generatedContent',
          text: generatedContent,
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
    });

    const newEditorState = EditorState.createWithContent(newContentState);
    setEditorState(newEditorState);
  };

  const handleRefresh = () => {
    setEditorState(EditorState.createEmpty());
    setTone('');
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const handleImageUpload = (file) => {
    return new Promise((resolve, reject) => {
      resolve({ data: { link: 'https://example.com/image.jpg' } });
    });
  };

  const handleUndo = () => {
    setEditorState(EditorState.undo(editorState));
  };

  const handleRedo = () => {
    setEditorState(EditorState.redo(editorState));
  };

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <h3 className="text-2xl font-bold mb-4">Editor</h3>
      <div className="flex items-center space-x-4 mb-4">
        <label className="font-medium">
          Tone:
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="ml-2 p-2 border border-gray-300 rounded"
          >
            <option value="">Select a tone</option>
            <option value="Formal">Formal</option>
            <option value="Informal">Informal</option>
            <option value="Casual">Casual</option>
          </select>
        </label>
        <button
          onClick={handleGenerate}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Generate
        </button>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Refresh
        </button>
      </div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleUndo}
          disabled={!editorState.getUndoStack().size}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded"
        >
          Undo
        </button>
        <button
          onClick={handleRedo}
          disabled={!editorState.getRedoStack().size}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded"
        >
          Redo
        </button>
      </div>
      <DraftEditor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        handleKeyCommand={handleKeyCommand}
        wrapperClassName="bg-white border border-gray-300 rounded"
        editorClassName="p-4"
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'image'],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough'],
          },
          blockType: {
            inDropdown: true,
          },
          fontSize: {
            options: [10, 12, 14, 16, 18, 24, 30, 36, 48],
          },
          list: {
            inDropdown: true,
          },
          textAlign: {
            inDropdown: true,
          },
          link: {
            options: ['link'],
            defaultTargetOption: '_blank',
          },
          embedded: {
            defaultSize: {
              height: 'auto',
              width: 'auto',
            },
          },
          image: {
            uploadCallback: handleImageUpload,
            alt: { present: true, mandatory: true },
            previewImage: true,
            inputAccept: 'image/*',
            defaultSize: {
              height: 'auto',
              width: 'auto',
            },
            alignmentEnabled: false,
            defaultAlignment: 'left',
          },
        }}
      />
    </div>
  );
};

export default Editor;
