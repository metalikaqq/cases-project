import { useRef, useEffect, RefObject } from 'react';

// Type for the hook return value
type DraggableScrollRef = RefObject<HTMLDivElement>;

export function useDraggableScroll(): DraggableScrollRef {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = ref.current;
    if (!slider) return;

    let isDown = false; // Track whether the mouse is pressed
    let startX: number;
    let scrollLeft: number;

    // Mouse Event Handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDown = true; // Set isDown to true when mouse is pressed
      slider.classList.add('active'); // Add the active class for visual feedback
      startX = e.pageX - slider.offsetLeft; // Get the initial X position of the mouse
      scrollLeft = slider.scrollLeft; // Store the initial scroll position
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return; // Only allow scrolling if the mouse is pressed
      e.preventDefault(); // Prevent default behavior (like text selection)
      const x = e.pageX - slider.offsetLeft; // Calculate the current mouse position
      const walk = (x - startX) * 3; // Multiply the movement for faster scrolling
      slider.scrollLeft = scrollLeft - walk; // Scroll the slider
    };

    const handleMouseUpOrLeave = () => {
      isDown = false; // Stop scrolling when mouse is released or leaves the slider
      slider.classList.remove('active'); // Remove the active class
    };

    // Add Event Listeners for mouse events
    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mousemove', handleMouseMove);
    slider.addEventListener('mouseup', handleMouseUpOrLeave);
    slider.addEventListener('mouseleave', handleMouseUpOrLeave);

    // Cleanup event listeners on component unmount
    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mousemove', handleMouseMove);
      slider.removeEventListener('mouseup', handleMouseUpOrLeave);
      slider.removeEventListener('mouseleave', handleMouseUpOrLeave);
    };
  }, []);

  return ref;
}
