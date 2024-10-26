import { Toaster } from 'sonner';
import './App.css';
import { CopyPage } from './components/copy-page';
// import { RickAndMorthy } from './components/RickAndMorthy';

function App() {
  return (
    <main className='container mx-auto '>
      <div className='flex flex-col items-center justify-center m-5'>
        <CopyPage />
      </div>
      <Toaster richColors />
    </main>
  );
}

export default App;
