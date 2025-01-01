import React, { useState, useEffect } from 'react';

const ColorPaletteCube = () => {
  const [rotateX, setRotateX] = useState(-25);
  const [rotateY, setRotateY] = useState(45);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredColor, setHoveredColor] = useState(null);
  const [copiedColor, setCopiedColor] = useState(null);
  const CUBE_SIZE = 300; 

  const palettes = {
    front: [ 
      ['#ffb3b3', '#ff9999', '#ff8080', '#ff6666', '#ff4d4d', '#ff3333'],
      ['#ff9999', '#ff8080', '#ff6666', '#ff4d4d', '#ff3333', '#ff1a1a'],
      ['#ff8080', '#ff6666', '#ff4d4d', '#ff3333', '#ff1a1a', '#ff0000'],
      ['#ff6666', '#ff4d4d', '#ff3333', '#ff1a1a', '#ff0000', '#e60000'],
      ['#ff4d4d', '#ff3333', '#ff1a1a', '#ff0000', '#e60000', '#cc0000'],
      ['#ff3333', '#ff1a1a', '#ff0000', '#e60000', '#cc0000', '#b30000']
    ],
    right: [ 
      ['#b3d9ff', '#99ccff', '#80bfff', '#66b3ff', '#4da6ff', '#3399ff'],
      ['#99ccff', '#80bfff', '#66b3ff', '#4da6ff', '#3399ff', '#1a8cff'],
      ['#80bfff', '#66b3ff', '#4da6ff', '#3399ff', '#1a8cff', '#007fff'],
      ['#66b3ff', '#4da6ff', '#3399ff', '#1a8cff', '#007fff', '#0073e6'],
      ['#4da6ff', '#3399ff', '#1a8cff', '#007fff', '#0073e6', '#0066cc'],
      ['#3399ff', '#1a8cff', '#007fff', '#0073e6', '#0066cc', '#0059b3']
    ],
    back: [ 
      ['#b3ffb3', '#99ff99', '#80ff80', '#66ff66', '#4dff4d', '#33ff33'],
      ['#99ff99', '#80ff80', '#66ff66', '#4dff4d', '#33ff33', '#1aff1a'],
      ['#80ff80', '#66ff66', '#4dff4d', '#33ff33', '#1aff1a', '#00ff00'],
      ['#66ff66', '#4dff4d', '#33ff33', '#1aff1a', '#00ff00', '#00e600'],
      ['#4dff4d', '#33ff33', '#1aff1a', '#00ff00', '#00e600', '#00cc00'],
      ['#33ff33', '#1aff1a', '#00ff00', '#00e600', '#00cc00', '#00b300']
    ],
    left: [ 
      ['#fff7b3', '#fff299', '#ffec80', '#ffe766', '#ffe24d', '#ffdd33'],
      ['#fff299', '#ffec80', '#ffe766', '#ffe24d', '#ffdd33', '#ffd81a'],
      ['#ffec80', '#ffe766', '#ffe24d', '#ffdd33', '#ffd81a', '#ffd400'],
      ['#ffe766', '#ffe24d', '#ffdd33', '#ffd81a', '#ffd400', '#e6bf00'],
      ['#ffe24d', '#ffdd33', '#ffd81a', '#ffd400', '#e6bf00', '#cca900'],
      ['#ffdd33', '#ffd81a', '#ffd400', '#e6bf00', '#cca900', '#b39400']
    ],
    top: [
      ['#e6b3ff', '#d999ff', '#cc80ff', '#bf66ff', '#b34dff', '#a633ff'],
      ['#d999ff', '#cc80ff', '#bf66ff', '#b34dff', '#a633ff', '#991aff'],
      ['#cc80ff', '#bf66ff', '#b34dff', '#a633ff', '#991aff', '#8c00ff'],
      ['#bf66ff', '#b34dff', '#a633ff', '#991aff', '#8c00ff', '#7f00e6'],
      ['#b34dff', '#a633ff', '#991aff', '#8c00ff', '#7f00e6', '#7300cc'],
      ['#a633ff', '#991aff', '#8c00ff', '#7f00e6', '#7300cc', '#6600b3']
    ],
    bottom: [ 
      ['#ffd9b3', '#ffc799', '#ffb680', '#ffa366', '#ff914d', '#ff7f33'],
      ['#ffc799', '#ffb680', '#ffa366', '#ff914d', '#ff7f33', '#ff6c1a'],
      ['#ffb680', '#ffa366', '#ff914d', '#ff7f33', '#ff6c1a', '#ff5c00'],
      ['#ffa366', '#ff914d', '#ff7f33', '#ff6c1a', '#ff5c00', '#e65200'],
      ['#ff914d', '#ff7f33', '#ff6c1a', '#ff5c00', '#e65200', '#cc4700'],
      ['#ff7f33', '#ff6c1a', '#ff5c00', '#e65200', '#cc4700', '#b33e00']
    ]
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotateY(prev => prev + deltaX * 0.5);
    setRotateX(prev => prev - deltaY * 0.5);

    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  const copyColor = async (color) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const ColorSquare = ({ color }) => (
    <div
      tabIndex={0}
      role="button"
      className="w-full h-full rounded-sm transition-transform hover:scale-105 focus:scale-105 cursor-pointer outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      style={{ backgroundColor: color }}
      onClick={() => copyColor(color)}
      onMouseEnter={() => setHoveredColor(color)}
      onMouseLeave={() => setHoveredColor(null)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          copyColor(color);
        }
      }}
    />
  );

  const Face = ({ colors, transform, zIndex }) => (
    <div
      className="absolute grid grid-cols-6 gap-1 p-1 bg-gray-800"
      style={{
        transform,
        zIndex,
        width: CUBE_SIZE,
        height: CUBE_SIZE
      }}
    >
      {colors.map((row, i) =>
        row.map((color, j) => (
          <ColorSquare key={`${i}-${j}`} color={color} />
        ))
      )}
    </div>
  );

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-8 pb-32">
      <div
        className="relative cursor-grab active:cursor-grabbing mt-24 mb-16"
        onMouseDown={handleMouseDown}
        style={{
          width: CUBE_SIZE,
          height: CUBE_SIZE,
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          transition: isDragging ? 'none' : 'transform 0.3s ease'
        }}
      >
        <Face
          colors={palettes.front}
          transform={`translateZ(${CUBE_SIZE/2}px)`}
          zIndex={rotateY > -90 && rotateY < 90 ? 3 : 0}
        />
        <Face
          colors={palettes.right}
          transform={`rotateY(90deg) translateZ(${CUBE_SIZE/2}px)`}
          zIndex={rotateY > 0 ? 3 : 0}
        />
        <Face
          colors={palettes.back}
          transform={`rotateY(180deg) translateZ(${CUBE_SIZE/2}px)`}
          zIndex={rotateY > 90 || rotateY < -90 ? 3 : 0}
        />
        <Face
          colors={palettes.left}
          transform={`rotateY(-90deg) translateZ(${CUBE_SIZE/2}px)`}
          zIndex={rotateY < 0 ? 3 : 0}
        />
        <Face
          colors={palettes.top}
          transform={`rotateX(90deg) translateZ(${CUBE_SIZE/2}px)`}
          zIndex={rotateX < 0 ? 3 : 0}
        />
        <Face
          colors={palettes.bottom}
          transform={`rotateX(-90deg) translateZ(${CUBE_SIZE/2}px)`}
          zIndex={rotateX > 0 ? 3 : 0}
        />
      </div>

      <div className="h-12 flex flex-col items-center justify-center">
        {hoveredColor ? (
          <div 
            className="text-lg font-mono flex items-center gap-2"
          >
            <div 
              className="w-6 h-6 rounded-sm border border-gray-300"
              style={{ backgroundColor: hoveredColor }}
            />
            {hoveredColor}
            {copiedColor === hoveredColor && <span className="text-green-500 ml-2">Copied!</span>}
          </div>
        ) : (
          <p className="text-gray-500">Hover over a color to see its hex code</p>
        )}
      </div>

      <div className="text-center space-y-2">
        <div className="flex gap-4 flex-wrap justify-center text-sm">
          <div>Front: Reds</div>
          <div>Right: Blues</div>
          <div>Back: Greens</div>
          <div>Left: Yellows</div>
          <div>Top: Purples</div>
          <div>Bottom: Oranges</div>
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteCube;
