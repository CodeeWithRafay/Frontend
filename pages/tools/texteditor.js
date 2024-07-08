import { useEffect, useRef, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Head from 'next/head';

const TextEditor = () =>
{
  const fontNameRef = useRef(null);
  const fontSizeRef = useRef(null);
  const textInputRef = useRef(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const fontList = [
    "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", 
    "Raleway", "Merriweather", "Noto Sans", "Oswald", "Ubuntu"
  ];

  useEffect(() => {
    // Load Google Fonts dynamically
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"; // Replace with your font URLs
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const initializeFontOptions = () => {
    // Create font name options
    if (fontNameRef.current && fontNameRef.current.options.length === 0) {
      fontList.forEach(value => {
        const option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontNameRef.current.appendChild(option);
      });
    }

    // Create font size options
    if (fontSizeRef.current && fontSizeRef.current.options.length === 0) {
      for (let i = 1; i <= 7; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.current.appendChild(option);
      }
      fontSizeRef.current.value = 3; // default size
    }
  };

  const handleFormat = (format, value = null) => {
    textInputRef.current.focus();
    document.execCommand('styleWithCSS', false, true);
    document.execCommand(format, false, value);
    updateCounts();
    saveContent();
  };
  const handleUndoRedo = (action) =>
  {
    textInputRef.current.focus();
    document.execCommand(action, false, null);
    updateCounts();
    saveContent();
  };

  const handleInsertImage = () =>
  {
    const imageUrl = prompt("Enter the image URL");
    if (imageUrl) {
      const img = document.createElement("img");
      img.src = imageUrl;
      textInputRef.current.focus();
      document.execCommand('insertHTML', false, img.outerHTML);
      updateCounts();
      saveContent();
    }
  };

  const handleInsertLink = () =>
  {
    const linkText = prompt("Enter the text for the link:");
    if (linkText) {
      const url = prompt("Enter the URL for the link:");
      if (url) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const link = document.createElement("a");
          link.href = url;
          link.textContent = linkText;
          link.target = "_blank";
          range.deleteContents();
          range.insertNode(link);
          updateCounts();
          saveContent();
        }
      }
    }
  };


  const handleRemoveLink = () =>
  {
    document.execCommand("unlink", false, null);
    updateCounts();
    saveContent();
  };

  const updateCounts = () =>
  {
    const text = textInputRef.current.textContent || "";
    setWordCount(text.trim().split(/\s+/).filter(word => word.length > 0).length);
    setCharCount(text.trim().length);
  };


  const saveContent = () =>
  {
    const content = textInputRef.current.innerHTML;
    localStorage.setItem('editorContent', content);
  };

  const loadContent = () =>
  {
    const savedContent = localStorage.getItem('editorContent');
    if (savedContent) {
      textInputRef.current.innerHTML = savedContent;
      updateCounts();
    }
  };

  useEffect(() =>
  {
    initializeFontOptions();
    loadContent();

    const handleButtonClick = (event) =>
    {
      event.preventDefault();
      const { id, value } = event.target;
      if (!id) return;

      if (id === "createLink") {
        handleInsertLink();
      } else if (id === "formatBlock" || id === "fontName" || id === "fontSize" || id === "foreColor" || id === "backColor") {
        document.execCommand(id, false, value);
      } else if (id === "undo" || id === "redo") {
        handleUndoRedo(id);
      } else {
        handleFormat(id);
      }
    };

    const handleInput = () =>
    {
      updateCounts();
      saveContent();
    };

    document.querySelector('.options').addEventListener('click', handleButtonClick);
    document.querySelector('.options').addEventListener('change', handleButtonClick);
    textInputRef.current.addEventListener('input', handleInput);

  },[]);

  return (
    <>

      <Head>
        <title>TextEditor | CodeWithRafay</title>
        <meta name="description" content="Discover our advanced Text Editor and Word Counter for effortless writing and formatting. Includes real-time counts, formatting options, image insertion, and more. Perfect for all your editing needs." />
        <link rel="canonical" href="https://codewithrafay.com/tools/texteditor" />

      </Head>
      <style global jsx>{`

        button {
          margin: 0 5px;
        }

        .dark button {
          color:white;
        }

        body{
        background-color:#f4f4f4;
        }

        .textarea a{
          color:#0070E0;
          text-decoration:underline;
          cursor:pointer;
        }
      
      `}</style>
      <div className="container mx-auto my-10 bg-white dark:bg-gray-800  p-8 rounded-lg shadow-lg min-h-screen">
        <h1 className="text-2xl font-bold mb-4 p-2 rounded pl-8 bg-cyan-200 dark:text-white dark:bg-cyan-800">{wordCount} Words {charCount} Characters</h1>
        <div className="options flex flex-wrap items-center gap-4 mb-4">
          <select id="fontName" ref={fontNameRef} className="adv-option-button" onChange={(e) => handleFormat('fontName', e.target.value)}></select>

          <select id="fontSize" ref={fontSizeRef} className="adv-option-button" onChange={(e) => handleFormat('fontSize', e.target.value)}></select>
          <select id="formatBlock" className="adv-option-button outline-none" onChange={(e) => handleFormat('formatBlock', e.target.value)}>
            <option value="H1" >H1</option>
            <option value="H2">H2</option>
            <option value="H3">H3</option>
            <option value="H4">H4</option>
            <option value="H5">H5</option>
            <option value="H6">H6</option>
          </select>
          <button id="bold" className="option-button format" onClick={() => handleFormat('bold')}>
            <i className="fas fa-bold"></i>
          </button>
          <button id="italic" className="option-button format" onClick={() => handleFormat('italic')}>
            <i className="fas fa-italic"></i>
          </button>
          <button id="underline" className="option-button format" onClick={() => handleFormat('underline')}>
            <i className="fas fa-underline"></i>
          </button>
          <button id="strikethrough" className="option-button format" onClick={() => handleFormat('strikeThrough')}>
            <i className="fas fa-strikethrough"></i>
          </button>
          <button id="undo" className="option-button" onClick={() => handleUndoRedo('undo')}>
            <i className="fas fa-undo"></i>
          </button>
          <button id="redo" className="option-button" onClick={() => handleUndoRedo('redo')}>
            <i className="fas fa-redo"></i>
          </button>
          <button id="insertOrderedList" className="option-button" onClick={() => handleFormat('insertOrderedList')}>
            <i className="fas fa-list-ol"></i>
          </button>
          <button id="insertUnorderedList" className="option-button" onClick={() => handleFormat('insertUnorderedList')}>
            <i className="fas fa-list"></i>
          </button>

          <button id="insertImage" className="option-button" onClick={handleInsertImage}>
            <i className="fa-solid fa-image"></i>
          </button>

          <button id="justifyLeft" className="option-button align" onClick={() => handleFormat('justifyLeft')}>
            <i className="fas fa-align-left"></i>
          </button>
          <button id="justifyCenter" className="option-button align" onClick={() => handleFormat('justifyCenter')}>
            <i className="fas fa-align-center"></i>
          </button>
          <button id="justifyRight" className="option-button align" onClick={() => handleFormat('justifyRight')}>
            <i className="fas fa-align-right"></i>
          </button>
          <button id="justifyFull" className="option-button align" onClick={() => handleFormat('justifyFull')}>
            <i className="fas fa-align-justify"></i>
          </button>
          <button id="indent" className="option-button spacing" onClick={() => handleFormat('indent')}>
            <i className="fas fa-indent"></i>
          </button>
          <button id="outdent" className="option-button spacing" onClick={() => handleFormat('outdent')}>
            <i className="fas fa-outdent"></i>
          </button>
          <button id="superscript" className="option-button script" onClick={() => handleFormat('superscript')}>
            <i className="fas fa-superscript"></i>
          </button>
          <button id="subscript" className="option-button script" onClick={() => handleFormat('subscript')}>
            <i className="fas fa-subscript"></i>
          </button>
          <button id="createLink" className="adv-option-button" onClick={handleInsertLink}>
            <i className="fas fa-link"></i>
          </button>
          <button id="unlink" className="option-button" onClick={handleRemoveLink}>
            <i className="fas fa-unlink"></i>
          </button>

        </div>
        <div
          id="text-input"
          ref={textInputRef}
          className="dark:bg-gray-900 dark:text-white dark:border-slate-50 rounded mt-4 border outline-none border-gray-300 p-4 min-h-[20rem] h-auto textarea"
          contentEditable="true"
          onInput={updateCounts}
          onFocus={() => textInputRef.current.classList.add("focus")}
          onBlur={() => textInputRef.current.classList.remove("focus")}
        ></div>
        <h2 className="text-xl font-bold mt-4 dark:text-white">{wordCount} Words {charCount} Characters</h2>
        {/* Text editor features section */}
        <hr className="border-gray-200 dark:border-gray-500 mt-10"></hr>
        <div className="mt-5 dark:text-white">
          <h3 className=" font-semibold mb-2 sm:text-xl md:text-3xl text-purple-700 dark:text-purple-500">Text Editor Features:</h3>
          <ul className="list-disc pl-4 md:text-lg sm:text-sm">
          <li><strong className="font-bold">Bold</strong>, <em className="italic">Italic</em>, <u className="underline">Underline</u>, <del className="line-through">Strikethrough</del></li>
            <li>Superscript<sup className="text-xs">®</sup>, Subscript<sub className="text-xs">2</sub></li>
            <li>Ordered and Unordered Lists</li>
            <li>Undo and Redo</li>
            <li>Insert Image and Create Link</li>
            <li>Font Color and Background Color</li>
            <li>Text Alignment and Indentation</li>
            <li>Font Name and Font Size</li>
            <li>Save Content: Allows users to save their current text content locally or to a server, ensuring they can retrieve and continue editing later.</li>
            <li>Auto Save: Automatically saves the content at regular intervals to prevent loss of unsaved changes.</li>
            <li>Syntax Highlighting: Provides color-coded syntax highlighting for various programming or markup languages to improve readability.</li>
            <li>Find and Replace: Enables users to search for specific text and replace it with another across the document.</li>
            <li>Word Count: Displays the current word count of the document.</li>
            <li>Spell Check: Checks for spelling errors and suggests corrections.</li>
            <li>Collaboration: Supports real-time collaboration, allowing multiple users to edit the same document simultaneously.</li>
            <li>Responsive Design: Ensures the editor adapts well to different screen sizes and devices for a seamless editing experience.</li>
            <li>Customizable Themes: Allows users to choose different themes or customize the editor&apos;s appearance to suit their preferences.</li>
            <li>Keyboard Shortcuts: Provides shortcuts for various functions to improve efficiency and user experience.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default TextEditor;
