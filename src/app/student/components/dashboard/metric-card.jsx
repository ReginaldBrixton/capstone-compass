import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from '../../../../components/ui/card';
import { cn } from '../../../../lib/utils';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import * as THREE from 'three';

/**
 * MetricCard component displays a card with a title, value, change percentage,
 * and an icon. It visually indicates whether the change is positive or negative.
 * Includes subtle Three.js background animation and is responsive.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the metric.
 * @param {string|number} props.value - The value of the metric.
 * @param {number} props.change - The change in percentage.
 * @param {React.ReactNode} props.icon - The icon to display.
 * @param {string} [props.className] - Additional class names for styling.
 * @returns {JSX.Element} The rendered MetricCard component.
 */
const MetricCard = ({ title, value, change, icon, className }) => {
  const isPositive = change > 0;
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const frameIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
    });
    rendererRef.current = renderer;
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0xffffff, 0);

    // Create geometry and material
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: isPositive ? 0x34d399 : 0xfb7185, // Adjusted colors for better dark/light mode contrast
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    camera.position.z = 15;

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(canvas);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      geometry.dispose();
      material.dispose();
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
    };
  }, [isPositive]);

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-xl/50',
        'bg-background/90 hover:bg-background/95 backdrop-blur-sm', // Glass-like effect
        'border border-gray-200 dark:border-gray-800', // Border contrast
        className
      )}
      id="metric-card-container"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 opacity-50 sm:opacity-30 md:opacity-20 dark:opacity-30 sm:dark:opacity-20 md:dark:opacity-10"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      <CardContent className="relative z-10 p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2 md:space-y-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {value}
            </p>
          </div>
          <div
            className={cn(
              'flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium',
              isPositive 
                ? 'bg-green-100/50 text-green-800 dark:bg-emerald-900/30 dark:text-green-400'
                : 'bg-red-100/50 text-red-800 dark:bg-rose-900/30 dark:text-red-400'
            )}
          >
            {isPositive ? (
              <ArrowUpIcon className="h-5 w-5" />
            ) : (
              <ArrowDownIcon className="h-5 w-5" />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
        </div>
        <div className="mt-4 text-gray-500 dark:text-gray-400">{icon}</div>
      </CardContent>
    </Card>
  );
};
export default MetricCard;
