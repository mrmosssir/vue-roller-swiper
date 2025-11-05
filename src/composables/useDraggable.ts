import { ref, onMounted, type Ref, onBeforeUnmount } from "vue";

export const useDraggable = <T extends HTMLElement>(
  element: Ref<T | null>,
  callback: (direction: boolean) => void
) => {
  const isDragging = ref(false);

  const startPosition = ref({ x: 0, y: 0 });
  const movePosition = ref({ x: 0, y: 0 });

  const handleMouseDown = (event: MouseEvent) => {
    isDragging.value = true;
    startPosition.value = { x: event.clientX, y: event.clientY };
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging.value) return;
    movePosition.value = { x: event.clientX, y: event.clientY };
  };

  const handleMouseUp = () => {
    if (!isDragging.value) return;
    isDragging.value = false;
    callback(movePosition.value.y < startPosition.value.y);
  };

  onMounted(() => {
    if (!element.value) return;
    element.value.addEventListener("mousedown", handleMouseDown);
    element.value.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  onBeforeUnmount(() => {
    if (!element.value) return;
    element.value.removeEventListener("mousedown", handleMouseDown);
    element.value.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  });
};
