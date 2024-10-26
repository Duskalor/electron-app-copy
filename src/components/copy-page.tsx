import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { splitText } from '../lib/split-text';
import { textArea } from '../types/pjs.types';

enum status {
  idle = 'idle',
  loading = 'loading',
  success = 'success',
  error = 'error',
}

export const CopyPage = () => {
  const [text, setText] = useState('');
  const [CopyText, setCopyText] = useState<textArea[]>(
    localStorage.getItem('text')
      ? JSON.parse(localStorage.getItem('text')!)
      : []
  );

  const [loading, setLoading] = useState(() => {
    const loading = localStorage.getItem('loading');
    return loading ? JSON.parse(loading) : status.idle;
  });

  const [loadingText, setLoadingText] = useState(() => {
    const loadingText = localStorage.getItem('loadingtext');
    return loadingText ? JSON.parse(loadingText) : status.idle;
  });

  console.log({ CopyText, loading, loadingText });
  const [clicked, setClicked] = useState<number | null>(null);

  const handleClick = async (index: number, text: string) => {
    await navigator.clipboard.writeText(text.trim());
    setClicked(index);

    setTimeout(() => {
      setClicked(null);
    }, 1000);
  };

  useEffect(() => {
    localStorage.setItem('text', JSON.stringify(CopyText));
    localStorage.setItem('loading', JSON.stringify(loading));
    localStorage.setItem('loadingtext', JSON.stringify(loadingText));
  }, [CopyText, loading, loadingText]);

  const handleCopy = () => {
    if (text === '') {
      toast.error('El texto no puede estar vacio');
      return;
    }
    setLoading(status.loading);
    setLoadingText(status.loading);
    const textArray = splitText(text);
    setCopyText(textArray);
    setLoading(status.success);
    setLoadingText(status.success);
  };
  // const handlePaste = async (text: string) => {

  // };
  const idleStatus = loading === status.idle && loadingText === status.idle;

  const loadingStatus =
    loading === status.loading && loadingText === status.loading;

  const successLeStatus =
    loading === status.success && loadingText === status.success;

  const resetStatus = () => {
    setLoading(status.idle);
    setLoadingText(status.idle);
    setCopyText([]);
    setText('');
  };

  return (
    <section className='flex flex-col items-center justify-center '>
      <div className='flex flex-col items-center justify-center gap-5'>
        <button
          onClick={idleStatus ? handleCopy : resetStatus}
          disabled={loadingStatus}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '
        >
          {idleStatus ? 'comenzar' : loadingStatus ? 'copiando' : 'resetear'}
        </button>
        {idleStatus && (
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            id='texto'
            rows={20}
            cols={45}
            className='p-5 rounded-lg text-white'
            placeholder='Pega tu texto aquí...'
          />
        )}
      </div>

      {successLeStatus && (
        <div className='p-5 my-5 bg-gray-100 rounded-lg shadow-md'>
          {CopyText.map((item, i) => (
            <li
              key={i}
              className='flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm gap-5'
            >
              <span className='font-medium'>
                {item.name}: {item.content}
              </span>
              {item.content ? (
                <button
                  onClick={() => handleClick(i, item.content)}
                  className={`px-3 py-1 ml-4 text-white rounded w-[80px] ${
                    clicked === i ? 'bg-green-500' : 'bg-blue-500'
                  } hover:${clicked === i ? 'bg-green-600' : 'bg-blue-600'}`}
                >
                  {clicked === i ? 'copiado' : 'copiar'}
                </button>
              ) : (
                <span className='text-gray-500'>No hay contenido</span>
              )}
            </li>
          ))}
        </div>
      )}
    </section>
  );
};
