import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Outlet } from 'react-router-dom';
import { LeftSidebar } from './components/LeftSidebar';

export const MainLayout = () => {
  const isMobile = false;

  return (
    <div className='h-screen bg-black text-white flex flex-col'>
      <ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-2'>

        {/* Barra Lateral Izquierda */}
        <ResizablePanel defaultSize={ 20 } minSize={ isMobile ? 0 : 10 } maxSize={ 30 }>
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

        {/* Contenido Principal */}
        <ResizablePanel defaultSize={ isMobile ? 80 : 60 }>
          <Outlet />
        </ResizablePanel>

        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

        {/* Barra Lateral Derecha */}
        <ResizablePanel defaultSize={ 20 } minSize={ 0 } maxSize={ 25 } collapsedSize={ 0 }>
          Friends Activity Component
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}