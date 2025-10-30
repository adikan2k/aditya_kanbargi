import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function NeuralNetworkAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      // Reset transform before applying new scale to prevent compounding
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    updateSize();
    window.addEventListener("resize", updateSize);

    // Create nodes
    const nodeCount = 50; // Increased from 30 for more connections
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.8, // Slightly faster movement
        vy: (Math.random() - 0.5) * 0.8,
      });
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Update node positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;
      });

      // Draw connections with gradient colors
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) { // Increased connection distance
            const opacity = (1 - distance / 180) * 0.6; // Increased opacity from 0.3 to 0.6
            
            // Alternate between different colors for variety
            const colorIndex = (i + j) % 3;
            const colors = [
              `rgba(99, 102, 241, ${opacity})`,   // Indigo
              `rgba(139, 92, 246, ${opacity})`,   // Purple
              `rgba(236, 72, 153, ${opacity})`    // Pink
            ];
            
            ctx.strokeStyle = colors[colorIndex];
            ctx.lineWidth = 1.5; // Slightly thicker lines
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes with glow effect
      nodes.forEach((node, index) => {
        // Outer glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = index % 3 === 0 ? "rgba(99, 102, 241, 0.8)" : 
                          index % 3 === 1 ? "rgba(139, 92, 246, 0.8)" : 
                          "rgba(236, 72, 153, 0.8)";
        
        const colorIndex = index % 3;
        const nodeColors = [
          "rgba(99, 102, 241, 0.9)",   // Indigo
          "rgba(139, 92, 246, 0.9)",   // Purple
          "rgba(236, 72, 153, 0.9)"    // Pink
        ];
        
        ctx.fillStyle = nodeColors[colorIndex];
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2); // Larger nodes
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
      data-testid="canvas-neural-network"
    />
  );
}
