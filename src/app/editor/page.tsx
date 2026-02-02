'use client';

import React, { useState, useEffect, useRef } from 'react';
import useUndo from 'use-undo';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface RectShape {
  id: number;
  type: 'rect';
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}

interface CircleShape {
  id: number;
  type: 'circle';
  cx: number;
  cy: number;
  r: number;
  fill: string;
}

type Shape = RectShape | CircleShape;

const EditorPage = () => {
  const [
    shapesState,
    {
      set: setShapes,
      undo: undoShapes,
      redo: redoShapes,
      canUndo,
      canRedo,
    },
  ] = useUndo<Shape[]>([]);
  const { present: shapes } = shapesState;

  const [selectedShapeId, setSelectedShapeId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const svgRef = useRef<SVGSVGElement>(null);

  const selectedShape = shapes.find((shape) => shape.id === selectedShapeId);

  const addRectangle = () => {
    const newRect: RectShape = {
      id: Date.now(),
      type: 'rect',
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      fill: 'lightblue',
    };
    setShapes([...shapes, newRect]);
  };

  const addCircle = () => {
    const newCircle: CircleShape = {
      id: Date.now(),
      type: 'circle',
      cx: 100,
      cy: 100,
      r: 50,
      fill: 'lightgreen',
    };
    setShapes([...shapes, newCircle]);
  };

  const deleteShape = (id: number) => {
    setShapes(shapes.filter((shape) => shape.id !== id));
    setSelectedShapeId(null);
  };

  const exportToPdf = () => {
    if (svgRef.current) {
      html2canvas(svgRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('doodle.pdf');
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedShapeId !== null) {
        deleteShape(selectedShapeId);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedShapeId, shapes]);


  const handleMouseDown = (e: React.MouseEvent<SVGRectElement | SVGCircleElement, MouseEvent>, id: number) => {
    setSelectedShapeId(id);
    setIsDragging(true);
    const svg = (e.currentTarget as SVGSVGElement).ownerSVGElement;
    if (svg) {
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
      setDragStart({ x: svgP.x, y: svgP.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (isDragging && selectedShapeId !== null) {
      const svg = e.currentTarget;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
      const dx = svgP.x - dragStart.x;
      const dy = svgP.y - dragStart.y;


      setShapes(
        shapes.map((shape) => {
          if (shape.id !== selectedShapeId) return shape;
          if (shape.type === 'rect') {
            return { ...shape, x: shape.x + dx, y: shape.y + dy };
          }
          if (shape.type === 'circle') {
            return { ...shape, cx: shape.cx + dx, cy: shape.cy + dy };
          }
          return shape;
        })
      );
      setDragStart(svgP);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      setSelectedShapeId(null);
    }
  };

  const updateShapeProperty = (id: number, prop: keyof Shape, value: any) => {
    setShapes(
      shapes.map((shape) =>
        shape.id === id ? { ...shape, [prop]: value } : shape
      )
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Bar */}
      <header className="flex items-center justify-between p-2 bg-white border-b">
        <div className="flex items-center space-x-4">
          <span className="font-bold">두들</span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={undoShapes} disabled={!canUndo} className="p-2 hover:bg-gray-200 rounded disabled:opacity-50">Undo</button>
          <button onClick={redoShapes} disabled={!canRedo} className="p-2 hover:bg-gray-200 rounded disabled:opacity-50">Redo</button>
          <button className="p-2 hover:bg-gray-200 rounded">Grid: ON</button>
          <button onClick={exportToPdf} className="p-2 bg-blue-500 text-white rounded">PDF 다운로드</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <aside className="w-16 bg-white border-r flex flex-col items-center p-2 space-y-4">
          <button className="p-2 hover:bg-gray-200 rounded" onClick={addRectangle}>Rect</button>
          <button className="p-2 hover:bg-gray-200 rounded" onClick={addCircle}>Circle</button>
          <button className="p-2 hover:bg-gray-200 rounded">Text</button>
          <button className="p-2 hover:bg-gray-200 rounded">Image</button>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 flex items-center justify-center bg-gray-200">
          <svg
            ref={svgRef}
            width={800}
            height={600}
            className="bg-white shadow-lg"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onClick={handleCanvasClick}
            tabIndex={0}
          >
            {shapes.map((shape) => {
              if (shape.type === 'rect') {
                return (
                  <rect
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    fill={shape.fill}
                    onMouseDown={(e) => handleMouseDown(e, shape.id)}
                    cursor="move"
                    stroke={selectedShapeId === shape.id ? 'blue' : 'none'}
                    strokeWidth={2}
                  />
                );
              }
              if (shape.type === 'circle') {
                return (
                  <circle
                    key={shape.id}
                    cx={shape.cx}
                    cy={shape.cy}
                    r={shape.r}
                    fill={shape.fill}
                    onMouseDown={(e) => handleMouseDown(e, shape.id)}
                    cursor="move"
                    stroke={selectedShapeId === shape.id ? 'blue' : 'none'}
                    strokeWidth={2}
                  />
                );
              }
              return null;
            })}
          </svg>
        </main>

        {/* Right Sidebar */}
        <aside className="w-64 bg-white border-l p-4">
          <h3 className="text-lg font-semibold mb-4">속성</h3>
          {selectedShape && (
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700">색상</label>
                <div className="flex items-center space-x-2 mt-1">
                  <input
                    type="color"
                    value={selectedShape.fill}
                    onChange={(e) => updateShapeProperty(selectedShape.id, 'fill', e.target.value)}
                    className="w-8 h-8"
                  />
                  <span>{selectedShape.fill}</span>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">위치</label>
                {selectedShape.type === 'rect' && (
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <label className="text-xs">X</label>
                      <input
                        type="number"
                        value={Math.round(selectedShape.x)}
                        onChange={(e) => updateShapeProperty(selectedShape.id, 'x', parseInt(e.target.value, 10))}
                        className="w-full p-1 border rounded"
                      />
                    </div>
                    <div>
                      <label className="text-xs">Y</label>
                      <input
                        type="number"
                        value={Math.round(selectedShape.y)}
                        onChange={(e) => updateShapeProperty(selectedShape.id, 'y', parseInt(e.target.value, 10))}
                        className="w-full p-1 border rounded"
                      />
                    </div>
                  </div>
                )}
                 {selectedShape.type === 'circle' && (
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <label className="text-xs">CX</label>
                      <input
                        type="number"
                        value={Math.round(selectedShape.cx)}
                        onChange={(e) => updateShapeProperty(selectedShape.id, 'cx', parseInt(e.target.value, 10))}
                        className="w-full p-1 border rounded"
                      />
                    </div>
                    <div>
                      <label className="text-xs">CY</label>
                      <input
                        type="number"
                        value={Math.round(selectedShape.cy)}
                        onChange={(e) => updateShapeProperty(selectedShape.id, 'cy', parseInt(e.target.value, 10))}
                        className="w-full p-1 border rounded"
                      />
                    </div>
                     <div>
                      <label className="text-xs">R</label>
                      <input
                        type="number"
                        value={Math.round(selectedShape.r)}
                        onChange={(e) => updateShapeProperty(selectedShape.id, 'r', parseInt(e.target.value, 10))}
                        className="w-full p-1 border rounded"
                      />
                    </div>
                  </div>
                )}
              </div>
               <div className="mt-4">
                <button
                  onClick={() => deleteShape(selectedShape.id)}
                  className="w-full p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default EditorPage;